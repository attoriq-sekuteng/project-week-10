const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'movies_week_10',
  password: 'password',
  port: 5432,
});

class Movie {
  static getAll() {
    return pool.query('SELECT * FROM movies');
  }

  static getById(id) {
    return pool.query('SELECT * FROM movies WHERE id = $1', [id]);
  }

  static create(title, genres, year) {
    return pool.query('INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3) RETURNING *', [title, genres, year]);
  }

  static update(id, title, genres, year) {
    return pool.query('UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4 RETURNING *', [title, genres, year, id]);
  }

  static delete(id) {
    return pool.query('DELETE FROM movies WHERE id = $1', [id]);
  }
}

module.exports = Movie;
