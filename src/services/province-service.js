import provinceRepository from '../repositories/province-repository.js';
import { validateProvince } from '../helpers/validaciones-helper.js';

// Devuelve todas — sin filtros, sin sorpresas
const getAllAsync = async () => {
  return await provinceRepository.getAllAsync();
};

// Lanza si no existe — el controller no tiene que chequear null
const getByIdAsync = async (id) => {
  const province = await provinceRepository.getByIdAsync(id);
  if (!province) {
    throw new Error(`Provincia con id ${id} no encontrada.`);
  }
  return province;
};

// Valida antes de tocar la DB
const createAsync = async (province) => {
  validateProvince(province);
  return await provinceRepository.createAsync(province);
};

// Valida + actualiza; el id viaja dentro del objeto
const updateAsync = async (province) => {
  validateProvince(province);
  const updated = await provinceRepository.updateAsync(province);
  if (!updated) {
    throw new Error(`Provincia con id ${province.id} no encontrada.`);
  }
  return updated;
};

// Lanza si no existe — mantiene consistencia con getById
const deleteByIdAsync = async (id) => {
  const deleted = await provinceRepository.deleteByIdAsync(id);
  if (!deleted) {
    throw new Error(`Provincia con id ${id} no encontrada.`);
  }
  return deleted;
};

export default { getAllAsync, getByIdAsync, createAsync, updateAsync, deleteByIdAsync };
