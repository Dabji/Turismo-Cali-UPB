/**
 * Tarjeta reutilizable para cada línea de experiencia turística.
 * Imagen superior con icono flotante, título Volkhov, bullets descriptivos.
 */

interface ExperienceCardProps {
  image: string;
  title: string;
  description: string;
  bullets: string[];
  accentColor: string;          // Color del icono flotante (bg-*)
  icon: React.ReactNode;
}

export default function ExperienceCard({
  image,
  title,
  description,
  bullets,
  accentColor,
  icon,
}: ExperienceCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group">
      {/* ── Imagen con overlay y título ── */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />

        {/* Icono flotante esquina superior derecha */}
        <div
          className={`absolute top-4 right-4 w-11 h-11 ${accentColor} rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>

        {/* Título sobre la imagen */}
        <h3 className="absolute bottom-4 left-5 font-volkhov text-white text-xl sm:text-2xl font-bold">
          {title}
        </h3>
      </div>

      {/* ── Contenido debajo ── */}
      <div className="p-5 sm:p-6">
        <p className="text-ash font-poppins text-sm leading-relaxed mb-4">
          {description}
        </p>

        <ul className="space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-ash font-poppins text-xs sm:text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>

        {/* Línea decorativa inferior */}
        <div className={`mt-5 h-1 w-12 rounded-full ${accentColor} group-hover:w-20 transition-all duration-500`} />
      </div>
    </div>
  );
}
