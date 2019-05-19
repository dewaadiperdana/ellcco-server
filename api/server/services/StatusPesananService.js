import db from '../models';

export default class StatusPesananService {
  static async getDefaultStatus() {
    try {
      const status = await db.StatusPesanan.findOne({ where: { kode: 1 } });

      return Promise.resolve(status === null ? status : status.dataValues);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getStatusByKode(kode) {
    try {
      const status = await db.StatusPesanan.findOne({ where: { kode: kode } });

      return Promise.resolve(status === null ? status : status.dataValues);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}