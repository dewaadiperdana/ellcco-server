import { validationResult } from "express-validator/check";
import { Error } from "../utils";
import AkunService from "../services/akunService";

class TukangController {
  static async register(req, res) {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res
          .status(422)
          .json(Error.formatFormValidationError(errors.array()));
      }

      await AkunService.register("tukang", req.body);

      return res.json("Registrasi berhasil");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async verifikasi(req, res) {
    try {
      await AkunService.verifikasi("tukang", req.params.token);

      return res.send("Verifikasi berhasil");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json(Error.formatFormValidationError(errors.array()));
    }

    try {
      const token = await AkunService.login("tukang", req.body);

      return res.json(token);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async editProfile(req, res) {
    try {
      const response = await AkunService.editProfile(
        "tukang",
        req.params.id,
        req.body
      );

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async checkIsAuthenticated(req, res) {
    const header = await req.get("Authorization");
    const token = header.split(" ")[1];

    const check = await AkunService.checkIsAuthenticated(token);

    return res.status(200).json(check);
  }

    static async accountList(req, res) {
    try {
      const accounts = await AkunService.accountList('tukang');

      return res.json(accounts);
    } catch (error) {
      throw error;
    }
  }

  static async accountStatus(req, res) {
    try {
      const response = await AkunService.activateOrDeactivateAccount(req.body.type, 'tukang', req.body.id);

      return res.json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async counts(req, res) {
    try {
      const response = await AkunService.counts('tukang');

      res.json(response[0]);
    } catch (error) {
      throw error;
    }
  }
}

export default TukangController;
