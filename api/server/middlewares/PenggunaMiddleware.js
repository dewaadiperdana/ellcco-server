import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Response from '../utils/Response';
import HakAksesService from '../services/HakAksesService';

dotenv.config();

class PenggunaMiddleware {
  static async checkRole(req, res, next, type) {
    const authorization = req.get('Authorization');
    const authToken = authorization.split(' ')[1];

    const decoded = jwt.verify(authToken, process.env.SECRET_KEY);
    const kodeHakAkses = await HakAksesService.getKodeHakAkses(decoded.id_hak_akses);

    if (Number.parseInt(kodeHakAkses) !== type) {
      return Response.error(res, 403, 'Maaf anda tidak memiliki hak akses.');
    }
    
    next();
  }

  static async isPelanggan(req, res, next) {
    await PenggunaMiddleware.checkRole(req, res, next, 0);
  }

  static async isTukang(req, res, next) {
    await PenggunaMiddleware.checkRole(req, res, next, 1);
  }
}

export default PenggunaMiddleware;