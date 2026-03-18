import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Phone, Mail, Send, Mountain, Palmtree, Building2, ChevronRight, Menu, X } from 'lucide-react';
import { contactApi } from '../services/api';

const mockServices = [
  {
    id: 1, title: 'Tour por el Centro Histórico', description: 'Recorre las calles coloniales, iglesias y plazas emblemáticas de Santiago de Cali.', price: 85000, duration: '4 horas', category: 'Cultural', imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&h=400&fit=crop',
  },
  {
    id: 2, title: 'Avistamiento en Farallones', description: 'Senderismo guiado por el Parque Nacional Natural Farallones de Cali con vistas espectaculares.', price: 150000, duration: '8 horas', category: 'Naturaleza', imageUrl: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=600&h=400&fit=crop',
  },
  {
    id: 3, title: 'Ruta de la Salsa', description: 'Visita los mejores clubes de salsa, con clase de baile incluida y guía experto.', price: 120000, duration: '5 horas', category: 'Entretenimiento', imageUrl: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&h=400&fit=crop',
  },
  {
    id: 4, title: 'Gastronomía Vallecaucana', description: 'Degusta los platos típicos: pandebono, champús, aborrajados y más en un tour gastronómico.', price: 95000, duration: '3 horas', category: 'Gastronomía', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
  },
  {
    id: 5, title: 'Haciendas del Valle', description: 'Recorre las haciendas coloniales del Valle del Cauca, historia y naturaleza en un solo lugar.', price: 200000, duration: '10 horas', category: 'Cultural', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
  },
  {
    id: 6, title: 'Río Pance y Ecoturismo', description: 'Día completo de ecoturismo en el río Pance con actividades al aire libre y almuerzo campestre.', price: 110000, duration: '6 horas', category: 'Naturaleza', imageUrl: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&h=400&fit=crop',
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');
    try {
      await contactApi.send(contactForm);
      setContactStatus('sent');
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setContactStatus('idle'), 4000);
    } catch {
      setContactStatus('error');
      setTimeout(() => setContactStatus('idle'), 4000);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

  return (
    <div className="min-h-screen bg-white">
      {/* ========== NAVBAR ========== */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Mountain className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-heading font-bold text-primary-500">Turismo Cali</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-gray-600 hover:text-primary-500 transition-colors font-medium">Inicio</a>
              <a href="#nosotros" className="text-gray-600 hover:text-primary-500 transition-colors font-medium">Nosotros</a>
              <a href="#servicios" className="text-gray-600 hover:text-primary-500 transition-colors font-medium">Servicios</a>
              <a href="#contacto" className="text-gray-600 hover:text-primary-500 transition-colors font-medium">Contacto</a>
              <Link to="/login" className="btn-primary text-sm">Iniciar Sesión</Link>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
            <a href="#inicio" className="block text-gray-600 hover:text-primary-500 font-medium">Inicio</a>
            <a href="#nosotros" className="block text-gray-600 hover:text-primary-500 font-medium">Nosotros</a>
            <a href="#servicios" className="block text-gray-600 hover:text-primary-500 font-medium">Servicios</a>
            <a href="#contacto" className="block text-gray-600 hover:text-primary-500 font-medium">Contacto</a>
            <Link to="/login" className="block btn-primary text-center text-sm">Iniciar Sesión</Link>
          </div>
        )}
      </nav>

      {/* ========== HERO ========== */}
      <section id="inicio" className="relative pt-16 min-h-[90vh] flex items-center"
        style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #2E8B57 100%)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold mb-6 leading-tight">
            Descubre la Magia de<br />
            <span className="text-accent-300">Santiago de Cali</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 text-gray-200">
            Vive experiencias únicas en la capital de la salsa. Turismo cultural, naturaleza exuberante y la mejor gastronomía del Valle del Cauca.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#servicios" className="btn-accent text-lg flex items-center justify-center gap-2">
              Ver Servicios <ChevronRight className="h-5 w-5" />
            </a>
            <a href="#contacto" className="btn-outline border-white text-white hover:bg-white hover:text-primary-500 text-lg">
              Contáctanos
            </a>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { num: '50+', label: 'Tours Disponibles' },
              { num: '2,000+', label: 'Clientes Felices' },
              { num: '15+', label: 'Años de Experiencia' },
              { num: '4.9★', label: 'Calificación' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-accent-300">{stat.num}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MISIÓN Y VISIÓN ========== */}
      <section id="nosotros" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-500 mb-4">Sobre Nosotros</h2>
            <div className="w-20 h-1 bg-accent-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Palmtree className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary-500">Misión</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Promover el turismo sostenible en el Valle del Cauca, ofreciendo experiencias auténticas que conecten a nuestros visitantes con la riqueza cultural, natural y gastronómica de la región. Nos comprometemos a brindar un servicio de excelencia con tecnología de punta, contribuyendo al desarrollo económico y social de las comunidades locales.
              </p>
            </div>
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-secondary-500" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-secondary-500">Visión</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Ser la empresa líder en turismo del suroccidente colombiano para 2030, reconocida por la innovación tecnológica en sus operaciones, la calidad de sus servicios y su compromiso con la preservación del patrimonio cultural y ambiental de Santiago de Cali y el Valle del Cauca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CATÁLOGO DE SERVICIOS ========== */}
      <section id="servicios" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-500 mb-4">Nuestros Servicios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Descubre las mejores experiencias turísticas que Santiago de Cali tiene para ofrecerte.</p>
            <div className="w-20 h-1 bg-accent-500 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockServices.map((service) => (
              <div key={service.id} className="card group">
                <div className="relative overflow-hidden h-52">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-heading font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-primary-500 font-semibold">
                      <DollarSign className="h-4 w-4" /> {formatPrice(service.price)}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" /> {service.duration}
                    </span>
                  </div>
                  <button className="mt-4 w-full btn-primary text-sm">Reservar Ahora</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACTO ========== */}
      <section id="contacto" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-500 mb-4">Contáctanos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">¿Tienes preguntas? Escríbenos y te responderemos lo antes posible.</p>
            <div className="w-20 h-1 bg-accent-500 mx-auto mt-4"></div>
          </div>
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <form onSubmit={handleContactSubmit} className="card p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input type="text" required className="input-field" placeholder="Tu nombre"
                      value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" required className="input-field" placeholder="tu@email.com"
                      value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input type="tel" className="input-field" placeholder="+57 300 000 0000"
                      value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asunto *</label>
                    <input type="text" required className="input-field" placeholder="Asunto del mensaje"
                      value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                  <textarea required rows={4} className="input-field resize-none" placeholder="Escribe tu mensaje aquí..."
                    value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} />
                </div>
                <button type="submit" disabled={contactStatus === 'sending'}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                  <Send className="h-4 w-4" />
                  {contactStatus === 'sending' ? 'Enviando...' : contactStatus === 'sent' ? '¡Mensaje Enviado!' : 'Enviar Mensaje'}
                </button>
                {contactStatus === 'error' && (
                  <p className="text-red-500 text-sm text-center">Error al enviar. Intenta de nuevo.</p>
                )}
              </form>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <h3 className="font-heading font-bold text-lg text-primary-500 mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">Dirección</p>
                      <p className="text-gray-600 text-sm">Av. 6N #23-45, Barrio Granada, Santiago de Cali, Valle del Cauca</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">Teléfono</p>
                      <p className="text-gray-600 text-sm">+57 (2) 555-1234</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">Email</p>
                      <p className="text-gray-600 text-sm">info@turismocali.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-heading font-bold text-lg text-primary-500 mb-2">Horario de Atención</h3>
                <p className="text-gray-600 text-sm">Lunes a Viernes: 8:00 AM — 6:00 PM</p>
                <p className="text-gray-600 text-sm">Sábados: 9:00 AM — 1:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-primary-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mountain className="h-6 w-6 text-accent-400" />
            <span className="text-lg font-heading font-bold text-white">Turismo Cali</span>
          </div>
          <p className="text-sm mb-2">Proyecto Integrador — Infraestructura WAN Corporativa</p>
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Turismo Cali. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
