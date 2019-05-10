import db from '../src/models';
import PenggunaService from '../services/PenggunaService';
import Order from '../sockets/emitters/Order';

export default class NotifikasiService {
  static async addNotifikasiPesanan(data = null) {
    try {
      const tukang = await PenggunaService.getAllTukang();
      let notificationData = {
        judul: 'Pesanan baru',
        deskripsi: 'Pelanggan baru saja meminta pesanan layanan',
        data: data === null ? data : JSON.stringify(data)
      };

      tukang.map(async item => {
        notificationData.id_pengguna = item.id;
        await db.Notifikasi.create(notificationData);
      });

      NotifikasiService.broadcastNotifikasiPesanan(notificationData);
      
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async broadcastNotifikasiPesanan(message) {
    Order.broadcastNewOrder(message);
  }
}