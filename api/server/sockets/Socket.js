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
    socket.on(ON_NEW_SOCKET_ID, async payload => {
      try {
        const data = JSON.parse(payload);
        const isTukang = PenggunaService.isTukang(payload.id_pengguna);

        await TokenPerangkatService.simpanSocketId(data.id_pengguna, data.socket_id);

        if (isTukang) {
          socket.join('room_pesanan', () => {
            let rooms = Object.keys(socket.rooms);
            console.log(rooms);
          })
        }

      } catch (error) {
        throw error;
      }
    });

    socket.on(ON_NEW_FCM_TOKEN, onNewFCMToken);
  }
}

export default Socket;