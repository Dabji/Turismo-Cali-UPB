import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoHeader from '../../images/logoHeader.png';

/** Links de navegación principales */
const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre Nosotros', href: '#nosotros' },
  { label: 'Experiencias', href: '#experiencias' },
  { label: 'Destinos', href: '#destinos' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Detectar scroll para cambiar estilo del navbar */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* ── Logo ── */}
        <a href="#inicio" className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded">
          <img
            src={logoHeader}
            alt="Ruta 7 Ríos"
            width={160}
            height={56}
            className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </a>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-poppins text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded ${
                scrolled
                  ? 'text-navy hover:text-coral'
                  : 'text-navy/80 hover:text-coral'
              }`}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/login"
            className="ml-2 bg-coral text-white text-sm font-poppins font-semibold px-5 py-2.5 rounded-lg hover:brightness-110 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Iniciar Sesión
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
          aria-label="Abrir menú de navegación"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block h-0.5 w-6 bg-navy rounded transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-navy rounded transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-navy rounded transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white shadow-lg px-6 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-poppins text-navy text-sm font-medium py-2 border-b border-gray-100 last:border-0 hover:text-coral transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-2 text-center bg-coral text-white text-sm font-poppins font-semibold px-5 py-2.5 rounded-lg hover:brightness-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
}
