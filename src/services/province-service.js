import provinceRepository from '../repositories/province-repository.js';

const getAll = async () => {
  return await provinceRepository.getAll();
};

const getById = async (id) => {
  return await provinceRepository.getById(id);
};

const create = async (province) => {
  return await provinceRepository.create(province);
};

const update = async (id, province) => {
  return await provinceRepository.update(id, province);
};

const remove = async (id) => {
  return await provinceRepository.remove(id);
};

export default { getAll, getById, create, update, remove };
