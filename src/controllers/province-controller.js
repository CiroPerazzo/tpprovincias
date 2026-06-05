import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import provinceService from '../services/province-service.js';

const ProvinceRouter = Router();

// Lista completa — nunca falla si la DB está arriba
ProvinceRouter.get('/', async (req, res) => {
  try {
    const provinces = await provinceService.getAllAsync();
    res.status(StatusCodes.OK).json(provinces);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

// Busca por id — el service ya lanza si no existe
ProvinceRouter.get('/:id', async (req, res) => {
  try {
    const province = await provinceService.getByIdAsync(req.params.id);
    res.status(StatusCodes.OK).json(province);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
});

// Crea y devuelve 201 con la fila completa; 400 si no pasa validación
ProvinceRouter.post('/', async (req, res) => {
  try {
    const province = await provinceService.createAsync(req.body);
    res.status(StatusCodes.CREATED).json(province);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
});

// El id va en el body, no en la URL 
ProvinceRouter.put('/', async (req, res) => {
  try {
    const province = await provinceService.updateAsync(req.body);
    res.status(StatusCodes.CREATED).json(province);
  } catch (error) {
    // El service usa el mismo tipo de error para validación y not found — distinguimos por mensaje
    const isNotFound = error.message.includes('no encontrada');
    res
      .status(isNotFound ? StatusCodes.NOT_FOUND : StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
});

// Borra y retorna la fila eliminada; 404 si el id no existía
ProvinceRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await provinceService.deleteByIdAsync(req.params.id);
    res.status(StatusCodes.OK).json(deleted);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
});

export default ProvinceRouter;
