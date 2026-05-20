import { useState, useEffect } from 'react';
import { getLocalImagePaths } from '@/utils/projectLocalPaths';

export function useValidLocalImages(projectId: number): string[] {
  const [validPaths, setValidPaths] = useState<string[]>([]);

  useEffect(() => {
    const paths = getLocalImagePaths(projectId);
    if (paths.length === 0) {
      setValidPaths([]);
      return;
    }

    let cancelled = false;

    const checkImages = async () => {
      const results = await Promise.all(
        paths.map(
          (src) =>
            new Promise<string | null>((resolve) => {
              const img = new Image();
              img.onload = () => resolve(src);
              img.onerror = () => resolve(null);
              img.src = src;
            })
        )
      );
      if (!cancelled) {
        setValidPaths(results.filter((r): r is string => r !== null));
      }
    };

    checkImages();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return validPaths;
}