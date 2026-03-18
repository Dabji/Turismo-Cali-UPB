import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  apiPrefix: process.env.API_PREFIX || '/api',

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    name: process.env.DB_NAME || 'turismo_cali',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  },

  ldap: {
    url: process.env.LDAP_URL || 'ldap://192.168.1.10:389',
    bindDn: process.env.LDAP_BIND_DN || 'cn=admin,dc=turismocali,dc=com',
    bindPassword: process.env.LDAP_BIND_PASSWORD || 'ldap_password',
    searchBase: process.env.LDAP_SEARCH_BASE || 'ou=usuarios,dc=turismocali,dc=com',
    searchFilter: process.env.LDAP_SEARCH_FILTER || '(uid={{username}})',
  },

  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },

  log: {
    level: process.env.LOG_LEVEL || 'info',
    dir: process.env.LOG_DIR || './logs',
  },

  isDev(): boolean {
    return this.nodeEnv === 'development';
  },

  isProd(): boolean {
    return this.nodeEnv === 'production';
  },
};
