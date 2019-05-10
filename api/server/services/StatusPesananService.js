import db from '../src/models';

export default class StatusPesananService {
  static async getDefaultStatus() {
    try {
      const status = await db.StatusPesanan.findOne({ where: { nama: 'Menunggu Penerimaan' } });

      return Promise.resolve(status === null ? status : status.dataValues);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}