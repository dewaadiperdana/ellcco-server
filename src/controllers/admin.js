import { validationResult } from 'express-validator/check';
import { Error } from '../utils';
import AdminService from '../services/admin';

class AdminController {
  static async login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(Error.formatFormValidationError(errors.array()));
    }

    try {
      const response = await AdminService.login(req.body);

      return res.json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async isAuthenticated(req, res) {
    const authorizaton = req.universalCookies.get('token');

    if (!authorizaton) {
      return res.status(400).json({
        error: {
          key: 'error',
          message: 'Token tidak ditemukan'
        }
      });
    }

    try {
      const response = await AdminService.isAuthenticated(authorizaton);

      return res.json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async getAuthData(req, res) {
    const token = req.universalCookies.get('token');

    try {
      const auth = await AdminService.getAuthData(token);

      return res.json(auth);
    } catch (error) {
      throw error;
    }
  }
}

export default AdminController;