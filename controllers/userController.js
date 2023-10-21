const User = require('../models/user');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.getAll();
      res.status(200).json(users.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getUserById(req, res) {
    try {
      const id = req.params.id;
      const userResult = await User.getById(id);

      if (userResult.rowCount === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(userResult.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async createUser(req, res) {
    try {
      const { email, gender, password, role } = req.body;
      const result = await User.create(email, gender, password, role);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.params.id;
      const { email, gender, password, role } = req.body;
      const userResult = await User.update(email, gender, password, role);

      if (userResult.rowCount === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(userResult.rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const result = await User.delete(id);

      if (result.rowCount === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(204).end();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
