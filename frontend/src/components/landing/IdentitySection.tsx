/**
 * Segmento 5 — Cali y su Identidad
 * Fondo Beige, grid 2×2 de tarjetas blancas con icono, título, texto y tags.
 */

interface IdentityCard {
  title: string;
  text: string;
  tags: string[];
  iconBg: string;
  icon: React.ReactNode;
}

const CARDS: IdentityCard[] = [
  {
    title: 'La Capital de la Salsa',
    text: 'Cali respira salsa las 24 horas. Desde los años 60, este género musical se convirtió en el latido de la ciudad. Aquí no solo se escucha salsa, se vive con pasión desde cada esquina, desde las escuelas de baile hasta los clubes legendarios como Zaperoco y Son de Luz.',
    tags: ['Feria de Cali', 'Juanchito', 'Baile callejero'],
    iconBg: 'bg-coral/10',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    title: 'Los 7 Ríos',
    text: 'Siete ríos atraviesan Cali, dándole vida y frescura a la ciudad: Aguacatal, Cali, Cañaveralejo, Lili, Meléndez, Pance y Cauca. Estos cuerpos de agua son el corazón natural de nuestra identidad y el origen del nombre Ruta 7 Ríos.',
    tags: ['Río Pance', 'Ecoturismo', 'Biodiversidad'],
    iconBg: 'bg-blue-100',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Cultura y Comunidad',
    text: 'La calidez del pueblo caleño es legendaria. Con una rica herencia afrodescendiente e indígena, Cali es un mosaico cultural donde la música del Pacífico, la gastronomía local y el arte urbano conviven en perfecta armonía.',
    tags: ['Petronio Álvarez', 'Arte callejero', 'Tradiciones'],
    iconBg: 'bg-purple-100',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Turismo Sostenible',
    text: 'En Ruta 7 Ríos promovemos un turismo consciente que beneficia a las comunidades locales y protege nuestros recursos naturales. Cada experiencia está diseñada para generar un impacto positivo duradero.',
    tags: ['Eco-responsable', 'Comercio justo', 'Conservación'],
    iconBg: 'bg-green-100',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
  },
];

export default function IdentitySection() {
  return (
    <section className="bg-cream py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ── Encabezado ── */}
        <div className="text-center mb-14">
          <span className="font-poppins text-coral text-sm font-semibold tracking-widest uppercase">
            Nuestra Esencia
          </span>
          <h2 className="font-volkhov text-navy text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
            Cali y su Identidad
          </h2>
          <p className="mt-4 text-ash font-poppins max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Más que un destino turístico, Cali es un sentimiento que se vive, se baila y se
            saborea. Conoce los pilares de nuestra identidad.
          </p>
        </div>

        {/* ── Grid 2×2 ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-500 group"
            >
              <div className="flex items-start gap-4">
                {/* Icono */}
                <div
                  className={`flex-shrink-0 w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  {card.icon}
                </div>

                {/* Texto */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-volkhov text-navy text-lg font-bold mb-2">{card.title}</h3>
                  <p className="text-ash font-poppins text-sm leading-relaxed mb-4">
                    {card.text}
                  </p>
                  {/* Tags / píldoras */}
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-poppins text-xs text-coral bg-coral/10 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
