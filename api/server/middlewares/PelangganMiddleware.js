import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Response from '../utils/Response';
import HakAksesService from '../services/HakAksesService';

dotenv.config();

export default class PelangganMiddleware {
  static async isPelanggan(req, res, next) {
    const authorization = req.get('Authorization');
    const authToken = authorization.split(' ')[1];

    const decoded = jwt.verify(authToken, process.env.SECRET_KEY);
    const kodeHakAkses = await HakAksesService.getKodeHakAkses(decoded.id_hak_akses);

    if (Number.parseInt(kodeHakAkses) !== 0) {
      return Response.error(res, 403, 'Maaf anda tidak memiliki hak akses.');
    }

    next();
  }
};