import { useEffect, useRef, useState } from 'react';
import { metrics } from '@/mocks/home';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="inicio" ref={sectionRef} className="relative min-h-screen flex items-start justify-center overflow-hidden pt-32 md:pt-40">
      <div className="absolute inset-0">
        <img
          alt="DAG2 Construcciones"
          className="w-full h-full object-cover object-center"
          src="https://storage.readdy-site.link/project_files/02c32817-8248-40ea-9a96-6d2ba401544b/c1a54351-4d9b-4591-944e-9bf7359a28be_compressed_background_Logo.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
      </div>

      <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto w-full transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-block mb-3 md:mb-4">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c0c0c0] to-transparent mx-auto mb-3 md:mb-4" />
          <div className="w-56 h-56 md:w-80 md:h-80 mx-auto flex items-center justify-center">
            <img
              alt="DAG2 Construcciones Logo"
              className="w-full h-full object-contain"
              src="https://storage.readdy-site.link/project_files/02c32817-8248-40ea-9a96-6d2ba401544b/e05b4835-80e4-457e-88bf-2bb810f739fd_DAG2.png?v=e39a859bb68c17890e057d199986c9d8"
            />
          </div>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c0c0c0] to-transparent mx-auto mt-3 md:mt-4" />
        </div>

        <p className="text-lg md:text-2xl text-[#d0d0d0] tracking-[0.15em] uppercase mt-4 md:mt-5 font-medium max-w-2xl mx-auto leading-relaxed">
          SOLUCIONES INTEGRALES EN ARQUITECTURA, GESTIÓN Y CONSTRUCCIÓN DE ALTO NIVEL.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button
            onClick={() => scrollTo('#proyectos')}
            className="border border-white text-white hover:bg-white hover:text-black text-sm tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Ver Proyectos
          </button>
          <button
            onClick={() => scrollTo('#contacto')}
            className="bg-[#c0c0c0] text-black hover:bg-white text-sm tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Cotizar Ahora
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-12 mt-20 border-t border-white/10 pt-12">
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-black text-white tracking-wider">{m.value}</p>
              <p className="text-[#666] text-xs tracking-[0.25em] uppercase mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}