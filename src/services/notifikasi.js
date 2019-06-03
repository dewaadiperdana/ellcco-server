import db from "../database/models";
import JasaService from "./jasa";
import PelayananService from "./pelayanan";
import PemesananEmitter from "../sockets/emitters/pemesanan";

import { admin } from "../app";

const Notifikasi = db.Notifikasi;

class NotifikasiService {
  static async get(hakAkses, idAkun) {
    try {
      const id = `id_${hakAkses}`;

      const notifikasi = Notifikasi.findAll({ where: { [id]: idAkun } });

      return Promise.resolve(notifikasi);
    } catch (error) {
      throw error;
    }
  }

  static async single(id) {
    try {
      const notifikasi = Notifikasi.findOne({ where: { id: id } });

      return Promise.resolve(notifikasi);
    } catch (error) {
      throw error;
    }
  }

  static async unread(hakAkses, idAkun) {
    try {
      const id = `id_${hakAkses}`;

      const notifikasi = Notifikasi.findAll({
        where: { [id]: idAkun, dibaca: false }
      });

      return Promise.resolve(notifikasi);
    } catch (error) {
      throw error;
    }
  }

  static async store(hakAkses, notifikasi, idAkun, payload = null) {
    try {
      const dataNotifikasi = {
        ...notifikasi,
        [`id_${hakAkses}`]: idAkun,
        data: payload == null ? {} : JSON.stringify(payload)
      };

      await Notifikasi.create(dataNotifikasi);

      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }

  static async broadcastNotifikasiPesanan(pesanan) {
    try {
      const jasa = await JasaService.byId(pesanan.id_jasa);
      const listTukang = await PelayananService.getTukang(pesanan.id_jasa);

      listTukang.forEach(async (tukang, index) => {
        await NotifikasiService.store(
          "tukang",
          {
            judul: "Pesanan Baru",
            deskripsi: "Pelanggan baru saja memesan layanan",
            tipe: "pesanan"
          },
          tukang.id_tukang,
          pesanan
        );
      });

      const message = {
        notification: {
          title: "Pesanan Baru",
          body: "Pelanggan baru saja memesan layanan"
        },
        data: {
          pesanan: JSON.stringify(pesanan)
        },
        topic: jasa.channel
      };

      await admin.messaging().send(message);
      PemesananEmitter.broadcastNotifikasiPesanan(jasa.channel, pesanan);
    } catch (error) {
      throw error;
    }
  }

  static async sendOrderAcceptedNotification(pesanan) {
    const pelanggan = pesanan.pelanggan;

    try {
      await NotifikasiService.store(
        "pelanggan",
        {
          judul: "Pesanan Diterima",
          deskripsi: "Pesanan anda telah diterima",
          tipe: "regular"
        },
        pelanggan.id,
        pesanan
      );

      if (pelanggan.socket !== null) {
        PemesananEmitter.sendOrderAcceptedNotification(
          pelanggan.socket,
          pesanan
        );
      }

      if (pelanggan.token !== null) {
        const message = {
          notification: {
            title: "Pesanan Diterima",
            body: "Pesanan anda telah diterima"
          },
          data: {
            pesanan: JSON.stringify(pesanan)
          },
          token: pelanggan.token
        };

        await admin.messaging().send(message);
      }
    } catch (error) {
      throw error;
    }
  }

  static async markAsRead(id) {
    try {
      await Notifikasi.update({ dibaca: true }, { where: { id: id } });

      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }

  static async sendOrderBillNotification(pemesanan) {
    const pelanggan = pemesanan.pelanggan;

    try {
      await NotifikasiService.store(
        "pelanggan",
        {
          judul: "Biaya Perbaikan",
          deskripsi: `Berikut biaya pemesanan dengan Kode Pesanan : ${
            pemesanan.kode
          }`,
          tipe: "regular"
        },
        pelanggan.id,
        pemesanan
      );

      if (pelanggan.socket !== null) {
        PemesananEmitter.sendOrderBillNotification(pelanggan.socket, pemesanan);
      }

      if (pelanggan.token !== null) {
        const message = {
          notification: {
            title: "Biaya Perbaikan",
            body: `Berikut biaya pemesanan dengan Kode Pesanan : ${
              pemesanan.kode
            }`
          },
          data: {
            pesanan: JSON.stringify(pemesanan)
          },
          token: pelanggan.token
        };

        await admin.messaging().send(message);
      }
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      await Notifikasi.destroy({ where: { id: id } });

      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }
}

export default NotifikasiService;
