import { validationResult } from "express-validator/check";
import { Error } from "../utils";
import AkunService from "../services/akun";

class PelangganController {
  static async register(req, res) {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res
          .status(422)
          .json(Error.formatFormValidationError(errors.array()));
      }

      await AkunService.register("pelanggan", req.body);

      return res.json("Registrasi berhasil");
    } catch (error) {
      throw error;
    }
  }

  static async verifikasi(req, res) {
    try {
      await AkunService.verifikasi("pelanggan", req.params.token);

      return res.send("Verifikasi berhasil");
    } catch (error) {
      return res.json(error);
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
      const token = await AkunService.login("pelanggan", req.body);

      return res.json(token);
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

  static async editProfile(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json(Error.formatFormValidationError(errors.array()));
    }

    try {
      const response = await AkunService.editProfile(
        "pelanggan",
        req.params.id,
        req.body
      );

      return res.json(response);
    } catch (error) {
      throw error;
    }
  }

  static async accountList(req, res) {
    try {
      const accounts = await AkunService.accountList('pelanggan');

      return res.json(accounts);
    } catch (error) {
      throw error;
    }
  }

  static async accountStatus(req, res) {
    try {
      const response = await AkunService.activateOrDeactivateAccount(req.body.type, 'pelanggan', req.body.id);

      return res.json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async counts(req, res) {
    try {
      const response = await AkunService.counts('pelanggan');

      res.json(response[0]);
    } catch (error) {
      throw error;
    }
  }
}

export default PelangganController;