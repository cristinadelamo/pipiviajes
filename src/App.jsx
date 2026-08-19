import React, { useState } from 'react';
import useViajes from './useViajes';
import TripList from './components/TripList';
import TripDetail from './components/TripDetail';

export default function App() {
  const { viajes, addViaje, deleteViaje, addGasto, updateGasto, deleteGasto } = useViajes();
  const [openId, setOpenId] = useState(null);

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
    />
  );
}
