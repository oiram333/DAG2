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
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-16 md:h-20 flex items-center justify-center leading-[0]">
                <img
                  alt="DAG2 Logo"
                  className="h-full w-auto object-contain"
                  src="https://public.readdy.ai/ai/img_res/ef605304-4f02-44d9-aa8e-e7bb8aba49f6.png"
                />
              </div>
            </div>
            <p className="text-[#555] text-sm leading-relaxed max-w-xs mb-8">
              Transformamos ideas en estructuras que perduran. Diseño, gestión y construcción de alto nivel.
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