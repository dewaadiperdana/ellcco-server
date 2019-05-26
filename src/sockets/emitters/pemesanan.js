import { socketServer } from '../../app';
import {
  ON_NEW_ORDER
} from '../../config/events';

class PemesananEmitter {
  static broadcastNotifikasiPesanan(channel, payload) {
    socketServer.to(channel).emit(ON_NEW_ORDER, JSON.stringify(payload));
  }
}

export default PemesananEmitter;