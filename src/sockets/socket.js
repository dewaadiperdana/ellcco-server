import {
  ON_NEW_SOCKET_ID,
  ON_NEW_FCM_TOKEN
} from '../config/events';

import AkunService from '../services/akun';
import TukangService from '../services/tukang';

class Socket {
  constructor(socket) {
    this.socket = socket;
    console.log(`A user has connected`);

    this.socket.on('disconnect', () => console.log('A user has disconnected'));

    this.listenOnNewFcmToken();
    this.listenOnNewSocket();
  }

  async listenOnNewFcmToken() {
    this.socket.on(ON_NEW_FCM_TOKEN, async payload => {
      const data = JSON.parse(payload);

      await AkunService.storeDeviceToken(data.hakAkses, data);
    });
  }

  async listenOnNewSocket() {
    this.socket.on(ON_NEW_SOCKET_ID, async payload => {
      const data = JSON.parse(payload);

      // await TukangService.subscribeToSocketTopicAndChannel(this.socket, data);
      await AkunService.storeDeviceToken(data.hakAkses, data);
    });
  }
}

export default Socket;