import { useEffect, useRef, useState } from 'react';
import { contactInfo } from '@/mocks/home';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    setSubmitting(true);
    try {
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('phone', formData.phone);
      params.append('message', formData.message);
      await fetch('https://readdy.ai/api/form/d81qsotimqud1mmjgktg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      setSubmitted(true);
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error('Error enviando formulario:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hola, soy ${formData.name || 'un cliente interesado'}. ${formData.message || 'Me gustaría solicitar una cotización.'}`;
    window.open(`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contacto" ref={sectionRef} className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.5em] text-[#666] uppercase mb-4">Contacto</p>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-none">
            Hagamos<br /><span className="text-[#c0c0c0]">Realidad</span> tu Proyecto
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className={`space-y-8 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[#888] leading-relaxed mb-12 max-w-sm">
              Cuéntanos tu idea o proyecto. Nuestro equipo te contactará para ofrecerte una propuesta a la medida de tus necesidades y presupuesto.
            </p>

            <div className="space-y-8">
              {contactInfo.phones.slice(0, 1).map((phone) => (
                <a key={phone} href={`https://wa.me/${contactInfo.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 flex items-center justify-center border border-[#2a2a2a] group-hover:border-[#c0c0c0]/40 transition-colors duration-300">
                    <i className="ri-whatsapp-line text-[#c0c0c0] text-lg"></i>
                  </div>
                  <div>
                    <p className="text-[#444] text-xs tracking-[0.3em] uppercase mb-1">WhatsApp</p>
                    <p className="text-[#bbb] text-sm group-hover:text-white transition-colors duration-300">{phone}</p>
                  </div>
                </a>
              ))}

              <a href={`mailto:${contactInfo.email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center border border-[#2a2a2a] group-hover:border-[#c0c0c0]/40 transition-colors duration-300">
                  <i className="ri-mail-line text-[#c0c0c0] text-lg"></i>
                </div>
                <div>
                  <p className="text-[#444] text-xs tracking-[0.3em] uppercase mb-1">Correo</p>
                  <p className="text-[#bbb] text-sm group-hover:text-white transition-colors duration-300">{contactInfo.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center border border-[#2a2a2a] group-hover:border-[#c0c0c0]/40 transition-colors duration-300">
                  <i className="ri-map-pin-line text-[#c0c0c0] text-lg"></i>
                </div>
                <div>
                  <p className="text-[#444] text-xs tracking-[0.3em] uppercase mb-1">Ubicación</p>
                  <p className="text-[#bbb] text-sm group-hover:text-white transition-colors duration-300">{contactInfo.address}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-12">
              <span className="text-[#444] text-xs tracking-[0.3em] uppercase mr-4">Síguenos</span>
              <a href={contactInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-[#222] text-[#666] hover:text-[#c0c0c0] hover:border-[#c0c0c0]/40 transition-all duration-300 cursor-pointer">
                <i className="ri-instagram-line text-base"></i>
              </a>
              <a href={contactInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-[#222] text-[#666] hover:text-[#c0c0c0] hover:border-[#c0c0c0]/40 transition-all duration-300 cursor-pointer">
                <i className="ri-facebook-circle-line text-base"></i>
              </a>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="border border-[#1e1e1e] p-8 md:p-10">
              <h3 className="text-xl font-bold text-white tracking-wider mb-8">Enviar Mensaje por WhatsApp</h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#c0c0c0]/30">
                    <i className="ri-check-line text-[#c0c0c0] text-3xl"></i>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">¡Mensaje enviado!</h4>
                  <p className="text-[#666]">Nos pondremos en contacto contigo pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" data-readdy-form id="contact-form">
                  <div>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nombre completo"
                      className="w-full bg-transparent border border-[#2a2a2a] text-white text-sm px-4 py-3.5 focus:outline-none focus:border-[#c0c0c0]/50 transition-colors duration-300 placeholder-[#444]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Teléfono de contacto"
                      className="w-full bg-transparent border border-[#2a2a2a] text-white text-sm px-4 py-3.5 focus:outline-none focus:border-[#c0c0c0]/50 transition-colors duration-300 placeholder-[#444]"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe tu proyecto o consulta..."
                      rows={5}
                      maxLength={500}
                      className="w-full bg-transparent border border-[#2a2a2a] text-white text-sm px-4 py-3.5 focus:outline-none focus:border-[#c0c0c0]/50 transition-colors duration-300 placeholder-[#444] resize-none"
                      required
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[#444] text-xs ml-auto">{formData.message.length}/500</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ea855] text-white text-sm tracking-[0.2em] uppercase py-4 transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    <i className="ri-whatsapp-line text-lg"></i>
                    {submitting ? 'Enviando...' : 'Enviar por WhatsApp'}
                  </button>
                  <p className="text-[#444] text-xs text-center leading-relaxed">
                    Al enviar, se abrirá WhatsApp con tu mensaje listo para enviar a nuestro equipo.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}