import db from '../database/models';

const Tukang = db.Tukang;

class TukangService {
  static async subscribeToFCMTopicAndChannel(device) {
    console.log('subscribe to topic');
  }
}

export default TukangService;