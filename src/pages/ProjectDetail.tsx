import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectDetails } from '@/mocks/projects';
import { useValidLocalImages } from '@/hooks/useValidLocalImages';
import ProjectImage from '@/components/ProjectImage';
import Header from '@/components/feature/Header';
import Footer from '@/components/feature/Footer';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectDetails.find((p) => p.slug === slug);
  const heroRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const validImages = useValidLocalImages(project.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Proyecto no encontrado</h1>
          <Link
            to="/"
            className="text-[#c0c0c0] hover:text-white text-sm tracking-[0.2em] uppercase border border-[#c0c0c0]/40 px-6 py-3 inline-block transition-all duration-300"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = validImages[0] || '';

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <ProjectImage
              alt={project.title}
              className="w-full h-full object-cover object-top"
              fallbackSrc=""
              src={heroImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          </div>

          <div ref={heroRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-12 pb-10 md:pb-16">
            <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link
                to="/#proyectos"
                className="text-[#888] hover:text-[#c0c0c0] text-xs tracking-[0.2em] uppercase mb-4 md:mb-6 inline-flex items-center gap-2 transition-colors duration-300"
              >
                <span className="w-6 h-px bg-[#888]" />
                Proyectos
              </Link>
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-2 text-[#888] text-xs tracking-wider">
                <span className="text-[#c0c0c0] border border-[#c0c0c0]/30 px-3 py-1">
                  {project.category}
                </span>
                <span className="flex items-center gap-2">
                  <i className="ri-building-line text-[#666]"></i>
                  {project.client}
                </span>
                <span className="flex items-center gap-2">
                  <i className="ri-calendar-line text-[#666]"></i>
                  {project.year}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Descripción */}
        <section className="py-12 md:py-20 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
              <article className="lg:col-span-2">
                <h2 className="text-xs tracking-[0.5em] text-[#666] uppercase mb-6">
                  Descripción del Proyecto
                </h2>
                <p className="text-[#bbb] text-base md:text-lg leading-relaxed mb-8 md:mb-10">
                  {project.description}
                </p>

                <h3 className="text-xs tracking-[0.5em] text-[#666] uppercase mb-6">
                  Alcance de Trabajo
                </h3>
                <ul className="space-y-3">
                  {project.scope.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 text-[#999] text-sm leading-relaxed"
                    >
                      <span className="w-6 h-6 flex items-center justify-center border border-[#333] text-[#c0c0c0] text-xs shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <aside className="lg:col-span-1">
                <div className="border border-[#1e1e1e] p-6 md:p-8 lg:sticky lg:top-28">
                  <h3 className="text-xs tracking-[0.4em] text-[#666] uppercase mb-6">
                    Detalles del Proyecto
                  </h3>
                  <dl className="space-y-5">
                    <div>
                      <dt className="text-[#444] text-xs tracking-[0.3em] uppercase mb-1">Cliente</dt>
                      <dd className="text-white text-sm">{project.client}</dd>
                    </div>
                    <div>
                      <dt className="text-[#444] text-xs tracking-[0.3em] uppercase mb-1">Año</dt>
                      <dd className="text-white text-sm">{project.year}</dd>
                    </div>
                    <div>
                      <dt className="text-[#444] text-xs tracking-[0.3em] uppercase mb-1">Categoría</dt>
                      <dd className="text-white text-sm">{project.category}</dd>
                    </div>
                  </dl>

                  <a
                    href="/#contacto"
                    className="mt-8 w-full flex items-center justify-center gap-2 border border-[#c0c0c0]/40 text-[#c0c0c0] hover:bg-[#c0c0c0] hover:text-black text-xs tracking-[0.2em] uppercase py-3.5 transition-all duration-300 cursor-pointer whitespace-nowrap"
                  >
                    Solicitar Cotización
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Galería de Fotos */}
        <section className="py-12 md:py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
            <div className="mb-10 md:mb-16">
              <h2 className="text-xs tracking-[0.5em] text-[#666] uppercase mb-4">Galería</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-none">
                Fotos del <span className="text-[#c0c0c0]">Proyecto</span>
              </h3>
            </div>

            {validImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {validImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className="group relative bg-[#111] border border-[#1e1e1e] overflow-hidden cursor-pointer text-left"
                  >
                    <ProjectImage
                      alt={`${project.title} - Foto ${i + 1}`}
                      className="w-full h-52 md:h-64 lg:h-72 object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      fallbackSrc=""
                      src={img}
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 z-10 bg-black/70 text-[#c0c0c0] text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 border border-[#c0c0c0]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver Foto {i + 1}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 md:py-24 border border-[#1e1e1e]">
                <i className="ri-image-line text-[#333] text-4xl mb-4 block"></i>
                <p className="text-[#555] text-sm tracking-wider uppercase">Fotos del proyecto próximamente</p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {lightboxIndex !== null && validImages.length > 0 && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white text-3xl transition-colors cursor-pointer z-50"
              onClick={() => setLightboxIndex(null)}
            >
              <i className="ri-close-line"></i>
            </button>
            <button
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl transition-colors cursor-pointer z-50"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex === 0 ? validImages.length - 1 : lightboxIndex - 1);
              }}
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl transition-colors cursor-pointer z-50"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex === validImages.length - 1 ? 0 : lightboxIndex + 1);
              }}
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
            <div className="max-w-5xl w-full mx-2 md:mx-4" onClick={(e) => e.stopPropagation()}>
              <ProjectImage
                alt={`${project.title} - Foto ${lightboxIndex + 1}`}
                className="w-full max-h-[70vh] md:max-h-[80vh] object-contain"
                fallbackSrc=""
                src={validImages[lightboxIndex]}
              />
              <p className="text-center text-[#888] text-xs tracking-widest mt-4 uppercase">
                {lightboxIndex + 1} / {validImages.length}
              </p>
            </div>
          </div>
        )}

        {/* Otros Proyectos */}
        <section className="py-12 md:py-20 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
              <div>
                <h2 className="text-xs tracking-[0.5em] text-[#666] uppercase mb-4">Portafolio</h2>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white">
                  Más <span className="text-[#c0c0c0]">Proyectos</span>
                </h3>
              </div>
              <Link
                to="/#proyectos"
                className="flex items-center gap-2 text-[#888] hover:text-[#c0c0c0] text-xs tracking-[0.2em] uppercase transition-colors duration-300"
              >
                Ver Todos
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
              {projectDetails
                .filter((p) => p.id !== project.id)
                .slice(0, 3)
                .map((p) => (
                  <RelatedProjectCard key={p.id} project={p} />
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function RelatedProjectCard({ project }: { project: typeof projectDetails[0] }) {
  const validImages = useValidLocalImages(project.id);
  const heroImage = validImages[validImages.length - 1] || '';

  return (
    <Link
      to={`/proyecto/${project.slug}`}
      className="group bg-[#111] border border-[#1e1e1e] hover:border-[#c0c0c0]/30 transition-all duration-500 overflow-hidden"
    >
      <div className="relative overflow-hidden h-44 md:h-48">
        <ProjectImage
          alt={project.title}
          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          fallbackSrc=""
          src={heroImage}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
      </div>
      <div className="p-4 md:p-5">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#c0c0c0] border border-[#c0c0c0]/20 px-2 py-0.5">
          {project.category}
        </span>
        <h4 className="text-base md:text-lg font-bold text-white tracking-wider mt-3 group-hover:text-[#c0c0c0] transition-colors duration-300">
          {project.title}
        </h4>
      </div>
    </Link>
  );
}