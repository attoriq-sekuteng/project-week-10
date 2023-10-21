const Movie = require('../models/movie');

class MovieController {
  static async getAllMovies(req, res) {
    try {
      const movies = await Movie.getAll();
      res.status(200).json(movies.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getMovieById(req, res) {
    try {
      const id = req.params.id;
      const movieResult = await Movie.getById(id);

      if (movieResult.rowCount === 0) {
        res.status(404).json({ message: 'Movie not found' });
      } else {
        res.status(200).json(movieResult.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async createMovie(req, res) {
    try {
      const { title, genres, year } = req.body;
      const result = await Movie.create(title, genres, year);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async updateMovie(req, res) {
    try {
      const id = req.params.id;
      const { title, genres, year } = req.body;
      const movieResult = await Movie.update(id, title, genres, year);

      if (movieResult.rowCount === 0) {
        res.status(404).json({ message: 'Movie not found' });
      } else {
        res.status(200).json(movieResult.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async deleteMovie(req, res) {
    try {
      const id = req.params.id;
      const result = await Movie.delete(id);

      if (result.rowCount === 0) {
        res.status(404).json({ message: 'Movie not found' });
      } else {
        res.status(204).end();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = MovieController;
