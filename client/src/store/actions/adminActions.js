import axios from 'axios';
import Admin from '../../lib/models/admin';

const SAVE_ADMIN_AUTH = 'SAVE_ADMIN_AUTH';

const saveAdminAuthData = auth => ({
  type: SAVE_ADMIN_AUTH,
  data: new Admin(auth),
});

const fetchAuthData = () => (async (dispatch) => {
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/auth`;
    const response = await axios.post(url, {}, { withCredentials: true });

    dispatch(saveAdminAuthData(response.data));
  } catch (error) {
    throw error;
  }
});

export {
  SAVE_ADMIN_AUTH,
  saveAdminAuthData,
  fetchAuthData,
};
