import Header from '@/components/feature/Header';
import Footer from '@/components/feature/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}