import { validationResult } from 'express-validator/check';

import PenggunaService from '../services/PenggunaService';
import Response from '../utils/Response';

class PenggunaController {
  static async register(req, res) {
    const errors = validationResult(req);

   if (!errors.isEmpty()) {
    Response.setError(422, 'Validasi gagal', errors.array());
   } else {
    let kode = await PenggunaService.generateKodePengguna(req.body.id_hak_akses);
    let dataPengguna = {kode_pengguna: kode, ...req.body};
    let pengguna = await PenggunaService.addPengguna(dataPengguna);
    let verifikasi = await PenggunaService.addVerifikasi(pengguna.id);

    await PenggunaService.sendEmailVerifikasi(pengguna, verifikasi);

    Response.setSuccess(200, 'Registrasi berhasil', null);
   }

   Response.send(res);
  }

  static async login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      Response.setError(422, 'Validasi gagal', errors.array());
    } else {
      try {
        let login = await PenggunaService.login(req.body);

        Response.setSuccess(200, 'Login berhasil', { token: login });
      } catch (error) {
        Response.setError(500, error.message);
      }
    }

    Response.send(res);
  }

  static async verifikasi(req, res) {
    try {
      await PenggunaService.verifikasiToken(req.params.token);
      
      Response.setSuccess(200, 'Selamat, akun anda telah terverifikasi');
    } catch (error) {
      Response.setError(404, error.message);
    }

    Response.send(res);
  }
}

export default PenggunaController;