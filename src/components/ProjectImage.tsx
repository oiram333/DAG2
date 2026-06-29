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

  useEffect(() => {
    const newSrc = (src && String(src).trim()) ? String(src) : ((fallbackSrc && String(fallbackSrc).trim()) ? String(fallbackSrc) : undefined);
    setCurrentSrc(newSrc);
    setFailed(false);
  }, [src, fallbackSrc]);

  if (!currentSrc || failed) {
    return null;
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