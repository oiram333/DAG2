import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Quiénes Somos', href: '#nosotros' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
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

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 border-b border-white/10 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20 md:h-24">
        <a href="/" onClick={goHome} className="flex items-center group leading-[0]">
          <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 flex items-center justify-center leading-[0]">
            <img
              alt="DAG2 Construcciones Logo"
              className="h-10 md:h-12 w-auto object-contain"
              src="https://public.readdy.ai/ai/img_res/ef605304-4f02-44d9-aa8e-e7bb8aba49f6.png"
            />
          </div>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-[#aaa] hover:text-white text-sm tracking-[0.12em] uppercase transition-colors duration-300 cursor-pointer whitespace-nowrap relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c0c0c0] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          onClick={(e) => handleNavClick(e, '#contacto')}
          className="hidden md:flex items-center gap-2 border border-[#c0c0c0]/40 text-[#c0c0c0] hover:bg-[#c0c0c0] hover:text-black text-xs tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 cursor-pointer whitespace-nowrap"
        >
          Cotizar
        </a>

        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-white transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </div>

      <div className={`md:hidden bg-black/98 border-t border-white/10 transition-all duration-400 overflow-hidden ${mobileOpen ? 'max-h-60' : 'max-h-0'}`}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="block w-full text-left px-8 py-3 text-[#aaa] hover:text-white text-sm tracking-[0.15em] uppercase cursor-pointer transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}