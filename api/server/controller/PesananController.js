import { admin } from '../../app';
import NewOrder from '../sockets/emitters/NewOrder';
import PenggunaService from '../services/PenggunaService';

class PesananController {
  static async pesan(req, res) {
    const message = {
      notification: {
        title: 'Pesanan Baru',
        body: 'Pesanan baru bro'
      },
      data: {
        id_pelanggan: "alsdkalskd"
      },
      topic: 'pesanan'
    };

    await admin.messaging().send(message);
    NewOrder.emit(message.data);

    res.send('Pesan layanan');
  }

   static async terima(req, res) {
    
   }
}

export default PesananController;