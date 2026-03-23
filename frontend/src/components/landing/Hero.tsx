import Button from './Button';
import heroBg from '../../images/heroHeader.jpg';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Imagen de fondo ── */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Cali — La Sucursal del Cielo"
          className="w-full h-full object-cover"
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/70" />
      </div>

      {/* ── Contenido centrado ── */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-volkhov text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up italic">
          Cali: cultura, naturaleza y sabor
        </h1>

        <p className="mt-5 text-white/85 font-poppins text-base sm:text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up [animation-delay:200ms] opacity-0">
          Una ciudad que vibra entre ríos, salsa y tradición
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:400ms] opacity-0">
          <Button variant="primary">
            Conoce Cali
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
          <Button variant="secondary">Explorar Experiencias</Button>
        </div>
      </div>

      {/* ── Onda decorativa inferior ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L0,120Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}
