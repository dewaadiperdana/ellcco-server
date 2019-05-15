import randomstring from 'randomstring';
import db from '../models';

import StatusPesananService from './StatusPesananService';

export default class PesananService {
  static async addPesanan(dataPesanan) {
    try {
      const defaultStatus = await StatusPesananService.getDefaultStatus();
      const kodePesanan = PesananService.generateKodePesanan();
      const data = {
        id_status: defaultStatus.id,
        kode_pesanan: kodePesanan,
        ...dataPesanan
      };

      const pesanan = await db.Pesanan.create(data);
      
      return Promise.resolve(pesanan);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static generateKodePesanan() {
    let kode = 'PS-';
    let random = randomstring.generate(12);
    kode = kode + random.toUpperCase();

    return kode;
  }
}