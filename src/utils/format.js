// Utilidad para formatear valores a moneda COP.
// Uso: formatCOP(1299000) => $ 1.299.000
export const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(value);
