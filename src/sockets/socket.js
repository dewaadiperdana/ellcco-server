import {
  ON_NEW_SOCKET_ID,
  ON_NEW_FCM_TOKEN,
  ON_JOIN_ORDER_CHANNEL,
  ON_LEAVE_ORDER_CHANNEL,
  ON_JOIN_CHAT_ROOM,
  ON_CHAT_MESSAGE
} from "../config/events";

import { admin } from "../app";

import AkunService from "../services/akunService";
import RuangObrolanService from "../services/ruangobrolanService";
import PelayananService from "../services/pelayananService";
import PesanObrolanService from "../services/pesanobrolanService";
import NotifikasiService from "../services/notifikasiService";

class Socket {
  constructor(socket) {
    this.socket = socket;
    console.log(`A user has connected`);

    this.socket.on("disconnect", () => console.log("A user has disconnected"));

    this.listenOnNewFcmToken();
    this.listenOnNewSocket();
    this.listenOnJoinOrderChannel();
    this.listenOnLeaveOrderChannel();
    this.listenOnJoinChatRoom();
    this.listenOnChatMessage();
    this.listenOnJoinChatRoomWhenOrderAccepted();
  }

  async listenOnNewFcmToken() {
    this.socket.on(ON_NEW_FCM_TOKEN, async payload => {
      const data = JSON.parse(payload);
      console.log('FCM token subscribe');

      await AkunService.storeDeviceToken(data.hakAkses, data, this.socket);
      await RuangObrolanService.subscribeToRuangObrolanFCM(data.hakAkses, data);
    });
  }

  async listenOnNewSocket() {
    this.socket.on(ON_NEW_SOCKET_ID, async payload => {
      const data = JSON.parse(payload);

      await AkunService.storeDeviceToken(data.hakAkses, data, this.socket);
      await RuangObrolanService.subscribeToRuangObrolanSocket(
        this.socket,
        data.hakAkses,
        data
      );

      await RuangObrolanService.subscribeToRuangObrolanFCM(data.hakAkses, data);
    });
  }

  async listenOnJoinOrderChannel() {
    this.socket.on(ON_JOIN_ORDER_CHANNEL, async payload => {
      console.log("A USER JOINING CHANNEL");
      const data = JSON.parse(payload);

      await PelayananService.subscribeToSocketChannel(this.socket, data);
    });
  }

  async listenOnLeaveOrderChannel() {
    this.socket.on(ON_LEAVE_ORDER_CHANNEL, async payload => {
      console.log("A USER LEAVING CHANNEL");
      const data = JSON.parse(payload);

      await PelayananService.unsubscribeFromSocketChannel(this.socket, data);
    });
  }

  async listenOnJoinChatRoom() {
    this.socket.on(ON_JOIN_CHAT_ROOM, async payload => {
      console.log("A USER JOIN CHAT ROOM");

      this.socket.join(payload.room);
    });
  }

  async listenOnJoinChatRoomWhenOrderAccepted() {
    this.socket.on('retrieve', (data) => console.log(data));
  }

  async listenOnChatMessage() {
    this.socket.on(ON_CHAT_MESSAGE, async payload => {
      console.log("CHAT MESSAGE");
      const data = JSON.parse(payload);

      const pesanObrolan = await PesanObrolanService.store(data.message);
      const notifikasi = await NotifikasiService.saveChatMessageNotification(
        data.role,
        pesanObrolan
      );

      console.log(data.ruang_obrolan);

      this.socket.broadcast
        .to(data.ruang_obrolan)
        .emit(ON_CHAT_MESSAGE, pesanObrolan);

      const message = {
        notification: {
          title: data.title,
          body: pesanObrolan.isi
        },
        data: {
          pesanan: JSON.stringify(pesanObrolan)
        },
        topic: data.ruang_obrolan
      };

      await admin.messaging().send(message);
    });
  }
}

export default Socket;
