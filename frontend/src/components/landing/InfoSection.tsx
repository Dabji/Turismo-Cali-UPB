/**
 * Segmento 2 — Misión y Visión
 * Fondo crema, dos tarjetas blancas lado a lado con iconos coral.
 */
export default function InfoSection() {
  return (
    <section id="nosotros" className="bg-cream py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* ── Encabezado ── */}
        <span className="font-poppins text-coral text-sm font-semibold tracking-widest uppercase">
          Descubre
        </span>
        <h2 className="font-volkhov text-navy text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
          ¿Qué es Ruta 7 Ríos?
        </h2>
        <p className="mt-4 text-ash font-poppins max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Un proyecto que celebra y promueve la riqueza cultural, natural y gastronómica de
          Santiago de Cali, conectando a visitantes con experiencias auténticas y sostenibles.
        </p>

        {/* ── Tarjetas Misión / Visión ── */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Misión */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-lg transition-shadow duration-500 text-left group">
            {/* Icono corazón */}
            <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-volkhov text-navy text-xl font-bold mb-3">Nuestra Misión</h3>
            <p className="text-ash font-poppins text-sm leading-relaxed">
              Promover a Santiago de Cali como un destino turístico de clase mundial,
              destacando su identidad cultural salsera, su biodiversidad única y su
              exquisita gastronomía, mientras fomentamos prácticas de turismo sostenible
              que beneficien a las comunidades locales y preserven nuestro patrimonio natural.
            </p>
          </div>

          {/* Visión */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-lg transition-shadow duration-500 text-left group">
            {/* Icono objetivo */}
            <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="font-volkhov text-navy text-xl font-bold mb-3">Nuestra Visión</h3>
            <p className="text-ash font-poppins text-sm leading-relaxed">
              Ser reconocidos como el principal referente en turismo sostenible y cultural
              del Valle del Cauca, creando experiencias memorables que conecten a visitantes
              nacionales e internacionales con la esencia de Cali: su gente, sus ríos, su
              música y sus sabores únicos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
