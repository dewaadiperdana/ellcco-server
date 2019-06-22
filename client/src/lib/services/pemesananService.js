import axios from 'axios';
import Pemesanan from '../models/pemesanan';

class PemesananService {
  static async filter(filter) {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/pemesanan/filter/${filter}`;

    try {
      const response = await axios.get(url);

      return Promise.resolve(response.data.map(item => new Pemesanan(item)));
    } catch (error) {
      throw error;
    }
  }

  static async count() {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/pemesanan/count`;

    try {
      const response = await axios.get(url);

      return Promise.resolve(response.data.count);
    } catch (error) {
      throw error;
    }
  }

  static async detail(id) {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/pemesanan/${id}`;
    try {
      const response = await axios.get(url);

      return Promise.resolve(new Pemesanan(response.data));
    } catch (error) {
      throw error;
    }
  }
}

export default PemesananService;
