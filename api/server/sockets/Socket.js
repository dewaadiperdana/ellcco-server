import {
  ON_NEW_FCM_TOKEN,
  ON_NEW_SOCKET_ID
} from './events';

import onNewFCMToken from './listeners/OnNewFCMToken';
import onNewSocketID from './listeners/OnNewSocketID';

class Socket {
  static init(socket) {
    socket.on(ON_NEW_SOCKET_ID, onNewSocketID);
    socket.on(ON_NEW_FCM_TOKEN, onNewFCMToken);
  }
}

export default Socket;