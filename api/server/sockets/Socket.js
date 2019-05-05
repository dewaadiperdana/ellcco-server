import {
  ON_NEW_FCM_TOKEN
} from './events';

import onNewFCMToken from './listeners/OnNewFCMToken';

class Socket {
  static init(socket) {
    socket.on(ON_NEW_FCM_TOKEN, onNewFCMToken);
  }
}

export default Socket;