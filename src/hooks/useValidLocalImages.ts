import { useState, useEffect, useRef } from 'react';
import { getLocalImagePaths } from '@/utils/projectLocalPaths';

function checkImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

export function useValidLocalImages(projectId: number | undefined): string[] {
  const [validPaths, setValidPaths] = useState<string[]>([]);
  const idRef = useRef(projectId);

  useEffect(() => {
    idRef.current = projectId;

    const paths = getLocalImagePaths(projectId);
    if (paths.length === 0) {
      setValidPaths([]);
      return;
    }

    let cancelled = false;

    const checkImages = async () => {
      const results: string[] = [];
      for (const url of paths) {
        if (cancelled) break;
        const ok = await checkImageExists(url);
        if (ok) results.push(url);
      }
      if (!cancelled && idRef.current === projectId) {
        setValidPaths(results);
      }
    };

    checkImages();

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return validPaths;
}