import db from '../database/models';
import { admin } from '../app';

const Tukang = db.Tukang;
const Jasa = db.Jasa;

class TukangService {
  static async subscribeToFCMTopicAndChannel(akun) {
    const listJasa = await Jasa.findAll({
      include: [{
        model: Tukang,
        as: 'tukang'
      }]
    });

    listJasa.forEach(jasa => {
      const listTokenTukang = jasa.tukang.filter(item => item.token ? item.token : null);
      const tokenFiltered = listTokenTukang.map(item => item.token);

      if (tokenFiltered.length >= 1) {
        admin.messaging().subscribeToTopic(tokenFiltered, jasa.channel);
      }
    });
  }
}

export default TukangService;