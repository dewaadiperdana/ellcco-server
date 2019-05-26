import db from '../database/models';
import JasaService from './jasa';
import PelayananJasaService from './pelayananjasa';
import PemesananEmitter from '../sockets/emitters/pemesanan';

import { admin } from '../app';

const Notifikasi = db.Notifikasi;

class NotifikasiService {
  static async store(hakAkses, notifikasi, idAkun, payload = null) {
    console.log(idAkun);
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
      const listTukang = await PelayananJasaService.getTukang(pesanan.id_jasa);

      listTukang.forEach(async (tukang, index) => {
        await NotifikasiService.store(
          'tukang',
          {
            judul: 'Pesanan Baru',
            deskripsi: 'Pelanggan baru saja memesan layanan',
            tipe: 'pesanan'
          },
          tukang.id_tukang,
          pesanan
        );
      });

      const message = {
        notification: {
          title: 'Pesanan Baru',
          body: 'Pelanggan baru saja memesan layanan'
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
}

export default NotifikasiService;