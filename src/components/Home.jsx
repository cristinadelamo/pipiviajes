import React from 'react';
import { Plane, Wallet2, ChevronRight } from 'lucide-react';

export default function Home({ onSelectViajes, onSelectGastos }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 pt-10 pb-10">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2 rounded-xl text-slate-950">
          <Wallet2 className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-extrabold">PipiGastos Móvil</h1>
      </div>
      <p className="text-xs text-slate-400 mb-8">Todo se guarda solo en este móvil, sin conexión al servidor de casa</p>

      <div className="space-y-3">
        <button onClick={onSelectGastos}
          className="w-full flex items-center gap-3 bg-slate-900 border border-slate-800 active:border-emerald-600 rounded-2xl p-4 text-left">
          <div className="bg-emerald-500/15 text-emerald-400 p-2.5 rounded-xl">
            <Wallet2 className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-100">Gastos Sueltos</p>
            <p className="text-xs text-slate-400">Apunta gastos del día a día y vuélcalos en casa</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-600 flex-shrink-0" />
        </button>

        <button onClick={onSelectViajes}
          className="w-full flex items-center gap-3 bg-slate-900 border border-slate-800 active:border-emerald-600 rounded-2xl p-4 text-left">
          <div className="bg-teal-500/15 text-teal-400 p-2.5 rounded-xl">
            <Plane className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-100">Viajes</p>
            <p className="text-xs text-slate-400">Desglosa los gastos de un viaje concreto</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-600 flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}
