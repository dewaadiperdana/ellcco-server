import {
  ON_USER_CONNECTED
} from '../config/events';

import AkunService from '../services/akun';

class Socket {
  constructor(socket) {
    this.socket = socket;

    this.listenOnNewFcmToken();
  }

  async listenOnNewFcmToken() {
    this.socket.on(ON_USER_CONNECTED, async payload => {
      const data = JSON.parse(payload);
      
      switch(data.hakAkses) {
        case 'pelanggan':
          await AkunService.storeDeviceTokenAndSocket('pelanggan', data);
          break;
        case 'tukang':
          await AkunService.storeDeviceTokenAndSocket('tukang', data);
          break;
        default:
          await AkunService.storeDeviceTokenAndSocket('pelanggan', data);
          break;
      }
    });
  }
}

export default Socket;