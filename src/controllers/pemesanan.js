import PemesananService from "../services/pemesanan";
import { validationResult } from "express-validator/check";
import { Error } from "../utils";
import db from "../database/models";

class PemesananController {
  static async pesan(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json(Error.formatFormValidationError(errors.array()));
    }

    try {
      const pesanan = await PemesananService.store(req.body);

      return res.json(pesanan);
    } catch (error) {
      throw error;
    }
  }

  static async detail(req, res) {
    try {
      const response = await PemesananService.detail(req.params.id);

      return res.json(response);
    } catch (error) {
      throw error;
    }
  }

  static async terima(req, res) {
    try {
      await PemesananService.terima(req.body.id_pesanan, req.body.id_tukang);

      return res.json(true);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  static async histori(req, res) {
    try {
      const response = await PemesananService.histori(
        req.params.tipe,
        req.params.id
      );

      return res.json(response);
    } catch (error) {
      throw error;
    }
  }

  static async status(req, res) {
    const response = await db.sequelize.query(
      "SELECT * FROM enum_range('menunggu_penerimaan'::enum_pemesanan_status, NULL) AS status;",
      {
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    return res.json(response[0]);
  }

  static async addBiaya(req, res) {
    try {
      const pemesanan = await PemesananService.addBiaya(
        req.body.id_pemesanan,
        req.body.biaya
      );

      return res.json(pemesanan);
    } catch (error) {
      throw error;
    }
  }

  static async getDetail(req, res) {
    try {
      const detail = await PemesananService.detailPerbaikan(req.params.id);

      return res.json(detail);
    } catch (error) {
      throw error;
    }
  }
}

export default PemesananController;
