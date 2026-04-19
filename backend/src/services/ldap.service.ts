import ldap from 'ldapjs';
import { config } from '../config/env';
import { logger } from './logger.service';

export interface LdapUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dn: string;
}

/**
 * Servicio de autenticación LDAP con fallback para desarrollo.
 * Si el servidor LDAP no está disponible, NO colapsa la aplicación.
 */
export class LdapService {
  private isAvailable: boolean = false;

  /**
   * Verifica si el servidor LDAP está accesible.
   */
  async checkConnection(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        const client = ldap.createClient({
          url: config.ldap.url,
          connectTimeout: 5000,
          timeout: 5000,
        });

        client.on('connect', () => {
          this.isAvailable = true;
          logger.info('✅ Servidor LDAP accesible');
          client.unbind();
          resolve(true);
        });

        client.on('error', (err: Error) => {
          this.isAvailable = false;
          logger.warn(`⚠️ Servidor LDAP no disponible: ${err.message}`);
          resolve(false);
        });

        client.on('connectTimeout', () => {
          this.isAvailable = false;
          logger.warn('⚠️ Timeout al conectar con servidor LDAP');
          resolve(false);
        });
      } catch (error) {
        this.isAvailable = false;
        logger.warn('⚠️ Error al intentar conectar con LDAP:', error);
        resolve(false);
      }
    });
  }

  /**
   * Autentica un usuario contra el servidor LDAP.
   * Retorna null si las credenciales son inválidas o el servidor no está disponible.
   */
  async authenticate(username: string, password: string): Promise<LdapUser | null> {
    if (!this.isAvailable) {
      const available = await this.checkConnection();
      if (!available) {
        logger.warn(`LDAP no disponible. Autenticación LDAP omitida para: ${username}`);
        return null;
      }
    }

    return new Promise((resolve) => {
      try {
        const client = ldap.createClient({
          url: config.ldap.url,
          connectTimeout: 5000,
          timeout: 5000,
        });

        client.on('error', (err: Error) => {
          logger.error(`Error de conexión LDAP: ${err.message}`);
          resolve(null);
        });

        // Bind con credenciales de administrador para buscar al usuario
        client.bind(config.ldap.bindDn, config.ldap.bindPassword, (bindErr) => {
          if (bindErr) {
            logger.error(`Error en LDAP bind: ${bindErr.message}`);
            client.unbind();
            resolve(null);
            return;
          }

          const searchFilter = config.ldap.searchFilter.replace('{{username}}', username);
          const searchOptions: ldap.SearchOptions = {
            filter: searchFilter,
            scope: 'sub',
            attributes: ['uid', 'cn', 'sn', 'givenName', 'mail', 'dn'],
          };

          client.search(config.ldap.searchBase, searchOptions, (searchErr, res) => {
            if (searchErr) {
              logger.error(`Error en búsqueda LDAP: ${searchErr.message}`);
              client.unbind();
              resolve(null);
              return;
            }

            let userDn: string | null = null;
            let ldapUser: LdapUser | null = null;

            res.on('searchEntry', (entry) => {
              userDn = entry.dn.toString();
              const attrs = entry.attributes ?? [];

              const getAttribute = (name: string): string => {
                const attr = attrs.find((a: any) => a.type === name) as any;
                const values = (attr?.vals ?? attr?.values ?? []) as unknown[];
                const first = values[0] ?? '';
                return typeof first === 'string' ? first : String(first);
              };

              ldapUser = {
                username: getAttribute('uid') || username,
                email: getAttribute('mail') || `${username}@turismocali.com`,
                firstName: getAttribute('givenName') || username,
                lastName: getAttribute('sn') || '',
                dn: userDn!,
              };
            });

            res.on('end', () => {
              if (!userDn || !ldapUser) {
                logger.info(`Usuario LDAP no encontrado: ${username}`);
                client.unbind();
                resolve(null);
                return;
              }

              // Bind con las credenciales del usuario para verificar contraseña
              client.bind(userDn, password, (userBindErr) => {
                client.unbind();
                if (userBindErr) {
                  logger.info(`Contraseña LDAP incorrecta para: ${username}`);
                  resolve(null);
                } else {
                  logger.info(`Autenticación LDAP exitosa para: ${username}`);
                  resolve(ldapUser);
                }
              });
            });

            res.on('error', (err) => {
              logger.error(`Error en resultado LDAP: ${err.message}`);
              client.unbind();
              resolve(null);
            });
          });
        });
      } catch (error) {
        logger.error('Error inesperado en autenticación LDAP:', error);
        resolve(null);
      }
    });
  }
}

/**
 * Mock de LDAP para desarrollo cuando el servidor no está disponible.
 */
export class MockLdapService extends LdapService {
  async checkConnection(): Promise<boolean> {
    logger.info('🔧 [MOCK] Usando servicio LDAP simulado (desarrollo)');
    return true;
  }

  async authenticate(username: string, _password: string): Promise<LdapUser | null> {
    logger.info(`🔧 [MOCK] Autenticación LDAP simulada para: ${username}`);

    const mockUsers: Record<string, LdapUser> = {
      admin: {
        username: 'admin',
        email: 'admin@turismocali.com',
        firstName: 'Administrador',
        lastName: 'Sistema',
        dn: 'cn=admin,ou=usuarios,dc=turismocali,dc=com',
      },
      editor: {
        username: 'editor',
        email: 'editor@turismocali.com',
        firstName: 'Editor',
        lastName: 'Contenido',
        dn: 'cn=editor,ou=usuarios,dc=turismocali,dc=com',
      },
    };

    return mockUsers[username] || null;
  }
}

// Exporta la instancia apropiada según el entorno
export const ldapService = config.isDev() ? new MockLdapService() : new LdapService();
