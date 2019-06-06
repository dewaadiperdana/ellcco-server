import db from "../database/models";

const PesanObrolan = db.PesanObrolan;
const Pelanggan = db.Pelanggan;
const Tukang = db.Tukang;

class PesanObrolanService {
  static async store(data) {
    try {
      const response = await PesanObrolan.create(data);

      return Promise.resolve(response);
    } catch (error) {
      throw error;
    }
  }
}

export default PesanObrolanService;
