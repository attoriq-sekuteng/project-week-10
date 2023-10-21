const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'movies_week_10',
  password: 'password',
  port: 5432,
});
const uploadPhoto = (filename) => {
    return new Promise(async (resolve, reject) => {
      const client = await pool.connect();
  
      try {
        const query = 'INSERT INTO  movies (photo) VALUES ($1) RETURNING id';
        const values = [filename];
  
        const result = await client.query(query, values);
        client.release();
  
        resolve(result.rows[0].id);
      } catch (error) {
        client.release();
        reject(error);
      }
    });
  };
  
  module.exports = { uploadPhoto };
