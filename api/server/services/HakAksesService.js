import database from '../src/models';

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
}

export default HakAksesService;