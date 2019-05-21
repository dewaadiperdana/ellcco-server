import { admin } from '../../app';
import { validationResult } from 'express-validator/check';
import Response from '../utils/Response';
import PenggunaService from '../services/PenggunaService';
import PesananService from '../services/PesananService';
import NotifikasiService from '../services/NotifikasiService';
import ValidationError from '../utils/ValidationError';

class PesananController {
  static async pesan(req, res) {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        const errorsArray = ValidationError.format(errors.array());

        return Response.error(res, 422, 'Validasi gagal', errorsArray);
      }

      const pesanan = await PesananService.addPesanan(req.body);
      const detail = await PesananService.detailPesanan(pesanan.dataValues.id, pesanan.dataValues.id_pelanggan);

      await NotifikasiService.addNotifikasiPesananTukang({
        judul: 'Pesanan Baru',
        deskripsi: 'Pelanggan baru saja memesan layanan',
      }, detail);

      const message = {
        notification: {
          title: 'Pesanan Baru',
          body: 'Pelanggan baru saja memesan layanan'
        },
        data: {
          pesanan: JSON.stringify(pesanan.dataValues)
        },
        topic: 'pesanan'
      };
  
      await admin.messaging().send(message);
  
      return Response.success(res, 200, 'Pesan Berhasil', true);
    } catch (error) {
      console.log(error);
      return Response.error(res, 500, 'Terjadi kesalahan', error);
    }
  }

  static async terima(req, res) {
    try {
      const pesanan = await PesananService.terimaPesanan(req.body.id_pesanan, req.body.id_pengguna);

      return Response.success(res, 200, 'Berhasil', pesanan);
    } catch (error) {
      return Response.error(res, 500, 'Gagal', error);
    }
  }

  static async histori(req, res) {
    try {
      const histori = await PesananService.getHistoriPengguna(req.params.pengguna, req.params.id_pengguna);

      return Response.success(res, 200, 'Data Histori', histori); 
    } catch (error) {
      throw error;
    }
  }

  static async detail(req, res) {
    try {
      const detail = await PesananService.detailPesanan(
        req.params.id_pesanan,
        req.params.id_pelanggan,
        ('id_tukang' in req.params ||req.params.id_tukang !== undefined ) ? req.params.id_tukang : null
      );

      return Response.success(res, 200, 'Detail Pesanan', detail);
    } catch (error) {
      throw error;
    }
  }

  static async getByKode(req, res) {
    try {
      const pesanan = await PesananService.getByKode(req.params.kode_pesanan);

      return Response.success(res, 200, 'Berhasil', pesanan);
    } catch (error) {
      throw error;
    }
  }
}

export default PesananController;