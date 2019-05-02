import database from '../src/models';

class LayananService {
  static async getAllLayanan() {
    try {
      return await database.Layanan.findAll();
    } catch(error) {
      throw error;                
    }
  }

  static async addLayanan(layanan) {
    try {
      return await database.Layanan.create(layanan);
    } catch (error) {
      throw error;
    }
  }

  static async updateLayanan(idLayanan, dataLayanan) {
    try {
      return await database.Layanan.update(dataLayanan, { where: { id: idLayanan } });
    } catch (error) {
      Promise.reject({ message: 'Gagal mengupdate layanan' });
      throw error;
    }
  }

  static async deleteLayanan(idLayanan) {
    try {
      return await database.Layanan.destroy({ where: { id: idLayanan } });
    } catch (error) {
      Promise.reject({ message: 'Gagal menghapus layanan' });
      throw error;
    }
  }
}

export default LayananService;