import {
  ON_NEW_FCM_TOKEN,
  ON_NEW_SOCKET_ID
} from './events';

import PerangkatService from '../services/PerangkatService';
import PenggunaService from '../services/PenggunaService';

class Socket {
  static init(socket) {
    Socket.onNewSocketId(socket);
    Socket.onNewFCMToken(socket);
  }

  static onNewSocketId(socket) {
    socket.on(ON_NEW_SOCKET_ID, async payload => {
      try {
        const data = JSON.parse(payload);
        const isTukang = await PenggunaService.isTukang(data.id_pengguna);

        await PerangkatService.simpanToken({
          id_pengguna: data.id_pengguna,
          socket: data.socket
        });

        if (isTukang) {
          socket.join('room_pesanan');
        }

      } catch (error) {
        throw error;
      }
    });
  }

  static onNewFCMToken(socket) {
    socket.on(ON_NEW_FCM_TOKEN, async payload => {
      try {
        const data = JSON.parse(payload);

        await PerangkatService.simpanToken({
          id_pengguna: data.id_pengguna,
          token: data.token
        });
      } catch (error) {
        throw error;
      }
    });
  }
}

export default Socket;