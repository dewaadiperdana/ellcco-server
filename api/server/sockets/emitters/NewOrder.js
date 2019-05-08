import { socket } from '../../../app';
import { ON_NEW_ORDER } from '../events';

export default class NewOrder {
  static emit(payload) {
    socket.emit(ON_NEW_ORDER, payload);
  }
}