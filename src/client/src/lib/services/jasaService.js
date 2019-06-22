import axios from 'axios';
import Jasa from '../models/jasa';

class JasaService {
  static async all() {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/jasa`;

      const response = await axios.get(url);

      return Promise.resolve(response.data.map(item => new Jasa(item)));
    } catch (error) {
      throw error;
    }
  }

  static async store(data) {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/jasa`;

      const response = await axios.post(url, data);

      return Promise.resolve(response.data);
    } catch (error) {
      if (error.response.status === 422) {
        return Promise.reject(error.response.data);
      }

      throw error;
    }
  }

  static async single(id) {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/jasa/single/${id}`;

      const response = await axios.get(url);

      return Promise.resolve(new Jasa(response.data));
    } catch (error) {
      throw error;
    }
  }

  static async edit(id, nama) {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/jasa/${id}`;

      const response = await axios.put(url, { nama: nama });

      return Promise.resolve(new Jasa(response.data));
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/jasa/${id}`;

      const response = await axios.delete(url);

      return Promise.resolve(new Jasa(response.data));
    } catch (error) {
      throw error;
    }
  }

  static async count() {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/jasa/count`;

    try {
      const response = await axios.get(url);

      return Promise.resolve(response.data.count);
    } catch (error) {
      throw error;
    }
  }
}

export default JasaService;
