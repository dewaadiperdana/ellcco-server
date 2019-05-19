import db from '../models';
import PenggunaService from './PenggunaService';
import Order from '../sockets/emitters/Order';
import { admin } from '../../app';

export default class NotifikasiService {
  static async addNotifikasiPesananTukang(data, payload = null) {
    try {
      const tukang = await PenggunaService.getAllTukang();
      let notificationData = {
        judul: data.judul,
        deskripsi: data.deskripsi,
        data: payload === null ? payload : JSON.stringify(payload)
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

  static async addNotifikasi(data, payload) {
    try {
      let notificationData = {
        id_pengguna: data.id_pengguna,
        judul: data.judul,
        deskripsi: data.deskripsi,
        data: data === null ? data : JSON.stringify(data)
      };

      await db.Notifikasi.create(notificationData);
    } catch (error) {
      throw error;
    }
  }

  static async notifikasiPenerimaanPesanan(idPelanggan, payload) {
    try {
      const pelanggan = await db.Pengguna.findOne({
        where: { id: idPelanggan },
        include: [db.Perangkat]
      });

      NotifikasiService.sendNotifikasiPenerimaanPesanan(pelanggan.Perangkat.dataValues, payload);
    } catch (error) {

    }
  }

  static async broadcastNotifikasiPesanan(message) {
    Order.broadcastNewOrder(message);
  }

  static async sendNotifikasiPenerimaanPesanan(perangkat, payload) {
    try {
      Order.sendNotifikasiPenerimaanPesanan(perangkat, payload);

      let message = {
        notification: {
          title: 'Pesanan Diterima',
          body: 'Pesanan anda telah diterima'
        },
        data: {
          pesanan: JSON.stringify(payload)
        },
        token: perangkat.token
      };

      await admin.messaging().send(message);
    } catch (error) {
      throw error;
    }
  }
}