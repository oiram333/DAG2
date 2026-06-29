import { useEffect, useRef, useState } from 'react';
import { useClientLogos } from '@/hooks/useClientLogos';

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { urls, loaded } = useClientLogos();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="clientes" ref={sectionRef} className="py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.5em] text-[#666] uppercase mb-4">Clientes</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Quienes Confían<br /><span className="text-[#c0c0c0]">en Nosotros</span>
          </h2>
          <div className="w-16 h-px bg-[#c0c0c0]/30 mt-6" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
          {urls.map((url, i) => (
            <div
              key={i}
              className={`bg-[#0f0f0f] p-8 md:p-10 flex items-center justify-center hover:bg-[#141414] transition-all duration-500 group cursor-default ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: visible ? `${200 + i * 80}ms` : '0ms' }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center opacity-50 group-hover:opacity-80 transition-opacity duration-500">
                <img
                  alt={`Logo cliente ${i + 1}`}
                  className="w-full h-full object-contain"
                  src={url}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <p className={`text-center text-[#555] text-xs tracking-[0.3em] uppercase mt-12 transition-all duration-700 delay-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          +{urls.length > 0 ? urls.length : '50'} empresas han depositado su confianza en DAG2
        </p>
      </div>
    </section>
  );
}