import TokenPerangkatService from '../../services/TokenPerangkatService';

const onNewFCMToken = async payload => {
  try {
    const data = JSON.parse(payload);

    await TokenPerangkatService.simpanToken({
      id_pengguna: data.id_pengguna,
      token: data.token
    });
  } catch (error) {
    throw error;
  }
};

export default onNewFCMToken;