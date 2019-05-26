import JasaService from '../services/jasa';
import { validationResult } from 'express-validator/check';
import { Error } from '../utils';

class JasaController {
  static async index(req, res) {
    const limit = 'limit' in req.params ? req.params.limit : null;

    try {
      const jasa = await JasaService.get(limit);
      res.json(jasa);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  static async store(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(Error.formatFormValidationError(errors.array()));
    }

    try {
      await JasaService.store(req.body);

      return res.status(200).json(true);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async update(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(Error.formatFormValidationError(errors.array()));
    }

    try {
      await JasaService.update(req.params.id, req.body);

      return res.status(200).json(true);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async delete(req, res) {
    try {
      await JasaService.delete(req.params.id);

      return res.status(200).json(true);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default JasaController;