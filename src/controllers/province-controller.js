import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import provinceService from '../services/province-service.js';
import { validateId, validateProvince } from '../helpers/validaciones-helper.js';

const ProvinceRouter = Router();

ProvinceRouter.get('/', async (req, res) => {
  try {
    const provinces = await provinceService.getAll();
    res.status(StatusCodes.OK).json(provinces);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

ProvinceRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'ID inválido' });
    }
    const province = await provinceService.getById(id);
    if (!province) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Provincia no encontrada' });
    }
    res.status(StatusCodes.OK).json(province);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

ProvinceRouter.post('/', async (req, res) => {
  try {
    if (!validateProvince(req.body)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Datos inválidos' });
    }
    const province = await provinceService.create(req.body);
    res.status(StatusCodes.CREATED).json(province);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

ProvinceRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'ID inválido' });
    }
    if (!validateProvince(req.body)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Datos inválidos' });
    }
    const province = await provinceService.update(id, req.body);
    if (!province) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Provincia no encontrada' });
    }
    res.status(StatusCodes.OK).json(province);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

ProvinceRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'ID inválido' });
    }
    const province = await provinceService.remove(id);
    if (!province) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Provincia no encontrada' });
    }
    res.status(StatusCodes.OK).json({ message: 'Provincia eliminada', province });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

export default ProvinceRouter;
