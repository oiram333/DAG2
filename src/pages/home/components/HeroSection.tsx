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
    <section id="inicio" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          alt="DAG2 Construcciones"
          className="w-full h-full object-cover object-top"
          src="https://readdy.ai/api/search-image?query=modern%20architectural%20building%20under%20construction%20at%20night%2C%20dramatic%20lighting%20with%20steel%20beams%2C%20concrete%20structure%2C%20dark%20moody%20atmosphere%2C%20high%20contrast%20black%20and%20silver%20tones%2C%20minimalist%20industrial%20aesthetic%2C%20sharp%20geometric%20lines%2C%20professional%20architectural%20photography&width=1440&height=900&seq=dag2hero01&orientation=landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto w-full transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-block mb-8">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c0c0c0] to-transparent mx-auto mb-6" />
          <div className="w-64 h-64 mx-auto flex items-center justify-center">
            <img
              alt="DAG2 Construcciones Logo"
              className="w-full h-full object-cover"
              src="https://storage.readdy-site.link/project_files/02c32817-8248-40ea-9a96-6d2ba401544b/13bfb51b-e23d-4447-a5f2-9c012e0a9f97_Copilot_20260512_173000.png?v=d6b7605c7d2f1c11bcfa6590c2029479"
            />
          </div>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c0c0c0] to-transparent mx-auto mt-6" />
        </div>

        <p className="text-xl md:text-3xl text-[#d0d0d0] tracking-[0.3em] uppercase mt-8 font-light">
          Diseño &nbsp;·&nbsp; Gestión &nbsp;·&nbsp; Construcción
        </p>

        <p className="text-[#777] text-sm md:text-base mt-6 max-w-lg mx-auto leading-relaxed tracking-wide">
          Transformamos ideas en estructuras que perduran. Soluciones integrales en arquitectura, gestión y construcción de alto nivel.
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-pulse-slow">
        <span className="text-[#888] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#888] to-transparent" />
      </div>
    </section>
  );
}