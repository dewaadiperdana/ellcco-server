import db from '../database/models';
import randomstring from 'randomstring';
import NotifikasiService from './notifikasi';

const Pemesanan = db.Pemesanan;

class PemesananService {
  static async store(pesanan) {
    const kodePesanan = PemesananService.generateKodePesanan();
    
    try {
      const data = {
        ...pesanan,
        kode: kodePesanan
      };

      const response = await Pemesanan.create(data);

      await NotifikasiService.broadcastNotifikasiPesanan(data);

      return Promise.resolve(true);
    } catch (error) {
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