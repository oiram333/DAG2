import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { clients } from '@/mocks/home';

const BUCKET = 'client-logos';

function buildLogoUrl(clientId: number): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(`${clientId}.png`);
  return data.publicUrl;
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);
  if (!exists) {
    await supabase.storage.createBucket(BUCKET, { public: true });
  }
}

export default function LogoUploadPage() {
  const [logos, setLogos] = useState<Record<number, string>>({});
  const [uploading, setUploading] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [bucketReady, setBucketReady] = useState(false);
  const [bucketError, setBucketError] = useState<string | null>(null);

  useEffect(() => {
    ensureBucket()
      .then(() => setBucketReady(true))
      .catch((err) => setBucketError(err.message || 'No se pudo crear el bucket. Asegúrate de tener los permisos necesarios en Supabase.'));
  }, []);

  useEffect(() => {
    if (!bucketReady) return;
    const urls: Record<number, string> = {};
    clients.forEach((c) => {
      urls[c.id] = buildLogoUrl(c.id);
    });
    setLogos(urls);
  }, [bucketReady]);

  const handleUpload = async (clientId: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      setMessage('Solo se aceptan imágenes.');
      return;
    }
    setUploading(clientId);
    setMessage(null);
    try {
      const ext = file.name.split('.').pop() || 'png';
      const path = `${clientId}.${ext}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true, contentType: file.type });
      if (error) throw error;
      setLogos((prev) => ({ ...prev, [clientId]: buildLogoUrl(clientId) }));
      setMessage(`Logo del cliente #${clientId} subido correctamente.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error desconocido';
      setMessage(`Error: ${msg}`);
    } finally {
      setUploading(null);
    }
  };

  if (bucketError) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <i className="ri-error-warning-line text-4xl text-amber-400 mb-4 block" />
          <p className="text-lg mb-2">Bucket no disponible</p>
          <p className="text-sm text-[#888]">{bucketError}</p>
          <p className="text-xs text-[#666] mt-4">
            Entra al panel de Supabase &gt; Storage &gt; New Bucket, crea uno llamado <strong className="text-white">client-logos</strong> y márcalo como público.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-14">
          <p className="text-xs tracking-[0.5em] text-[#666] uppercase mb-4">Admin</p>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Subir Logos<br /><span className="text-[#c0c0c0]">de Clientes</span>
          </h1>
          <div className="w-16 h-px bg-[#c0c0c0]/30 mt-6" />
          <p className="text-sm text-[#777] mt-4 max-w-lg">
            Arrastra o haz clic para subir el logo de cada cliente en formato PNG. Los logos deben tener fondo transparente o blanco para verse bien en el sitio.
          </p>
        </div>

        {message && (
          <div className={`mb-8 px-5 py-3 border text-sm ${message.startsWith('Error') ? 'border-red-500/30 bg-red-500/10 text-red-400' : 'border-green-500/30 bg-green-500/10 text-green-400'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {clients.map((client) => (
            <div key={client.id} className="bg-[#0f0f0f] border border-[#1a1a1a] p-4 flex flex-col items-center gap-3 group">
              <div className="w-20 h-20 flex items-center justify-center bg-[#0a0a0a] border border-[#1a1a1a] relative overflow-hidden">
                {logos[client.id] ? (
                  <img
                    alt={`Logo ${client.name}`}
                    className="w-full h-full object-contain p-2"
                    src={`${logos[client.id]}?t=${Date.now()}`}
                  />
                ) : (
                  <i className="ri-image-line text-2xl text-[#333]" />
                )}
              </div>
              <span className="text-[#888] text-[11px] tracking-[0.15em] uppercase text-center leading-tight">{client.name}</span>
              <label className={`w-full text-center text-[11px] tracking-[0.15em] uppercase py-2 border cursor-pointer transition-all duration-200 whitespace-nowrap ${uploading === client.id ? 'border-[#c0c0c0]/20 text-[#555]' : 'border-[#333] text-[#777] hover:border-[#c0c0c0]/40 hover:text-[#c0c0c0]'}`}>
                {uploading === client.id ? 'Subiendo...' : 'Subir Logo'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(client.id, file);
                  }}
                  disabled={uploading !== null}
                />
              </label>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#1a1a1a]">
          <a href="/" className="text-xs tracking-[0.15em] text-[#666] hover:text-[#c0c0c0] uppercase transition-colors">
            &larr; Volver al sitio
          </a>
        </div>
      </div>
    </div>
  );
}