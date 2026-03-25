/**
 * Segmento 4 — Destinos Destacados
 * Grid de 6 tarjetas con imagen, badge, rating, título y ubicación.
 * Barra estadística inferior con números clave.
 */
import cristoRey from '../../images/CristodeCali.png';
import sanAntonio from '../../images/barrioSanAntonio.jpg';
import zoologico from '../../images/flamencosZoologico.png';
import farallones from '../../images/farallones.png';
import boulevard from '../../images/boulevardDelRio.png';
import iglesia from '../../images/iglesia.png';

interface Destination {
  image: string;
  title: string;
  alt: string;
  description: string;
  badge: string;
  badgeColor: string;
  rating: number;
}

const DESTINATIONS: Destination[] = [
  {
    image: cristoRey,
    title: 'Cristo Rey',
    alt: 'Vista panorámica del monumento a Cristo Rey en Cali con los brazos abiertos sobre el cerro',
    description: 'Monumento icónico con una vista panorámica espectacular de la ciudad. Un lugar perfecto.',
    badge: 'Histórico',
    badgeColor: 'bg-coral',
    rating: 4.8,
  },
  {
    image: sanAntonio,
    title: 'Barrio San Antonio',
    alt: 'Calles empedradas y casas coloniales coloridas del Barrio San Antonio en Cali',
    description: 'Corazón bohemio de Cali con arquitectura colonial, galerías de arte y una vida cultural.',
    badge: 'Cultural',
    badgeColor: 'bg-blue-600',
    rating: 4.8,
  },
  {
    image: zoologico,
    title: 'Zoológico de Cali',
    alt: 'Flamencos rosados en su hábitat dentro del Zoológico de Cali',
    description: 'Uno de los mejores zoológicos de América Latina, hogar de más de 1.200 animales en su.',
    badge: 'Naturaleza',
    badgeColor: 'bg-green-600',
    rating: 4.8,
  },
  {
    image: farallones,
    title: 'Parque Farallones',
    alt: 'Paisaje montañoso del Parque Nacional Natural Farallones de Cali con vegetación exuberante',
    description: 'Parque Nacional Natural con una biodiversidad única, senderos ecológicos y paisajes de.',
    badge: 'Aventura',
    badgeColor: 'bg-amber-600',
    rating: 4.8,
  },
  {
    image: boulevard,
    title: 'Bulevar del río',
    alt: 'Paseo peatonal del Bulevar del Río en Cali junto al río Cali al atardecer',
    description: 'Espacio urbano junto al río ideal para caminar, hacer ejercicio de lúnor del urbanismo caleño.',
    badge: 'Recreación',
    badgeColor: 'bg-purple-600',
    rating: 4.8,
  },
  {
    image: iglesia,
    title: 'Iglesia La Ermita',
    alt: 'Fachada gótica de la Iglesia La Ermita iluminada al anochecer en el centro de Cali',
    description: 'Joya arquitectónica gótica, uno de los íconos más reconocidos y fotografiados de Cali.',
    badge: 'Patrimonio',
    badgeColor: 'bg-teal-600',
    rating: 4.8,
  },
];

const STATS = [
  { value: '7', label: 'Ríos que dan vida a Cali' },
  { value: '50+', label: 'Destinos turísticos' },
  { value: '365', label: 'Días de clima veraniego' },
  { value: '#1', label: 'Capital mundial de la salsa' },
];

/** Componente de estrellas */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="text-white text-xs font-poppins font-semibold">{rating}</span>
    </div>
  );
}

export default function DestinationsSection() {
  return (
    <section id="destinos" aria-labelledby="destinos-titulo" className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ── Encabezado ── */}
        <div className="text-center mb-14">
          <span className="font-poppins text-coral text-sm font-semibold tracking-widest uppercase">
            Lugares Emblemáticos
          </span>
          <h2 id="destinos-titulo" className="font-volkhov text-navy text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
            Destinos Destacados
          </h2>
          <p className="mt-4 text-ash font-poppins max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Explora los lugares más representativos de Cali y sus alrededores. Cada destino
            cuenta una historia única de nuestra ciudad.
          </p>
        </div>

        {/* ── Grid de destinos ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.title}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-72"
            >
              {/* Imagen de fondo */}
              <img
                src={dest.image}
                alt={dest.alt}
                width={400}
                height={288}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Degradado */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

              {/* Badge + Rating encima */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span
                  className={`${dest.badgeColor} text-white text-[10px] sm:text-xs font-poppins font-semibold px-3 py-1 rounded-full`}
                >
                  {dest.badge}
                </span>
                <div className="bg-navy/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <Stars rating={dest.rating} />
                </div>
              </div>

              {/* Título + Ubicación abajo */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-volkhov text-white text-lg sm:text-xl font-bold mb-1">
                  {dest.title}
                </h3>
                <p className="text-white/70 font-poppins text-xs sm:text-sm line-clamp-2 mb-2">
                  {dest.description}
                </p>
                <div className="flex items-center gap-1 text-white/60">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-poppins text-xs">Cali, Valle del Cauca</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Barra de estadísticas ── */}
        <div className="mt-16 bg-navy rounded-2xl p-8 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-volkhov text-white text-3xl sm:text-4xl md:text-5xl font-bold">
                {s.value}
              </p>
              <p className="mt-2 text-white/60 font-poppins text-xs sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
