import pool from '../configs/db-config.js';

const getAll = async () => {
  const result = await pool.query('SELECT * FROM provinces ORDER BY id');
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query('SELECT * FROM provinces WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (province) => {
  const { name, capital, population } = province;
  const result = await pool.query(
    'INSERT INTO provinces (name, capital, population) VALUES ($1, $2, $3) RETURNING *',
    [name, capital, population]
  );
  return result.rows[0];
};

const update = async (id, province) => {
  const { name, capital, population } = province;
  const result = await pool.query(
    'UPDATE provinces SET name = $1, capital = $2, population = $3 WHERE id = $4 RETURNING *',
    [name, capital, population, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query('DELETE FROM provinces WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

export default { getAll, getById, create, update, remove };
