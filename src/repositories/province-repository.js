import pg from 'pg';
import DBConfig from '../configs/db-config.js';
import logHelper from '../helpers/log-helper.js';

const { Client } = pg;

// Trae todas las provincias ordenadas por id
const getAllAsync = async () => {
  const client = new Client(DBConfig);
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM provinces ORDER BY id');
    return result.rows;
  } catch (error) {
    logHelper.logError(error);
    throw error;
  } finally {
    await client.end(); // siempre cierra, pase lo que pase
  }
};

// Busca por PK — devuelve null si no existe, no explota
const getByIdAsync = async (id) => {
  const client = new Client(DBConfig);
  try {
    await client.connect();
    const result = await client.query(
      'SELECT * FROM provinces WHERE id = $1',
      [id]
    );
    return result.rows[0] ?? null;
  } catch (error) {
    logHelper.logError(error);
    throw error;
  } finally {
    await client.end();
  }
};

// Inserta y devuelve la fila completa con el id generado por la DB
const createAsync = async (province) => {
  const { name, full_name, latitude, longitude, display_order } = province;
  const client = new Client(DBConfig);
  try {
    await client.connect();
    const result = await client.query(
      `INSERT INTO provinces (name, full_name, latitude, longitude, display_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, full_name, latitude ?? null, longitude ?? null, display_order ?? null]
    );
    return result.rows[0];
  } catch (error) {
    logHelper.logError(error);
    throw error;
  } finally {
    await client.end();
  }
};

// Actualiza todos los campos por id — null si el id no existe
const updateAsync = async (province) => {
  const { id, name, full_name, latitude, longitude, display_order } = province;
  const client = new Client(DBConfig);
  try {
    await client.connect();
    const result = await client.query(
      `UPDATE provinces
       SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5
       WHERE id = $6
       RETURNING *`,
      [name, full_name, latitude ?? null, longitude ?? null, display_order ?? null, id]
    );
    return result.rows[0] ?? null;
  } catch (error) {
    logHelper.logError(error);
    throw error;
  } finally {
    await client.end();
  }
};

// Borra por id y retorna la fila eliminada — null si no existía
const deleteByIdAsync = async (id) => {
  const client = new Client(DBConfig);
  try {
    await client.connect();
    const result = await client.query(
      'DELETE FROM provinces WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0] ?? null;
  } catch (error) {
    logHelper.logError(error);
    throw error;
  } finally {
    await client.end();
  }
};

export default { getAllAsync, getByIdAsync, createAsync, updateAsync, deleteByIdAsync };
