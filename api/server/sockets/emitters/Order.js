import { socket } from '../../app';
import { ON_NEW_ORDER, ON_ORDER_ACCEPTED } from '../events';

export default class Order {
  static broadcastNewOrder(payload) {
    socket.to('room_pesanan').emit(ON_NEW_ORDER, JSON.stringify(payload));
  }

  static sendNotifikasiPenerimaanPesanan(perangkat, payload) {
    socket.to(perangkat.socket).emit(ON_ORDER_ACCEPTED, JSON.stringify(payload));
  }
}