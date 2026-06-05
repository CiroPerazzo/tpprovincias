export const validateId = (id) => {
  const parsed = parseInt(id);
  return !isNaN(parsed) && parsed > 0;
};

export const validateProvince = (body) => {
  const { name, capital, population } = body;
  if (!name || typeof name !== 'string' || name.trim() === '') return false;
  if (!capital || typeof capital !== 'string' || capital.trim() === '') return false;
  if (population === undefined || isNaN(parseInt(population))) return false;
  return true;
};
