import jwt from 'jsonwebtoken';
import { Hash } from '../utils';
import db from '../database/models';

const Admin = db.Admin;

class AdminService {
  static async login(data) {
    try {
      const admin = await Admin.findOne({ where: { username: data.username } });

      if (!admin) {
        return Promise.reject({
          error: {
            key: 'error',
            message: 'Akun tidak ditemukan'
          }
        });
      }

      const matchPassword = await Hash.check(data.password, admin.password);

      if (!matchPassword) {
        return Promise.reject({
          error: {
            key: 'error',
            message: 'Password salah'
          }
        });
      }

      delete admin.dataValues.password;

      const token = jwt.sign(admin.dataValues, process.env.SECRET_KEY, { expiresIn: '1h' });

      return Promise.resolve({
        token,
        admin
      });
    } catch (error) {
      throw error;
    }
  }

  static async isAuthenticated(token) {
    try {
      const verified = jwt.verify(token, process.env.SECRET_KEY);

      return Promise.resolve({ isAuthenticated: true });
    } catch (error) {
      return Promise.reject({ isAuthenticated: false });
    }
  }

  static async getAuthData(token) {
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      const auth = await Admin.findOne({ where: { id: data.id } });

      delete auth.dataValues.password;

      return Promise.resolve(auth);
    } catch (error) {
      throw error;
    }
  }
}

export default AdminService;