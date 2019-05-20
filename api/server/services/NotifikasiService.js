import db from '../models';
import PenggunaService from './PenggunaService';
import Order from '../sockets/emitters/Order';
import { admin } from '../../app';

export default class NotifikasiService {
  static async getNotifikasiPengguna(idPengguna) {
    try {
      const notifikasi = await db.Notifikasi.findAll({ where: { id_pengguna: idPengguna } });
      const returnNotifikasi = notifikasi.length <= 0 ? null : notifikasi.map(item => item.dataValues);

      return Promise.resolve(returnNotifikasi);
    } catch (error) {
      throw error;
    }
  }

  static async tandaiSudahDibaca(data) {
    try {
      await db.Notifikasi.update(
        {dibaca: data.dibaca},
        {
          where: { id: data.id }
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async getNotifikasiBelumDibaca(idPengguna) {
    try {
      const notifikasi = await db.Notifikasi.findAll({
        where: {
          id_pengguna: idPengguna,
          dibaca: false
        }
      });

      const returnNotifikasi = notifikasi.length <= 0 ? null : notifikasi.map(item => item.dataValues);

      return Promise.resolve(notifikasi);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async addNotifikasiPesananTukang(data, payload = null) {
    try {
      const tukang = await PenggunaService.getAllTukang();
      let notificationData = {
        judul: data.judul,
        deskripsi: data.deskripsi,
        tipe: 'pesanan',
        data: payload === null ? payload : JSON.stringify(payload)
      };

      tukang.map(async item => {
        notificationData.id_pengguna = item.id;

        NotifikasiService.addNotifikasi(notificationData, payload);
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
        tipe: data.tipe,
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