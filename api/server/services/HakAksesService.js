import database from '../src/models';

import PenggunaService from './PenggunaService';

class HakAksesService {
  static async getKodeHakAkses(idHakAkses) {
    try {
      const hakAkses = await database.HakAkses.findByPk(idHakAkses);

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
      const kode = await HakAksesService.getKodeHakAkses(pengguna.data.id_hak_akses);
      console.log(kode);

      return Promise.resolve({ kode: kode });
    } catch (error) {
      throw error;
    }
  }
}

export default HakAksesService;