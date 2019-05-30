import { socketServer } from '../../app';
import {
  ON_NEW_ORDER,
  ON_ORDER_ACCEPTED
} from '../../config/events';

class PemesananEmitter {
  static broadcastNotifikasiPesanan(channel, payload) {
    socketServer.to(channel).emit(ON_NEW_ORDER, JSON.stringify(payload));
  }

  static sendOrderAcceptedNotification(socket, payload) {
    socketServer.to(socket).emit(ON_ORDER_ACCEPTED, JSON.stringify(payload));
  }
}

export default PemesananEmitter;