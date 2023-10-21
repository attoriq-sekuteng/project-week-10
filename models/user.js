const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'movies_week_10',
  password: 'password',
  port: 5432,
});

class User {
  static getAll() {
    return pool.query('SELECT * FROM users');
  }

  static getById(id) {
    return pool.query('SELECT * FROM users WHERE id = $1', [id]);
  }

  static create(email, gender, password, role) {
    return pool.query('INSERT INTO users (email, gender, password, role) VALUES ($1, $2, $3, $4) RETURNING *', [email, gender, password, role]);
  }

  static update(id, email, gender, password, role) {
    return pool.query('UPDATE users SET email= $1, gender = $2, password = $3, role = $4 WHERE id = $5 RETURNING *', [email, gender, password, role, id]);
  }

  static delete(id) {
    return pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
}

module.exports = User;
