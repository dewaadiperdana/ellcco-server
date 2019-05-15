import { admin } from '../../app';
import { validationResult } from 'express-validator/check';
import Response from '../utils/Response';
import PesananService from '../services/PesananService';
import NotifikasiService from '../services/NotifikasiService';

class PesananController {
  static async pesan(req, res) {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return Response.error(res, 422, 'Validasi gagal', errors.array());
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
      return Response.error(res, 500, 'Terjadi kesalahan', error);
    }
  }

   static async terima(req, res) {
    
   }
}

export default PesananController;