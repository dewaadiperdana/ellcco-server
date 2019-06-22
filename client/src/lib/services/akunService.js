import axios from 'axios';
import Akun from '../models/akun';
import Error from '../Error';

class AkunService {
  static async accountList(role) {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/${role}/account-list`;

      const response = await axios.get(url);

      return Promise.resolve(response.data.map(item => new Akun(item)));
    } catch (error) {
      throw error;
    }
  }

  static async activateOrDeactivateAccount(type, role, id) {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/${role}/account-status`;
    try {
      const response = await axios.post(url, { type, role, id });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(new Error(error.response.data));
    }
  }

  static async counts(role) {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/${role}/counts`;
    try {
      const response = await axios.get(url);

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AkunService;
