import { useState, useEffect } from 'react';

interface ProjectImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string;
  alt: string;
}

export default function ProjectImage({ src, fallbackSrc, alt, className, ...props }: ProjectImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(
    (src && String(src).trim()) ? String(src) : ((fallbackSrc && String(fallbackSrc).trim()) ? String(fallbackSrc) : undefined)
  );
  const [failed, setFailed] = useState(false);

  // Actualizar currentSrc cuando cambia la prop src
  useEffect(() => {
    const newSrc = (src && String(src).trim()) ? String(src) : ((fallbackSrc && String(fallbackSrc).trim()) ? String(fallbackSrc) : undefined);
    setCurrentSrc(newSrc);
    setFailed(false);
  }, [src, fallbackSrc]);

  if (!currentSrc || failed) {
    return (
      <div
        className={`bg-[#1a1a1a] flex items-center justify-center border border-[#2a2a2a] ${className || ''}`}
        {...props}
      >
        <div className="text-center px-4">
          <i className="ri-image-line text-[#777] text-3xl mb-2 block"></i>
          <span className="text-[#999] text-xs tracking-wider uppercase font-medium">{alt || 'Imagen'}</span>
          <span className="text-[#555] text-[10px] block mt-1">Sin imagen disponible</span>
        </div>
      </div>
    );
  }

  return (
    <img
      {...props}
      alt={alt}
      className={className}
      src={currentSrc}
      onError={() => {
        if (fallbackSrc && String(fallbackSrc).trim() && currentSrc !== fallbackSrc) {
          setCurrentSrc(String(fallbackSrc));
        } else {
          setFailed(true);
        }
      }}
    />
  );
}