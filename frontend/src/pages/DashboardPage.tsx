import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminApi } from '../services/api';
import {
  Mountain, LogOut, Users, MapPin, Mail, MailOpen, Activity,
  BarChart3, Shield, Clock, Home
} from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalServices: number;
  totalMessages: number;
  unreadMessages: number;
}

interface AuditLog {
  id: number;
  username: string;
  action: string;
  resource: string;
  ipAddress: string;
  timestamp: string;
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentLogs, setRecentLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'logs'>('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApi.getStats();
        setStats(response.data.stats);
        setRecentLogs(response.data.recentLogs);
      } catch (error) {
        console.error('Error cargando datos del dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('es-CO', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== SIDEBAR / HEADER ========== */}
      <header className="bg-primary-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Mountain className="h-7 w-7 text-accent-400" />
              <div>
                <span className="font-heading font-bold text-lg">Panel de Administración</span>
                <span className="hidden sm:inline text-xs text-gray-400 ml-2">Turismo Cali</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-400">{user?.role} | {user?.username}</p>
              </div>
              <Link to="/" className="p-2 hover:bg-primary-800 rounded-lg transition-colors" title="Ir al inicio">
                <Home className="h-5 w-5" />
              </Link>
              <button onClick={logout} className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors">
                <LogOut className="h-4 w-4" /> Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ========== BIENVENIDA ========== */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-800">
            Bienvenido, {user?.firstName}
          </h1>
          <p className="text-gray-500 mt-1">Aquí tienes el resumen de actividad del sistema.</p>
        </div>

        {/* ========== TARJETAS DE ESTADÍSTICAS ========== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Usuarios</p>
                <p className="text-3xl font-bold text-primary-500">{stats?.totalUsers ?? 0}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-500" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Servicios Activos</p>
                <p className="text-3xl font-bold text-secondary-500">{stats?.totalServices ?? 0}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-secondary-500" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Mensajes Totales</p>
                <p className="text-3xl font-bold text-accent-500">{stats?.totalMessages ?? 0}</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <Mail className="h-6 w-6 text-accent-500" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Sin Leer</p>
                <p className="text-3xl font-bold text-red-500">{stats?.unreadMessages ?? 0}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <MailOpen className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* ========== TABS ========== */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'overview'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="h-4 w-4" /> Resumen
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'logs'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Shield className="h-4 w-4" /> Logs de Auditoría
          </button>
        </div>

        {/* ========== CONTENIDO DE TABS ========== */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-heading font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary-500" /> Actividad Reciente
              </h3>
              {recentLogs.length === 0 ? (
                <p className="text-gray-400 text-sm">No hay actividad registrada aún.</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentLogs.slice(0, 10).map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="h-4 w-4 text-primary-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          <span className="text-primary-500">{log.username}</span> — {log.action}
                        </p>
                        <p className="text-xs text-gray-500">{log.resource} | IP: {log.ipAddress}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" /> {formatDate(log.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card p-6">
              <h3 className="font-heading font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-secondary-500" /> Información del Sistema
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-700">Estado del Servidor</p>
                  <p className="text-xs text-green-600 mt-1">API corriendo correctamente en puerto 4000</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-700">Base de Datos</p>
                  <p className="text-xs text-blue-600 mt-1">MySQL — Conexión activa</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-700">Autenticación LDAP</p>
                  <p className="text-xs text-yellow-600 mt-1">Modo desarrollo — Mock habilitado</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm font-medium text-purple-700">Logs de Auditoría</p>
                  <p className="text-xs text-purple-600 mt-1">Winston activo — No repudio garantizado</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="card overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-heading font-bold text-gray-800 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary-500" />
                Registro de Auditoría (No Repudio)
              </h3>
              <p className="text-xs text-gray-500 mt-1">Cada acción queda registrada con usuario, IP y timestamp.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Fecha/Hora</th>
                    <th className="px-4 py-3 text-left font-medium">Usuario</th>
                    <th className="px-4 py-3 text-left font-medium">Acción</th>
                    <th className="px-4 py-3 text-left font-medium">Recurso</th>
                    <th className="px-4 py-3 text-left font-medium">IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                        No hay registros de auditoría aún.
                      </td>
                    </tr>
                  ) : (
                    recentLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(log.timestamp)}</td>
                        <td className="px-4 py-3 font-medium text-primary-600">{log.username}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{log.resource}</td>
                        <td className="px-4 py-3 text-gray-500 font-mono text-xs">{log.ipAddress}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
