/**
 * LandingPage — Ensambla todos los componentes modulares de la landing.
 */
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import InfoSection from '../components/landing/InfoSection';
import ValuesBanner from '../components/landing/ValuesBanner';
import ExperiencesSection from '../components/landing/ExperiencesSection';
import DestinationsSection from '../components/landing/DestinationsSection';
import IdentitySection from '../components/landing/IdentitySection';
import ContactBanner from '../components/landing/ContactBanner';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <InfoSection />
        <ValuesBanner />
        <ExperiencesSection />
        <DestinationsSection />
        <IdentitySection />
        <ContactBanner />
      </main>
      <Footer />
    </>
  );
}
