import {
  ON_NEW_SOCKET_ID,
  ON_NEW_FCM_TOKEN,
  ON_JOIN_ORDER_CHANNEL,
  ON_LEAVE_ORDER_CHANNEL
} from "../config/events";

import AkunService from "../services/akun";
import RuangObrolanService from "../services/ruangobrolan";
import PelayananService from "../services/pelayanan";

class Socket {
  constructor(socket) {
    this.socket = socket;
    console.log(`A user has connected`);

    this.socket.on("disconnect", () => console.log("A user has disconnected"));

    this.listenOnNewFcmToken();
    this.listenOnNewSocket();
    this.listenOnJoinOrderChannel();
    this.listenOnLeaveOrderChannel();
  }

  async listenOnNewFcmToken() {
    this.socket.on(ON_NEW_FCM_TOKEN, async payload => {
      const data = JSON.parse(payload);

      await AkunService.storeDeviceToken(data.hakAkses, data, this.socket);
      await RuangObrolanService.subscribeToRuangObrolanFCM(data.hakAkses, data);
    });
  }

  async listenOnNewSocket() {
    this.socket.on(ON_NEW_SOCKET_ID, async payload => {
      const data = JSON.parse(payload);

      await AkunService.storeDeviceToken(data.hakAkses, data, this.socket);
      await RuangObrolanService.subscribeToRuangObrolanSocket(
        data.hakAkses,
        data,
        this.socket
      );
    });
  }

  async listenOnJoinOrderChannel() {
    this.socket.on(ON_JOIN_ORDER_CHANNEL, async payload => {
      console.log('A USER JOINING CHANNEL');
      const data = JSON.parse(payload);

      await PelayananService.subscribeToSocketChannel(this.socket, data);
    });
  }

  async listenOnLeaveOrderChannel() {
    this.socket.on(ON_LEAVE_ORDER_CHANNEL, async payload => {
      console.log('A USER LEAVING CHANNEL');
      const data = JSON.parse(payload);

      await PelayananService.unsubscribeFromSocketChannel(this.socket, data);
    });
  }
}

export default Socket;