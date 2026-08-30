import React, { useState } from 'react';
import { Plane, Plus, ChevronRight, Trash2, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '../format';

export default function TripList({ viajes, onAdd, onDelete, onOpen, onBack }) {
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    onAdd({ id: `mov_${Date.now()}`, nombre: nombre.trim(), fechaInicio, fechaFin: fechaFin || null });
    setNombre(''); setFechaFin('');
    setShowForm(false);
  };

  const total = (v) => v.gastos.reduce((s, g) => s + Number(g.importe || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 pt-6 pb-10">
      <div className="flex items-center gap-2.5 mb-1">
        {onBack && (
          <button onClick={onBack} className="p-1.5 -ml-1.5 text-slate-400 active:text-slate-100">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2 rounded-xl text-slate-950">
          <Plane className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-extrabold">PipiViajes</h1>
      </div>
      <p className="text-xs text-slate-400 mb-5">Se guarda solo en este móvil · exporta al terminar el viaje</p>

      <button
        onClick={() => setShowForm(s => !s)}
        className="w-full flex items-center justify-center gap-2 bg-emerald-500 active:bg-emerald-400 text-slate-950 font-bold py-3 rounded-2xl shadow-lg shadow-emerald-900/30 mb-4"
      >
        <Plus className="w-4 h-4" /> Nuevo Viaje
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 mb-5">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Nombre del viaje *</label>
            <input autoFocus type="text" value={nombre} onChange={e => setNombre(e.target.value)}
              placeholder="ej. Terapia de Casariego" required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Fecha inicio</label>
              <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 text-sm" />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Fecha fin</label>
              <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 text-sm" />
            </div>
          </div>
          <button type="submit" className="w-full bg-emerald-500 active:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl">
            Crear
          </button>
        </form>
      )}

      {viajes.length === 0 ? (
        <p className="text-center text-slate-500 text-sm mt-10">Aún no has creado ningún viaje</p>
      ) : (
        <div className="space-y-2">
          {viajes.slice().reverse().map(v => (
            <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <button onClick={() => onOpen(v.id)} className="flex-1 min-w-0 text-left">
                <p className="font-bold text-slate-100 truncate">{v.nombre}</p>
                <p className="text-xs text-slate-400">
                  {v.gastos.length} gasto{v.gastos.length !== 1 ? 's' : ''} · {formatCurrency(total(v))}
                </p>
              </button>
              <button onClick={() => { if (confirm(`¿Borrar "${v.nombre}" y todos sus gastos?`)) onDelete(v.id); }}
                className="p-2 text-slate-500 active:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
              <button onClick={() => onOpen(v.id)} className="p-1 text-slate-500">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
