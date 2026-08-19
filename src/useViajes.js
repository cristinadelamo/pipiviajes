import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kakebo_viajes_movil';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function useViajes() {
  const [viajes, setViajes] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(viajes));
  }, [viajes]);

  const addViaje = (v) => setViajes(prev => [...prev, { ...v, gastos: [] }]);

  const updateViaje = (id, patch) =>
    setViajes(prev => prev.map(v => v.id === id ? { ...v, ...patch } : v));

  const deleteViaje = (id) =>
    setViajes(prev => prev.filter(v => v.id !== id));

  const addGasto = (viajeId, gasto) =>
    setViajes(prev => prev.map(v => v.id === viajeId ? { ...v, gastos: [...v.gastos, gasto] } : v));

  const updateGasto = (viajeId, gastoId, patch) =>
    setViajes(prev => prev.map(v => v.id !== viajeId ? v : {
      ...v,
      gastos: v.gastos.map(g => g.id === gastoId ? { ...g, ...patch } : g),
    }));

  const deleteGasto = (viajeId, gastoId) =>
    setViajes(prev => prev.map(v => v.id !== viajeId ? v : {
      ...v,
      gastos: v.gastos.filter(g => g.id !== gastoId),
    }));

  return { viajes, addViaje, updateViaje, deleteViaje, addGasto, updateGasto, deleteGasto };
}
