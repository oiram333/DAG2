import { useState } from 'react';

interface ProjectImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string;
}

export default function ProjectImage({ src, fallbackSrc, ...props }: ProjectImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      {...props}
      src={currentSrc}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}