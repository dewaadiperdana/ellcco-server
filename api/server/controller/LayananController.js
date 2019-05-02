import LayananService from '../services/LayananService';
import Response from '../utils/Response';
import { validationResult } from 'express-validator/check';

class LayananController {
  static async getAllLayanan(req, res) {
    try {
      const layanan = await LayananService.getAllLayanan();

      if (layanan.length > 0) {
        Response.setSuccess(200, 'Layanan ditemukan', layanan);
      } else {
        Response.setSuccess(200, 'Layanan tidak ditemukan');
      }

      return Response.send(res);
    } catch (error) {
      Response.setError(400, error);
      return Response.send(res);
    }
  }

  static async addLayanan(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      Response.setError(422, 'Validasi gagal', errors.array());
    } else {
      try {
        const layanan = await LayananService.addLayanan({
          nama: req.body.nama
        });

        Response.setSuccess(200, 'Layanan berhasil ditambahkan', layanan.dataValues);
      } catch (error) {
        Response.setError(500, 'Gagal menambahkan layanan');
        throw error;
      }
    }

    return Response.send(res);
  }

  static async updateLayanan(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      Response.setError(422, 'Validasi gagal', errors.array());
    } else {
      try {
        const layanan = await LayananService.updateLayanan(req.body.id, {
          nama: req.body.nama
        });

        Response.setSuccess(200, 'Layanan berhasil di update', layanan.dataValues);
      } catch (error) {
        Response.setError(500, 'Gagal mengupdate layanan', error.message);
        throw error;
      }
    }

    return Response.send(res);
  }

  static async deleteLayanan(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      Response.setError(422, 'Validasi gagal', errors.array());
    } else {
      try {
        await LayananService.deleteLayanan(req.body.id);

        Response.setSuccess(200, 'Layanan berhasil di hapus');
      } catch (error) {
        Response.setError(500, 'Gagal menghapus layanan', error.message);
        throw error;
      }
    }

    return Response.send(res);
  }
}

export default LayananController;