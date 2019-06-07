import { validationResult } from "express-validator/check";
import { Error } from "../utils";
import DetailPerbaikanService from "../services/detailperbaikan";

class DetailPerbaikanController {
  static async store(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json(Error.formatFormValidationError(errors.array()));
    }

    try {
      const detail = await DetailPerbaikanService.store(req.body);

      return res.json(detail);
    } catch (error) {
      throw error;
    }
  }

  static async delete(req, res) {
    try {
      const response = await DetailPerbaikanService.delete(req.params.id);

      return res.json(response);
    } catch (error) {
      throw error;
    }
  }

  static async list(req, res) {
    try {
      const response = await DetailPerbaikanService.list(
        req.params.id_pemesanan
      );

      return res.json(response);
    } catch (error) {
      throw error;
    }
  }
}

export default DetailPerbaikanController;
