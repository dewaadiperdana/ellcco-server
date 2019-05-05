import TokenPerangkatService from '../../services/TokenPerangkatService';

const onNewFCMToken = async payload => {
  try {
    const data = JSON.parse(payload);

    await TokenPerangkatService.simpanToken(data.id_pengguna, data.token);
  } catch (error) {
    throw error;
  }
};

export default onNewFCMToken;