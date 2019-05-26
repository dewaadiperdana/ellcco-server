import db from '../database/models';
import HakAksesService from './HakAksesService';
import { admin, socket } from '../app';

class PerangkatService {
  static async simpanToken(data) {
    try {
      const tokenPerangkat = await db.Perangkat.findOne({ where: { id_pengguna: data.id_pengguna } });

      if (tokenPerangkat === null || tokenPerangkat.length <= 0) {
        await db.Perangkat.create(data);
      } else {
        const key = 'token' in data ? 'token' : 'socket';
        
        if (tokenPerangkat.dataValues[key] !== data[key]) {
          await db.Perangkat.update({
            [key]: data[key]
          }, { where: { id_pengguna: data.id_pengguna } });
        }
      }

      await PerangkatService.subscribeTukang();

      return Promise.resolve({ message: 'Token telah tersimpan' });
    } catch (error) {
      throw error;
    }
  }

  static async subscribeTukang() {
    try {
      const kodeTukang =  await HakAksesService.getIdHakAksesByKode(1);
      const tukang = await db.Pengguna.findAll({
        where: { id_hak_akses: kodeTukang.id },
        include: [db.Perangkat]
      });

      const tokenTukang = tukang.map(item => {
        const token = item.dataValues.Perangkat;

        if (token !== null) {
          return token.dataValues.token;
        }
      });

      const listToken = tokenTukang.filter(item => {
        if(item !== null) {
          return item;
        }
      });

      if (listToken.length <= 0 || listToken == null) {
        return;
      }

      await admin.messaging().subscribeToTopic(listToken, 'pesanan');

      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }

  static async getTokenByIdPengguna(idPengguna) {
    try {
      const token = await db.Perangkat.findOne({ where: { id_pengguna: idPengguna } });

      return Promise.resolve(token === null ? token : token.dataValues);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default PerangkatService;