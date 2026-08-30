import React, { useState } from 'react';
import useViajes from './useViajes';
import useGastosSueltos from './useGastosSueltos';
import Home from './components/Home';
import TripList from './components/TripList';
import TripDetail from './components/TripDetail';
import GastoSueltoView from './components/GastoSueltoView';

export default function App() {
  const { viajes, addViaje, deleteViaje, addGasto, updateGasto, deleteGasto } = useViajes();
  const gastosSueltos = useGastosSueltos();
  const [openId, setOpenId] = useState(null);
  const [modo, setModo] = useState(null); // null (home) | 'viajes' | 'gastos'

  if (modo === 'gastos') {
    return (
      <GastoSueltoView
        gastos={gastosSueltos.gastos}
        onAdd={gastosSueltos.addGasto}
        onUpdate={gastosSueltos.updateGasto}
        onDelete={gastosSueltos.deleteGasto}
        onClearAll={gastosSueltos.clearAll}
        onBack={() => setModo(null)}
      />
    );
  }

  if (modo === 'viajes') {
    const viajeAbierto = viajes.find(v => v.id === openId);
    if (viajeAbierto) {
      return (
        <TripDetail
          viaje={viajeAbierto}
          onBack={() => setOpenId(null)}
          onAddGasto={addGasto}
          onUpdateGasto={updateGasto}
          onDeleteGasto={deleteGasto}
        />
      );
    }
    return (
      <TripList
        viajes={viajes}
        onAdd={addViaje}
        onDelete={deleteViaje}
        onOpen={setOpenId}
        onBack={() => setModo(null)}
      />
    );
  }

  return <Home onSelectGastos={() => setModo('gastos')} onSelectViajes={() => setModo('viajes')} />;
}
