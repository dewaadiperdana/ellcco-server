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
    } catch(error) {
      throw error;
    }
  }
}

export default LayananService;