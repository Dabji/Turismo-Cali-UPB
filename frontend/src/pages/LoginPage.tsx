import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import loginBg from '../images/barrioSanAntonio.jpg';
import logoHeader from '../images/logoHeader.png';

/** Tipado del estado del formulario */
interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/admin');
    } catch (err: any) {
      setError(
        err.response?.data?.error || 'Credenciales inválidas. Intenta de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ══════════════ SECCIÓN IZQUIERDA — VISUAL / MARCA ══════════════ */}
      <div className="hidden md:flex md:w-1/2 relative items-center justify-center overflow-hidden">
        {/* Imagen de fondo */}
        <img
          src={loginBg}
          alt="Barrio San Antonio — Cali"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/70 via-navy/50 to-coral/30" />

        {/* Contenido centrado */}
        <div className="relative z-10 text-center px-10 animate-fade-in">
          <img
            src={logoHeader}
            alt="Ruta 7 Ríos"
            className="h-20 w-auto mx-auto mb-8 drop-shadow-lg"
          />
          <p className="font-volkhov text-white text-2xl lg:text-3xl italic font-bold leading-snug drop-shadow-md">
            "Salsa, sabor y tradición<br />en un solo latido"
          </p>
          <p className="mt-4 font-poppins text-white/70 text-sm">
            Cali — La Sucursal del Cielo
          </p>
        </div>
      </div>

      {/* ══════════════ SECCIÓN DERECHA — FORMULARIO ══════════════ */}
      <div className="flex-1 flex flex-col bg-cream min-h-screen md:min-h-0">
        {/* ── Botón volver (discreto) ── */}
        <div className="p-5 md:p-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-ash text-sm font-poppins hover:text-coral transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>

        {/* ── Formulario centrado ── */}
        <div className="flex-1 flex items-center justify-center px-6 pb-10">
          <div className="w-full max-w-md animate-fade-in-up">
            {/* Logo móvil (solo se muestra en pantallas pequeñas) */}
            <div className="md:hidden flex justify-center mb-8">
              <img src={logoHeader} alt="Ruta 7 Ríos" className="h-14 w-auto" />
            </div>

            <h1 className="font-volkhov text-navy text-3xl sm:text-4xl font-bold">
              Bienvenido de vuelta
            </h1>
            <p className="mt-2 font-poppins text-ash text-sm leading-relaxed">
              Ingresa a tu cuenta para gestionar tus experiencias en la sucursal del cielo.
            </p>

            {/* Error */}
            {error && (
              <div className="mt-5 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm font-poppins">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label className="block font-poppins text-navy text-sm font-medium mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="text"
                  name="email"
                  required
                  className="input-field"
                  placeholder="tu@correo.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="block font-poppins text-navy text-sm font-medium mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    className="input-field pr-11"
                    placeholder="Tu contraseña"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ash/50 hover:text-coral transition-colors"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* ¿Olvidaste tu contraseña? */}
                <div className="mt-2 text-right">
                  <a
                    href="#"
                    className="font-poppins text-xs text-ash hover:text-coral transition-colors duration-300"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-coral text-white font-poppins font-semibold py-3 rounded-lg
                  hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]
                  transition-all duration-300 shadow-md hover:shadow-lg
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? 'Ingresando…' : 'Ingresar'}
              </button>
            </form>

            {/* Hint de desarrollo */}
            <div className="mt-8 p-4 bg-navy/5 rounded-xl border border-navy/10">
              <p className="font-poppins text-xs text-navy font-semibold mb-1">
                Modo desarrollo:
              </p>
              <p className="font-poppins text-xs text-ash">
                Usuario: <code className="bg-navy/10 px-1.5 py-0.5 rounded text-navy">admin</code>{' '}
                — Contraseña: cualquiera
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
