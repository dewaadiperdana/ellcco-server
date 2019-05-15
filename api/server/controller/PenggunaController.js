import { validationResult } from 'express-validator/check';

import PenggunaService from '../services/PenggunaService';
import Response from '../utils/Response';

class PenggunaController {
  static async register(req, res) {
    const errors = validationResult(req);

   if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    let responseErrors = {};

    for(let error in errorsArray) {
      responseErrors = {
        ...responseErrors,
        [errorsArray[error].param]: {
          key: errorsArray[error].param,
          message: errorsArray[error].msg
        }
      };
    }

    return Response.error(res, 422, 'Validasi gagal', JSON.stringify(responseErrors));
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
      return Response.error(422, 'Validasi gagal', errors.array());
    } else {
      try {
        let login = await PenggunaService.login(req.body);

        return Response.success(res, 200, 'Login berhasil', { token: login });
      } catch (error) {
        return Response.error(res, 500, error.message);
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
}

export default PenggunaController;