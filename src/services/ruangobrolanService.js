import db from "../database/models";
import randomstring from "randomstring";
import ChannelService from "./channelService";
import AkunService from "./akunService";
import { admin } from "../app";

const Pemesanan = db.Pemesanan;
const RuangObrolan = db.RuangObrolan;
const PesanObrolan = db.PesanObrolan;

class RuangObrolanService {
  static async create(pesanan) {
    const code = RuangObrolanService.generateCode();

    try {
      const ruangObrolan = {
        id_pemesanan: pesanan.id,
        kode: code
      };

      await RuangObrolan.create(ruangObrolan);

      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }

  static async get(pemesanan) {
    try {
      const response = await RuangObrolan.findOne({
        where: { id_pemesanan: pemesanan }
      });

      return Promise.resolve(response);
    } catch (error) {
      throw error;
    }
  }

  static async getPesanObrolan(hakAkses, idRuangObrolan, idAkun) {
    try {
      const response = await PesanObrolan.findAll({
        where: { id_ruang_obrolan: idRuangObrolan },
        order: [["tanggal", "ASC"]]
      });

      const marked = RuangObrolanService.markOwnChat(
        hakAkses,
        response,
        idAkun
      );

      return Promise.resolve(marked);
    } catch (error) {
      throw error;
    }
  }

  static markOwnChat(role, chats, idAkun) {
    let marked = chats.map((item, index) => {
      if (item[`id_${role}`] === idAkun) {
        return { ...item.dataValues, owned: true };
      } else {
        return { ...item.dataValues, owned: false };
      }
    });

    return marked;
  }

  static async subscribeToRuangObrolanFCM(role, data) {
    try {
      const akun = await AkunService.getAccount(role, data.idAkun, [
        {
          model: Pemesanan,
          as: "pemesanan"
        }
      ]);

      akun.pemesanan.forEach(async pemesanan => {
        const ruangObrolan = await RuangObrolan.findOne({
          where: { id_pemesanan: pemesanan.id }
        });

        if (ruangObrolan !== null) {
          await admin
            .messaging()
            .subscribeToTopic(akun.token, ruangObrolan.kode);

           console.log('[SUBSCRIBE RUANG OBROLAN CHANNEL FCM]');
        }
      });
    } catch (error) {
      throw error;
    }
  }

  static async subscribeToRuangObrolanSocket(socket, role, data) {
    try {
      const akun = await AkunService.getAccount(role, data.idAkun, [
        {
          model: Pemesanan,
          as: "pemesanan"
        }
      ]);

      akun.pemesanan.forEach(async pemesanan => {
        const ruangObrolan = await RuangObrolan.findOne({
          where: { id_pemesanan: pemesanan.id }
        });

        if (ruangObrolan !== null) {
          socket.join(ruangObrolan.kode, () => {
            console.log("user joined ruang obrolan rooms");
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  static generateCode() {
    let code = randomstring.generate(6);

    return code;
  }
}

export default RuangObrolanService;
