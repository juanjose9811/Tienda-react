// Validaciones básicas para formularios.
// Uso educativo: validación de email y longitud mínima.

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function minLength(value, len) {
  return typeof value === 'string' && value.trim().length >= len;
}
