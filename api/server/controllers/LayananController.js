import LayananService from '../services/LayananService';
import Response from '../utils/Response';
import { validationResult } from 'express-validator/check';

class LayananController {
  static async getAllLayanan(req, res) {
    const limit = 'limit' in req.params ? req.params.limit : null;

    try {
      const layanan = await LayananService.getAllLayanan(limit);

      if (layanan.length > 0) {
        return Response.success(res, 200, 'Layanan ditemukan', layanan);
      } else {
        return Response.success(res, 200, 'Layanan tidak ditemukan');
      }
    } catch (error) {
      return Response.error(res, 500, 'Maaf sedang terjadi kesalahan');
    }
  }

  static async addLayanan(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return Response.error(res, 422, 'Validasi gagal', errors.array());
    } else {
      try {
        const layanan = await LayananService.addLayanan({
          nama: req.body.nama
        });

        return Response.success(res, 200, 'Layanan berhasil ditambahkan', layanan.dataValues);
      } catch (error) {
        return Response.error(res, 500, 'Gagal menambahkan layanan');
      }
    }
  }

  static async updateLayanan(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return Response.error(res, 422, 'Validasi gagal', errors.array());
    } else {
      try {
        const layanan = await LayananService.updateLayanan(req.body.id, {
          nama: req.body.nama
        });

        return Response.success(res, 200, 'Layanan berhasil di update', layanan.dataValues);
      } catch (error) {
        return Response.error(res, 500, 'Gagal mengupdate layanan', error.message);
      }
    }
  }

  static async deleteLayanan(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return Response.error(res, 422, 'Validasi gagal', errors.array());
    } else {
      try {
        await LayananService.deleteLayanan(req.body.id);

        return Response.success(res, 200, 'Layanan berhasil di hapus');
      } catch (error) {
        return Response.error(res, 500, 'Gagal menghapus layanan', error.message);
      }
    }
  }
}

export default LayananController;