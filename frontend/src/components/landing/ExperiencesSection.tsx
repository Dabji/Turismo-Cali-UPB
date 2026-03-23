/**
 * Segmento 3 — Experiencias Turísticas
 * Grid de 4 tarjetas + CTA banner oscuro.
 */
import ExperienceCard from './ExperienceCard';
import Button from './Button';

import lineaCultural from '../../images/lineaCultural.jpg';
import lineaNaturaleza from '../../images/lineaNaturaleza.jpg';
import lineaEntretenimiento from '../../images/lineaEntretenimiento.jpg';
import lineaGastronomica from '../../images/lineaGastronomica.jpg';

const EXPERIENCES = [
  {
    image: lineaCultural,
    title: 'Línea Cultural',
    description:
      'Sumérgete en la rica historia y patrimonio de Cali, una ciudad que respira tradición en cada esquina.',
    bullets: [
      'Historia de Cali: Desde su fundación hasta convertirse en la capital mundial de la salsa',
      'Arquitectura y patrimonio: Edificios coloniales y republicanos que cuentan nuestra historia',
      'Tradiciones salseras: Descubre los orígenes del sonido que define a nuestra ciudad',
    ],
    accentColor: 'bg-coral',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    image: lineaNaturaleza,
    title: 'Línea Naturaleza',
    description:
      'Descubre la biodiversidad única que hace de Cali un paraíso natural en el corazón del Valle del Cauca.',
    bullets: [
      'Ríos de Cali: Siete ríos que dan vida y nombre a nuestra ruta turística',
      'Senderos y biodiversidad: Explora ecosistemas únicos a pocos minutos de la ciudad',
      'Entorno natural: Desde el Pacífico hasta los Andes, una variedad incomparable',
    ],
    accentColor: 'bg-green-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    image: lineaEntretenimiento,
    title: 'Línea Entretenimiento',
    description:
      'Vive la energía de Cali, donde cada noche es una celebración y la salsa es el idioma universal.',
    bullets: [
      'Salsa caleña: Aprende los pasos en las escuelas y clubes más emblemáticos',
      'Música, baile y festivales: Feria de Cali, Festival Petronio Álvarez y más',
      'Escenarios emblemáticos: Conoce los lugares donde nació la leyenda salsera',
    ],
    accentColor: 'bg-purple-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    image: lineaGastronomica,
    title: 'Línea Gastronómica',
    description:
      'Saborea el Valle del Cauca a través de platos que cuentan historias de tradición y sabor único.',
    bullets: [
      'Platos típicos del Valle: Sancocho, pandebono, aborrajado y mucho más',
      'Identidad culinaria: Fusión de influencias indígenas, africanas y españolas',
      'Cultura del sabor: Mercados locales, restaurantes tradicionales y chefs innovadores',
    ],
    accentColor: 'bg-amber-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ExperiencesSection() {
  return (
    <section id="experiencias" className="bg-cream/40 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ── Encabezado ── */}
        <div className="text-center mb-14">
          <span className="font-poppins text-coral text-sm font-semibold tracking-widest uppercase">
            Explora
          </span>
          <h2 className="font-volkhov text-navy text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
            Experiencias Turísticas
          </h2>
          <p className="mt-4 text-ash font-poppins max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Cuatro líneas temáticas que te permitirán vivir Cali desde sus diferentes
            dimensiones: cultura, naturaleza, entretenimiento y gastronomía.
          </p>
        </div>

        {/* ── Grid de tarjetas ── */}
        <div className="grid md:grid-cols-2 gap-8">
          {EXPERIENCES.map((exp) => (
            <ExperienceCard key={exp.title} {...exp} />
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <div className="mt-16 bg-navy rounded-3xl p-10 sm:p-14 text-center">
          <h3 className="font-volkhov text-white text-2xl sm:text-3xl md:text-4xl font-bold italic">
            ¿Listo para vivir la experiencia Ruta 7 Ríos?
          </h3>
          <p className="mt-4 text-white/70 font-poppins text-sm sm:text-base max-w-xl mx-auto">
            Cada experiencia está diseñada para conectarte con la esencia auténtica de Cali,
            respetando el medio ambiente y apoyando a las comunidades locales.
          </p>
          <div className="mt-8">
            <Button variant="primary">Más Información</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
