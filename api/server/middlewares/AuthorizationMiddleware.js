import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Response from '../utils/Response';

dotenv.config();

export default class AuthorizationMiddleware {
  static async isAuthenticated(req, res, next) {
    const authorization = req.get('Authorization');

    if (authorization === undefined) {
      return Response.error(res, 403, 'Token otorisasi tidak tersedia');
    }

    const authToken = authorization.split(' ')[1];

    try {
      const verified = jwt.verify(authToken, process.env.SECRET_KEY);
      next();
    } catch (error) {
      return Response.error(res, 403, 'Token otorisasi tidak valid, atau anda tidak ter-otentikasi.');
    }
  }
};