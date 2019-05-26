import db from '../../../src/database/models';
import randomstring from 'randomstring';

class RuangObrolanService {
  static async buatRuangObrolan(data) {
    try {
      const kodeRuang = RuangObrolanService.buatKodeRuangObrolan();
      const ruang = {
        ...data,
        kode_ruang: kodeRuang,
        dibuka: true
      };

      await db.RuangObrolan.create(ruang);
    } catch (error) {
      throw error;
    }
  }

  static async getRuangObrolanByIdPengguna(type, id) {
    try {
      const ruang = await db.RuangObrolan.findOne({  where: { [`id_${type}`]: id } });

      return Promise.resolve(ruang.dataValues);
    } catch (error) {
      throw error;
    }
  }

  static buatKodeRuangObrolan() {
    let kode = randomstring.generate(6);

    return kode;
  }
}

export default RuangObrolanService;