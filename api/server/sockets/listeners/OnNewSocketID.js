import TokenPerangkatService from '../../services/TokenPerangkatService';

const onNewSocketID = async payload => {
  try {
    const data = JSON.parse(payload);

    await TokenPerangkatService.simpanSocketId(data.id_pengguna, data.socket_id);
  } catch (error) {
    throw error;
  }
};

export default onNewSocketID;