import { socket, admin } from '../../app';
import { ON_NEW_ORDER } from '../sockets/events';
import { pesanan } from '../sockets/topics';

class PesananController {
  static async pesan(req, res) {
    const message = {
      data: {
        id_pelanggan: req.body.id_pelanggan
      },
      topic: 'pesanan'
    };

    const messagePesanan = await admin.messaging().send(message);

    console.log(messagePesanan);

    res.send('Pesan layanan');
  }

   static async terima(req, res) {
    
   }
}

export default PesananController;