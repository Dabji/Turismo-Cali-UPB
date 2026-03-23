/**
 * Segmento 5 — Banner de Contacto
 * Banner ancho Naranja Coral con email y teléfono en dos cajas contiguas.
 */
export default function ContactBanner() {
  return (
    <section id="contacto" className="py-16 px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="bg-coral rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          {/* Decoración sutil de fondo */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <h2 className="font-volkhov text-white text-2xl sm:text-3xl md:text-4xl font-bold relative z-10">
            ¿Listo para descubrir Cali?
          </h2>
          <p className="mt-4 text-white/80 font-poppins text-sm sm:text-base max-w-lg mx-auto relative z-10">
            Contáctanos para recibir más información sobre cómo vivir la
            experiencia Ruta 7 Ríos
          </p>

          {/* Cajas de contacto */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href="mailto:info@ruta7rios.com"
              className="bg-white text-navy font-poppins font-semibold text-sm px-6 py-3 rounded-lg hover:bg-cream hover:scale-105 transition-all duration-300 shadow-md"
            >
              info@ruta7rios.com
            </a>
            <a
              href="tel:+5721234567"
              className="bg-navy text-white font-poppins font-semibold text-sm px-6 py-3 rounded-lg hover:bg-navy/90 hover:scale-105 transition-all duration-300 shadow-md"
            >
              +57 (2) 123 4567
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
