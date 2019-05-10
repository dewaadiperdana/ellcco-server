import { socket } from '../../../app';
import { ON_NEW_ORDER } from '../events';

export default class Order {
  static broadcastNewOrder(payload) {
    socket.to('room_pesanan').emit(ON_NEW_ORDER, JSON.stringify(payload));
  }
}