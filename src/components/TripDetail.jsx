import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Pencil, Check, X, Download } from 'lucide-react';
import { formatCurrency } from '../format';
import { METODO_PAGO_GROUPS, DEUDA_OPTIONS } from '../constants';

export default function TripDetail({ viaje, onBack, onAddGasto, onUpdateGasto, onDeleteGasto }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [fecha, setFecha] = useState(todayStr);
  const [concepto, setConcepto] = useState('');
  const [importe, setImporte] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [deuda, setDeuda] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);

  const total = viaje.gastos.reduce((s, g) => s + Number(g.importe || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!concepto.trim() || !importe || !metodoPago) return;
    onAddGasto(viaje.id, {
      id: `mov_${Date.now()}`,
      fecha,
      concepto: concepto.trim(),
      categoria: null,
      metodoPago,
      importe: Math.abs(parseFloat(importe)) || 0,
      deuda: deuda || null,
    });
    setConcepto(''); setImporte(''); setDeuda('');
  };

  const startEdit = (g) => {
    setEditingId(g.id);
    setEditDraft({ fecha: g.fecha, concepto: g.concepto, importe: String(g.importe), metodoPago: g.metodoPago, deuda: g.deuda || '' });
  };

  const saveEdit = (id) => {
    onUpdateGasto(viaje.id, id, {
      fecha: editDraft.fecha,
      concepto: editDraft.concepto.trim(),
      importe: Math.abs(parseFloat(editDraft.importe)) || 0,
      metodoPago: editDraft.metodoPago,
      deuda: editDraft.deuda || null,
    });
    setEditingId(null);
  };

  const handleExport = () => {
    const data = {
      trip: { id: viaje.id, nombre: viaje.nombre, fechaInicio: viaje.fechaInicio, fechaFin: viaje.fechaFin },
      gastos: viaje.gastos,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const slug = viaje.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    a.href = url;
    a.download = `viaje_${slug}_${todayStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 pt-6 pb-10">
      <div className="flex items-center gap-2 mb-1">
        <button onClick={onBack} className="p-1.5 -ml-1.5 text-slate-400 active:text-slate-100">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-extrabold truncate">{viaje.nombre}</h1>
      </div>
      <p className="text-xs text-slate-400 mb-4 ml-8">
        {viaje.fechaInicio}{viaje.fechaFin ? ` — ${viaje.fechaFin}` : ''}
      </p>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-slate-400 uppercase font-bold">Total del viaje</p>
          <p className="text-2xl font-black font-mono text-emerald-400">{formatCurrency(total)}</p>
        </div>
        <button onClick={handleExport}
          className="flex items-center gap-1.5 bg-emerald-500 active:bg-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-2.5 rounded-xl">
          <Download className="w-4 h-4" /> Exportar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 mb-5">
        <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-emerald-400" /> Apuntar Gasto
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Fecha</label>
            <input type="date" value={fecha} onChange={e => setFecha(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 text-sm" />
          </div>
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Importe (€) *</label>
            <input type="number" step="0.01" inputMode="decimal" value={importe} onChange={e => setImporte(e.target.value)}
              placeholder="0,00" required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 text-sm font-bold" />
          </div>
        </div>
        <div>
          <label className="block text-[11px] text-slate-400 mb-1">Concepto *</label>
          <input type="text" value={concepto} onChange={e => setConcepto(e.target.value)}
            placeholder="ej. Cena en Trastevere" required
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Forma de pago *</label>
            <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)} required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 text-sm">
              <option value="">Elegir...</option>
              {METODO_PAGO_GROUPS.map(group => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Deuda</label>
            <select value={deuda} onChange={e => setDeuda(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 text-sm">
              <option value="">Sin deuda</option>
              {DEUDA_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="w-full bg-emerald-500 active:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl">
          Añadir al Desglose
        </button>
      </form>

      <h3 className="text-xs font-bold text-slate-400 mb-2 px-1">
        Gastos ({viaje.gastos.length})
      </h3>

      {viaje.gastos.length === 0 ? (
        <p className="text-center text-slate-500 text-sm mt-6">Todavía no has apuntado ningún gasto</p>
      ) : (
        <div className="space-y-2">
          {viaje.gastos.slice().reverse().map(g => {
            const isEditing = editingId === g.id;
            if (isEditing) {
              return (
                <div key={g.id} className="bg-slate-900 border border-emerald-700 rounded-2xl p-3 space-y-2">
                  <input type="text" value={editDraft.concepto} onChange={e => setEditDraft(d => ({ ...d, concepto: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-100 text-sm" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={editDraft.fecha} onChange={e => setEditDraft(d => ({ ...d, fecha: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-100 text-xs" />
                    <input type="number" step="0.01" value={editDraft.importe} onChange={e => setEditDraft(d => ({ ...d, importe: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-100 text-xs font-bold" />
                  </div>
                  <select value={editDraft.metodoPago} onChange={e => setEditDraft(d => ({ ...d, metodoPago: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-100 text-xs">
                    {METODO_PAGO_GROUPS.map(group => (
                      <optgroup key={group.label} label={group.label}>
                        {group.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </optgroup>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingId(null)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg">
                      <X className="w-3.5 h-3.5" /> Cancelar
                    </button>
                    <button onClick={() => saveEdit(g.id)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg">
                      <Check className="w-3.5 h-3.5" /> Guardar
                    </button>
                  </div>
                </div>
              );
            }
            return (
              <div key={g.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-100 truncate">{g.concepto}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5 flex-wrap">
                    <span>{g.fecha}</span><span>·</span><span>{g.metodoPago}</span>
                    {g.deuda && <span className="text-amber-400">· {g.deuda}</span>}
                  </p>
                </div>
                <span className="font-mono font-bold text-sm text-slate-100 flex-shrink-0">{formatCurrency(g.importe)}</span>
                <button onClick={() => startEdit(g)} className="p-1.5 text-slate-500 active:text-emerald-400 flex-shrink-0">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => { if (confirm('¿Eliminar este gasto?')) onDeleteGasto(viaje.id, g.id); }}
                  className="p-1.5 text-slate-500 active:text-red-500 flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
