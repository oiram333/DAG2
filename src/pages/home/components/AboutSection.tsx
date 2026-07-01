import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const services = [
  {
    num: '01',
    title: 'Diseño',
    desc: 'Desarrollamos proyectos arquitectónicos con visión estética y funcional, integrando las últimas tendencias del diseño contemporáneo con la identidad y necesidades de cada cliente.',
    icon: 'ri-pencil-ruler-2-line',
  },
  {
    num: '02',
    title: 'Gestión',
    desc: 'Administramos cada etapa del proceso constructivo con precisión y eficiencia: planificación, presupuesto, supervisión y entrega en tiempo y forma.',
    icon: 'ri-bar-chart-box-line',
  },
  {
    num: '03',
    title: 'Construcción',
    desc: 'Ejecutamos obras civiles y residenciales con los más altos estándares de calidad, utilizando materiales de primer nivel y técnicas constructivas de vanguardia.',
    icon: 'ri-building-2-line',
  },
];

const tags = [
  'Arquitectura',
  'OBRA CIVIL',
  'Remodelación',
  'Supervisión de Obra',
  'Diseño Interior',
];

export default function AboutSection() {
  const { t } = useTranslation('home');
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="nosotros" ref={sectionRef} className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.5em] text-[#666] uppercase mb-4">Quiénes Somos</p>
          <div className="flex items-end gap-8 flex-wrap">
            <h2 className="text-5xl md:text-7xl font-black text-white leading-none">
              Construimos<br /><span className="text-[#c0c0c0]">Visiones</span>
            </h2>
            <div className="hidden md:block w-px h-20 bg-[#333] mb-2" />
            <p className="hidden md:block text-[#666] text-sm leading-relaxed max-w-xs mb-2">
              Empresa comprometida con la excelencia constructiva y el diseño de espacios que inspiran.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className={`transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[#aaa] text-lg leading-relaxed mb-6">
              DAG2 Construcciones S.A. de C.V. es una empresa integral especializada en arquitectura, gestión de proyectos y construcción. Nacimos con la convicción de que cada espacio debe ser concebido con propósito, rigor técnico y visión a largo plazo.
            </p>
            <p className="text-[#777] leading-relaxed mb-8">
              Nuestro equipo multidisciplinario combina creatividad arquitectónica con sólida experiencia en obras civiles, industriales, residenciales y comerciales. Desde el anteproyecto hasta la entrega final, acompañamos a nuestros clientes en cada decisión, garantizando resultados que superan expectativas.
            </p>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="border border-[#333] text-[#888] text-xs px-4 py-2 tracking-wider uppercase">{tag}</span>
              ))}
            </div>
          </div>

          <div className={`relative transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              <img
                alt="DAG2 equipo"
                className="w-full h-80 object-cover object-center"
                src="https://storage.readdy-site.link/project_files/02c32817-8248-40ea-9a96-6d2ba401544b/ec7a1fa5-1952-4983-9c68-e62f8d0eaebd_compressed_WhatsApp-Image-2026-05-21-at-15.32.05-1.webp"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-[#c0c0c0]/30" />
            <div className="absolute -top-4 -right-4 w-16 h-16 border border-[#c0c0c0]/20" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {services.map((s, i) => (
            <div
              key={s.num}
              className={`bg-[#111] p-10 border border-[#1e1e1e] hover:border-[#c0c0c0]/30 transition-all duration-500 group transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: visible ? `${300 + i * 100}ms` : '0ms' }}
            >
              <div className="w-12 h-12 flex items-center justify-center border border-[#333] group-hover:border-[#c0c0c0]/50 transition-colors duration-300 mb-8">
                <i className={`${s.icon} text-[#c0c0c0] text-xl`}></i>
              </div>
              <span className="text-xs text-[#555] tracking-[0.4em] uppercase">{s.num}</span>
              <h3 className="text-2xl font-bold text-white mt-2 mb-4 tracking-wider">{s.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}