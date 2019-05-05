import db from '../src/models';
import HakAksesService from './HakAksesService';
import { admin } from '../../app';

class TokenPerangkatService {
  static async simpanToken(idPengguna, token) {
    try {
      const tokenPerangkat = await db.TokenPerangkat.findOne({ where: { id_pengguna: idPengguna } });

      if (tokenPerangkat === null) {
        await db.TokenPerangkat.create({
          id_pengguna: idPengguna,
          token: token
        });
      } else {
        if (tokenPerangkat.token !== token) {
          await db.TokenPerangkat.update({
            token: token
          }, { where: { id_pengguna: idPengguna } });
        }
      }

      const hakAkses = await HakAksesService.getKodeByIdPengguna(idPengguna);
      if (hakAkses.kode === 1) {
        console.log('subscribed');
        await admin.messaging().subscribeToTopic(token, 'pesanan');
      }

      return Promise.resolve({ message: 'Token telah tersimpan' });
    } catch (error) {
      throw error;
    }
  }
}

export default TokenPerangkatService;