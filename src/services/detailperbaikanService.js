import db from "../database/models";

const Pemesanan = db.Pemesanan;
const DetailPerbaikan = db.DetailPerbaikan;

class DetailPerbaikanService {
  static async store(data) {
    try {
      const response = await DetailPerbaikan.create(data);

      return Promise.resolve(response);
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const response = await DetailPerbaikan.destroy({ where: { id: id } });

      return Promise.resolve(response);
    } catch (error) {
      throw error;
    }
  }

  static async list(idPemesanan) {
    try {
      const response = await DetailPerbaikan.findAll({
        where: { id_pemesanan: idPemesanan }
      });

      return Promise.resolve(response);
    } catch (error) {
      throw error;
    }
  }
}

export default DetailPerbaikanService;
