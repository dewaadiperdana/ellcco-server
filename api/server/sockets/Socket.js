import {
  ON_NEW_FCM_TOKEN,
  ON_NEW_SOCKET_ID,
  ON_REUQEST_JOIN_ROOM
} from './events';

import PerangkatService from '../services/PerangkatService';
import PenggunaService from '../services/PenggunaService';
import RuangObrolanService from '../services/RuangObrolanService';

class Socket {
  static init(socket) {
    Socket.onNewSocketId(socket);
    Socket.onNewFCMToken(socket);
    Socket.onRequestJoinRoom(socket);
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

  static onRequestJoinRoom(socket) {
    socket.on(ON_REUQEST_JOIN_ROOM, async payload => {
      try {
        const pengguna = JSON.parse(payload);
        const ruang = await RuangObrolanService.getRuangObrolanByIdPengguna(pengguna.tipe, pengguna.id);

        socket.join(ruang.kode_ruang, () => {
          console.log(`A user has join ${ruang.kode_ruang} with ID: ${pengguna.id}`);
        });
      } catch (error) {
        throw error;
      }
    });
  }
}

export default Socket;