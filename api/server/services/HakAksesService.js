import db from '../database/models';

import PenggunaService from './PenggunaService';

class HakAksesService {
  static async getKodeHakAkses(idHakAkses) {
    try {
      const hakAkses = await db.HakAkses.findByPk(idHakAkses);

      if (hakAkses === null) {
        return Promise.reject({ message: 'Hak akses tidak ditemukan' });
      }

      return Promise.resolve(hakAkses.kode);
    } catch (error) {
      throw error;
    }
  }

  static async getKodeByIdPengguna(idPengguna) {
    try {
      const pengguna = await PenggunaService.getPengguna(idPengguna);
      const kode = await HakAksesService.getKodeHakAkses(pengguna.id_hak_akses);

      return Promise.resolve({ kode: kode });
    } catch (error) {
      throw error;
    }
  }

  static async getIdHakAksesByKode(kode) {
    try {
      const hakAkses = await db.HakAkses.findOne({ where: { kode: kode } });

      return Promise.resolve(hakAkses === null ? hakAkses : hakAkses.dataValues);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default HakAksesService;