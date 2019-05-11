import {
  ON_NEW_FCM_TOKEN,
  ON_NEW_SOCKET_ID
} from './events';

import TokenPerangkatService from '../services/TokenPerangkatService';
import PenggunaService from '../services/PenggunaService';

import onNewFCMToken from './listeners/OnNewFCMToken';
import onNewSocketID from './listeners/OnNewSocketID';

class Socket {
  static init(socket) {
    Socket.onNewSocketId(socket);
    socket.on(ON_NEW_FCM_TOKEN, onNewFCMToken);
  }

  static onNewSocketId(socket) {
    socket.on(ON_NEW_SOCKET_ID, async payload => {
      try {
        const data = JSON.parse(payload);
        console.log(data);
        const isTukang = await PenggunaService.isTukang(payload.id_pengguna);

        await TokenPerangkatService.simpanToken({
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
}

export default Socket;