import { useEffect, useState } from 'react';

const MAX_LOGOS = 30;

function checkImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

export function useClientLogos() {
  const [urls, setUrls] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const base = __BASE_PATH__ || '/';

    async function check() {
      const found: string[] = [];
      for (let i = 1; i <= MAX_LOGOS; i++) {
        const url = `${base}clients/${i}.png`;
        try {
          const ok = await checkImageExists(url);
          if (!cancelled && ok) {
            found.push(url);
          }
        } catch {
          // ignore
        }
      }
      if (!cancelled) {
        setUrls(found);
        setLoaded(true);
      }
    }

    check();
    return () => { cancelled = true; };
  }, []);

  return { urls, loaded };
}