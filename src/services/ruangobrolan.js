import db from "../database/models";
import randomstring from 'randomstring';
import ChannelService from './channel';
import AkunService from './akun';
import { admin } from '../app';

const RuangObrolan = db.RuangObrolan;
const Pemesanan = db.Pemesanan;

class RuangObrolanService {
  static async create(pesanan) {
    const code = RuangObrolanService.generateCode();

    try {
      const ruangObrolan = {
        id_pemesanan: pesanan.id,
        kode: code,
        dibuka: true
      };

      await RuangObrolan.create(ruangObrolan);

      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }

  static async subscribeToRuangObrolanFCM(role, data) {
    try {
      const akun = await AkunService.getAccount(
        role,
        data.idAkun,
        [{
          model: Pemesanan,
          as: 'pemesanan'
        }]
      );

      akun.pemesanan.forEach(async pemesanan => {
        const ruangObrolan = await RuangObrolan.findOne({
          where: { id_pemesanan: pemesanan.id }
        });

        if (ruangObrolan !== null) {
          await admin.messaging().subscribeToTopic(akun.token, ruangObrolan.kode);
        }
      });
    } catch (error) {
      throw error;
    }
  }

  static async subscribeToRuangObrolanSocket(role, data, socket) {

  }

  static generateCode() {
    let code = randomstring.generate(6);

    return code;
  }
}

export default RuangObrolanService;