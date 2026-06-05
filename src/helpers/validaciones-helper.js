// Falla rápido si el nombre no cumple el mínimo esperado
export const validateName = (name) => {
  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    throw new Error('El nombre es inválido: debe tener al menos 3 caracteres.');
  }
};

// Punto de entrada único para validar una provincia antes de escribirla
export const validateProvince = (province) => {
  validateName(province.name);
  validateName(province.full_name);
};
