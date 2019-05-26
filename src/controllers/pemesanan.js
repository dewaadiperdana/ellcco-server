import PemesananService from '../services/pemesanan';
import { validationResult } from 'express-validator/check';
import { Error } from '../utils';

class PemesananController {
  static async pesan(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(Error.formatFormValidationError(errors.array()));
    }

    try {
      const pesanan = await PemesananService.store(req.body);

      return res.json(pesanan);
    } catch (error) {
      throw error;
    }
  }

  static async terima(req, res) {

  }

  static async histori(req, res) {

  }
}

export default PemesananController;