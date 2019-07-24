import JasaService from "../services/jasaService";
import { validationResult } from "express-validator/check";
import { Error } from "../utils";

class JasaController {
  static async index(req, res) {
    const limit = "limit" in req.params ? req.params.limit : null;

    try {
      const jasa = await JasaService.get(limit);
      res.json(jasa);
    } catch (error) {
      res.json(error);
    }
  }

  static async store(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(Error.formatFormValidationError(errors.array()));
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

  static async single(req, res) {
    try {
      const jasa = await JasaService.byId(req.params.id);

      return res.json(jasa);
    } catch (error) {
      throw error;
    }
  }

  static async count(req, res) {
    try {
      const response = await JasaService.count();

      return res.json(response[0]);
    } catch (error) {
      throw error;
    }
  }
}

export default JasaController;
