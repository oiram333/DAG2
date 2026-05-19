import { contactInfo } from '@/mocks/home';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-20 h-20 flex items-center justify-center">
                <img
                  alt="DAG2 Logo"
                  className="w-full h-full object-cover"
                  src="https://storage.readdy-site.link/project_files/02c32817-8248-40ea-9a96-6d2ba401544b/13bfb51b-e23d-4447-a5f2-9c012e0a9f97_Copilot_20260512_173000.png?v=d6b7605c7d2f1c11bcfa6590c2029479"
                />
              </div>
              <div>
                <h2 className="text-4xl font-black tracking-[0.1em] text-white">
                  DAG<span className="text-[#c0c0c0]">2</span>
                </h2>
                <p className="text-xs tracking-[0.4em] text-[#444] uppercase mt-1">
                  Construcciones S.A. de C.V.
                </p>
              </div>
            </div>
            <p className="text-[#555] text-sm leading-relaxed max-w-xs mb-8">
              Transformamos ideas en estructuras que perduran. Diseño, gestión y construcción de alto nivel en Celaya y área metropolitana.
            </p>
            <div className="flex gap-2">
              <a
                href={contactInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[#222] text-[#555] hover:text-[#c0c0c0] hover:border-[#c0c0c0]/30 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-instagram-line text-sm"></i>
              </a>
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[#222] text-[#555] hover:text-[#c0c0c0] hover:border-[#c0c0c0]/30 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-facebook-circle-line text-sm"></i>
              </a>
              <a
                href={contactInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[#222] text-[#555] hover:text-[#c0c0c0] hover:border-[#c0c0c0]/30 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-linkedin-box-line text-sm"></i>
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[#222] text-[#555] hover:text-[#c0c0c0] hover:border-[#c0c0c0]/30 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-whatsapp-line text-sm"></i>
              </a>
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#444] uppercase mb-6">Navegación</p>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', href: '#inicio' },
                { label: 'Quiénes Somos', href: '#nosotros' },
                { label: 'Proyectos', href: '#proyectos' },
                { label: 'Contacto', href: '#contacto' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-[#555] hover:text-[#c0c0c0] text-sm transition-colors duration-300 cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#444] uppercase mb-6">Contacto</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <i className="ri-map-pin-line text-[#c0c0c0]/50 text-sm mt-0.5"></i>
                <span className="text-[#555] text-sm">{contactInfo.address}</span>
              </li>
              {contactInfo.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-3">
                  <i className="ri-phone-line text-[#c0c0c0]/50 text-sm"></i>
                  <a href={`tel:+52${phone.replace(/\s/g, '')}`} className="text-[#555] hover:text-[#c0c0c0] text-sm transition-colors cursor-pointer">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <i className="ri-mail-line text-[#c0c0c0]/50 text-sm"></i>
                <a href={`mailto:${contactInfo.email}`} className="text-[#555] hover:text-[#c0c0c0] text-sm transition-colors cursor-pointer">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#333] text-xs tracking-wider">
            &copy; {new Date().getFullYear()} DAG2 Construcciones S.A. de C.V. Todos los derechos reservados.
          </p>
          <p className="text-[#333] text-xs tracking-[0.3em] uppercase">
            Diseño · Gestión · Construcción
          </p>
        </div>
      </div>
    </footer>
  );
}