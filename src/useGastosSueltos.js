import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kakebo_gastos_movil';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Gastos sueltos (no de viaje): lista plana pensada para volcarse tal cual a Comunes,
// Personales Xtina o Personales Javi al llegar a casa — cada gasto ya lleva su cuenta.
export default function useGastosSueltos() {
  const [gastos, setGastos] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gastos));
  }, [gastos]);

  const addGasto = (g) => setGastos(prev => [...prev, g]);

  const updateGasto = (id, patch) =>
    setGastos(prev => prev.map(g => g.id === id ? { ...g, ...patch } : g));

  const deleteGasto = (id) =>
    setGastos(prev => prev.filter(g => g.id !== id));

  const clearAll = () => setGastos([]);

  return { gastos, addGasto, updateGasto, deleteGasto, clearAll };
}
