/**
 * Segmento 2 — Valores + Slogan Banner
 * Cuatro tarjetas Azul Volcánico y un banner Naranja Coral con el slogan.
 */

const VALUES = [
  {
    title: 'Comunidad',
    desc: 'Fortalecemos el tejido social local',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Sostenibilidad',
    desc: 'Protegemos nuestros recursos naturales',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Autenticidad',
    desc: 'Experiencias genuinas y culturales',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Innovación',
    desc: 'Nuevas formas de vivir el turismo',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function ValuesBanner() {
  return (
    <section className="bg-cream pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ── Tarjetas de valores ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="bg-navy rounded-2xl p-6 text-center flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-coral flex items-center justify-center text-white">
                {v.icon}
              </div>
              <h4 className="font-poppins text-white font-semibold text-sm sm:text-base">
                {v.title}
              </h4>
              <p className="font-poppins text-white/70 text-xs sm:text-sm leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Slogan Banner ── */}
        <div className="mt-10 bg-coral rounded-full py-5 px-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <p className="font-volkhov text-white text-lg sm:text-xl md:text-2xl italic font-bold">
            "Salsa, sabor y tradición en un solo latido"
          </p>
        </div>
      </div>
    </section>
  );
}
