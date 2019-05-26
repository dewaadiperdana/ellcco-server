import { validationResult } from 'express-validator/check';
import { Error } from '../utils';
import AkunService from '../services/akun';

class TukangController {
  static async register(req, res) {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res.status(422).json(Error.formatFormValidationError(errors.array()));
      }

      await AkunService.register('tukang', req.body);

      return res.json('Registrasi berhasil');
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async verifikasi(req, res) {
    try {
      await AkunService.verifikasi('tukang', req.params.token);

      return res.send('Verifikasi berhasil');
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(Error.formatFormValidationError(errors.array()));
    }

    try {
      const token = await AkunService.login('tukang', req.body);

      return res.json(token);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async checkIsAuthenticated(req, res) {
    
  }
}

export default TukangController;