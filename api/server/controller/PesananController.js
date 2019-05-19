import { admin } from '../../app';
import { validationResult } from 'express-validator/check';
import Response from '../utils/Response';
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

      // Insert pesanan
      const pesanan = await PesananService.addPesanan(req.body);
      // Insert notification
      await NotifikasiService.addNotifikasiPesanan(pesanan.dataValues);
      // Send push notification
      // Broadcast new order notification

      const message = {
        notification: {
          title: 'Pesanan Baru',
          body: 'Pelanggan baru saja memesan layanan'
        },
        data: {
          pesanan: JSON.stringify(pesanan)
        },
        topic: 'pesanan'
      };
  
      await admin.messaging().send(message);
  
      res.send('Pesan layanan');
    } catch (error) {
      console.log(error);
      return Response.error(res, 500, 'Terjadi kesalahan', error);
    }
  }

  static async terima(req, res) {
    try {
      await PesananService.terimaPesanan(req.body.id_pesanan, req.body.id_pengguna);

      // Kirim notifikasi ke pemilik pesanan

      return Response.success(res, 200, 'Berhasil', { success: true });
    } catch (error) {
      console.log(error);
      return Response.error(res, 500, 'Gagal', error);
    }
  }

  static async histori(req, res) {
    try {
      const histori = await PesananService.getHistoriPengguna(req.params.pengguna, req.params.id_pengguna);
      console.log(histori);

      return Response.success(res, 200, 'Data Histori', histori);
    } catch (error) {
      // 
    }
  }
}

export default PesananController;