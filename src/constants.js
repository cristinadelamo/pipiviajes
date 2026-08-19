// Mismas formas de pago y opciones de deuda que en PipiGastos (server/../src/constants),
// duplicadas aquí porque este módulo es un proyecto aparte, sin backend ni build compartido.

export const METODO_PAGO_GROUPS = [
  {
    label: 'Pass / Crédito',
    options: [
      { value: 'Pass', label: '✓ Pass' },
      { value: 'Pass Pendiente', label: '⏳ Pass Pendiente' },
      { value: 'Crédito', label: '✓ Crédito' },
      { value: 'Crédito Pendiente', label: '⏳ Crédito Pendiente' },
    ],
  },
  {
    label: 'Forma de pago',
    options: [
      { value: 'Metálico', label: 'Metálico' },
      { value: 'Revolut Casa', label: 'Revolut Casa' },
      { value: 'Revolut Javi', label: 'Revolut Javi' },
      { value: 'Tarjeta Javi', label: 'Tarjeta Javi' },
      { value: 'Tarjeta Xtina', label: 'Tarjeta Xtina' },
    ],
  },
];

export const DEUDA_OPTIONS = [
  { value: 'Pagas tú, te debo la mitad', label: 'Pagas tú, te debo la mitad' },
  { value: 'Pago yo, me debes la mitad', label: 'Pago yo, me debes la mitad' },
  { value: 'Pagas tú, te lo debo todo', label: 'Pagas tú, te lo debo todo' },
  { value: 'Pago yo, me lo debes todo', label: 'Pago yo, me lo debes todo' },
];
