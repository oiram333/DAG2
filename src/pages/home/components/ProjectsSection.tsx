import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectDetails } from '@/mocks/projects';
import { getLocalImagePaths } from '@/utils/projectLocalPaths';
import ProjectImage from '@/components/ProjectImage';

const categories = ['Todos', 'Industrial', 'Residencial', 'Mantenimiento', 'Comercial'];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === 'Todos'
    ? projectDetails
    : projectDetails.filter((p) => p.category === activeFilter);

  return (
    <section id="proyectos" ref={sectionRef} className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.5em] text-[#666] uppercase mb-4">Portafolio</p>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-none mb-8">
            Nuestros<br /><span className="text-[#c0c0c0]">Proyectos</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 cursor-pointer whitespace-nowrap border ${
                  activeFilter === cat
                    ? 'bg-[#c0c0c0] text-black border-[#c0c0c0]'
                    : 'border-[#333] text-[#666] hover:border-[#c0c0c0]/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {filtered.map((project, index) => {
            const localPaths = getLocalImagePaths(project.id);
            const heroLocal = localPaths[0] || '';
            return (
              <Link
                to={`/proyecto/${project.slug}`}
                key={project.id}
                className={`group relative overflow-hidden cursor-pointer bg-[#111] border border-[#1e1e1e] hover:border-[#c0c0c0]/30 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
              >
                <div className="relative overflow-hidden h-56">
                  <ProjectImage
                    alt={project.title}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    fallbackSrc={project.image}
                    src={heroLocal || project.image}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                  <span className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-[#c0c0c0] bg-black/60 px-3 py-1 border border-[#c0c0c0]/30">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white tracking-wider group-hover:text-[#c0c0c0] transition-colors duration-300 mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[#555] text-xs">
                    <i className="ri-map-pin-line text-[#c0c0c0]/50"></i>
                    <span>{project.location}</span>
                    <span className="mx-2 text-[#333]">·</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-[#888] text-xs tracking-wider uppercase group-hover:text-[#c0c0c0] transition-colors">
                    <span>Ver Proyecto</span>
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="text-[#444] text-xs tracking-widest text-center mt-12 uppercase">
          Haz clic en cualquier proyecto para ver detalles y galería de fotos
        </p>
      </div>
    </section>
  );
}