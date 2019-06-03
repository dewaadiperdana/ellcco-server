import { socketServer } from "../../app";
import {
  ON_NEW_ORDER,
  ON_ORDER_ACCEPTED,
  ON_ORDER_BILL_ADDED
} from "../../config/events";

class PemesananEmitter {
  static broadcastNotifikasiPesanan(channel, payload) {
    socketServer.to(channel).emit(ON_NEW_ORDER, JSON.stringify(payload));
  }

  static sendOrderAcceptedNotification(socket, payload) {
    socketServer.to(socket).emit(ON_ORDER_ACCEPTED, JSON.stringify(payload));
  }

  static sendOrderBillNotification(socket, payload) {
    socketServer.to(socket).emit(ON_ORDER_BILL_ADDED, JSON.stringify(payload));
  }
}

export default PemesananEmitter;
