import db from '../database/models';

const Pelanggan = db.Pelanggan;
const Tukang = db.Tukang;

class ChannelService {
  static async joinTukangAndPelanggan(idTukang, idPelanggan, ruangObrolan) {
    try {
      const tukang = await Tukang.findOne({ where: { id: idTukang } });
      const pelanggan = await Pelanggan.findOne({ where: { idPelanggan } });
    } catch (error) {

    }
  }
}

export default ChannelService;