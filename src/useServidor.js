import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kakebo_servidor_url';

// URL de la principal en la red de casa (ej. https://ip-de-tu-router:puerto), para poder
// sincronizar los Gastos Sueltos directamente por red en vez de exportar un .json.
export default function useServidor() {
  const [url, setUrlState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      if (url) localStorage.setItem(STORAGE_KEY, url);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage no disponible: la URL solo dura lo que dure esta pestaña
    }
  }, [url]);

  // Quita barra final y espacios, para que no falle la concatenación de rutas
  const setUrl = (v) => setUrlState(v.trim().replace(/\/+$/, ''));

  return { url, setUrl };
}
