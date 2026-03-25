/**
 * Segmento 5 — Footer
 * Fondo Azul Volcánico oscuro con logo, descripción, enlaces rápidos,
 * contacto e iconos de redes sociales.
 */
import logoFooter from '../../images/logoFooterColor2.png';

const QUICK_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre Nosotros', href: '#nosotros' },
  { label: 'Experiencias', href: '#experiencias' },
  { label: 'Destinos', href: '#destinos' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* ── Col 1: Logo + Descripción + Redes ── */}
          <div>
            <img
              src={logoFooter}
              alt="Ruta 7 Ríos"
              width={180}
              height={48}
              loading="lazy"
              className="h-12 w-auto mb-5 object-contain"
            />
            <p className="font-poppins text-white/60 text-sm leading-relaxed mb-6">
              Salsa, sabor y tradición en un solo latido. Descubre la magia de Santiago
              de Cali, donde la cultura, la naturaleza y la gastronomía se unen para
              ofrecerte una experiencia inolvidable.
            </p>
            {/* Iconos de redes sociales */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Col 2: Enlaces Rápidos ── */}
          <div>
            <h4 className="font-poppins font-semibold text-base mb-5">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-poppins text-white/60 text-sm hover:text-coral transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contacto ── */}
          <div>
            <h4 className="font-poppins font-semibold text-base mb-5">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-coral flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-poppins text-white/60 text-sm">
                  Santiago de Cali, Valle del Cauca, Colombia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-coral flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-poppins text-white/60 text-sm">+57 (2) 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-coral flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-poppins text-white/60 text-sm">info@ruta7rios.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-poppins text-white/40 text-xs sm:text-sm">
            © {year} Ruta 7 Ríos. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="font-poppins text-white/40 text-xs sm:text-sm hover:text-coral transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="font-poppins text-white/40 text-xs sm:text-sm hover:text-coral transition-colors">
              Términos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
