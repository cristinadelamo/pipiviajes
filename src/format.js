export const formatCurrency = (val) => {
  return Number(val || 0).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true }) + ' €';
};
