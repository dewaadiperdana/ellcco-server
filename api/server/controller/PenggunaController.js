import { validationResult } from 'express-validator/check';

import PenggunaService from '../services/PenggunaService';
import Response from '../utils/Response';
import ValidationError from '../utils/ValidationError';

class PenggunaController {
  static async register(req, res) {
    const errors = validationResult(req);

   if (!errors.isEmpty()) {
    const errorsArray = ValidationError.format(errors.array());

    return Response.error(res, 422, 'Validasi gagal', errorsArray);
   } else {
    try {
      let kode = await PenggunaService.generateKodePengguna(req.body.id_hak_akses);
      let dataPengguna = {kode_pengguna: kode, ...req.body};
      let pengguna = await PenggunaService.addPengguna(dataPengguna);
      let verifikasi = await PenggunaService.addVerifikasi(pengguna.id);

      await PenggunaService.sendEmailVerifikasi(pengguna, verifikasi);

      return Response.success(res, 200, 'Registrasi berhasil', null);
    } catch (error) {
      return Response.error(res, 500, error.message);
    }
   }
  }

  static async login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorsArray = ValidationError.format(errors.array());

      return Response.error(res, 422, 'Validasi gagal', errorsArray);
    } else {
      try {
        let login = await PenggunaService.login(req.body);

        return Response.success(res, 200, 'Login berhasil', login);
      } catch (error) {
        return Response.error(res, 500, 'Login gagal', error);
      }
    }
  }

  static async verifikasi(req, res) {
    try {
      await PenggunaService.verifikasiToken(req.params.token);
      
      return Response.success(res, 200, 'Selamat, akun anda telah terverifikasi');
    } catch (error) {
      return Response.error(res, 404, error.message);
    }
  }

  static async getHakAkses(req, res) {
    try {
      let hakAkses = await PenggunaService.getHakAkses();

      return Response.success(res, 200, 'Berhasil', hakAkses);
    } catch (error) {
      return Response.error(res, 500, 'Error');
    }
  }

  static async isAuthenticated(req, res) {
      const header = await req.get('Authorization');
      const token = header.split(' ')[1];

      const check = await PenggunaService.checkAuthToken(token);

      return Response.success(res, 200, 'Berhasil', { isAuthenticated: check });
  }
}

export default PenggunaController;