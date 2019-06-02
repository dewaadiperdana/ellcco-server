import db from '../database/models';
import randomstring from 'randomstring';
import NotifikasiService from './notifikasi';
import RuangObrolanService from './ruangobrolan';

const Jasa = db.Jasa;
const Tukang = db.Tukang;
const Pemesanan = db.Pemesanan;
const Pelanggan = db.Pelanggan;

class PemesananService {
  static async store(pesanan) {
    const kodePesanan = PemesananService.generateKodePesanan();
    
    try {
      const data = {
        ...pesanan,
        kode: kodePesanan
      };

      const response = await Pemesanan.create(data);

      await NotifikasiService.broadcastNotifikasiPesanan(response);

      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }

  static async detail(id) {
    try {
      const pesanan = await Pemesanan.findOne({
        where: { id: id },
        include: [
          {
            model: Jasa,
            as: 'jasa'
          },
          {
            model: Pelanggan,
            as: 'pelanggan'
          },
          {
            model: Tukang,
            as: 'tukang'
          }
        ]
      });

      return Promise.resolve(pesanan);
    } catch (error) {
      throw error;
    }
  }

  static async histori(tipe, id) {
    try {
      const histori = await Pemesanan.findAll({
        where: { [`id_${tipe}`]: id }
      });

      return Promise.resolve(histori);
    } catch (error) {
      throw error;
    }
  }

  static async getHistory() {

  }

  static async terima(idPesanan, idTukang) {
    try {
      const pesanan = await Pemesanan.findOne({ 
        where: { id: idPesanan },
        include: [{
          model: Pelanggan,
          as: 'pelanggan'
        }]
      });

      if (pesanan.status !== 'menunggu_penerimaan' && pesanan.id_tukang !== null) {
        return Promise.reject({
          modal: {
            key: 'modal',
            message: 'Pesanan sudah diterima'
          }
        });
      }

      await Pemesanan.update(
        {
          id_tukang: idTukang,
          status: 'menunggu_perbaikan'
        },
        {
          where: { id: idPesanan }
        }
      );

      await NotifikasiService.sendOrderAcceptedNotification(pesanan);
      await RuangObrolanService.create(pesanan);

      return Promise.resolve(true);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static generateKodePesanan() {
    let kode = 'PS-';
    let random = randomstring.generate(10).toUpperCase();

    kode += random;
    return kode;
  }
}

export default PemesananService;