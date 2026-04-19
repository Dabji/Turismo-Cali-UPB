import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

/** Spinner de carga mínimo mientras se resuelven los chunks */
function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cream"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="w-10 h-10 border-4 border-coral border-t-transparent rounded-full animate-spin"
        aria-hidden="true"
      />
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole={['ADMIN', 'EDITOR']}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
