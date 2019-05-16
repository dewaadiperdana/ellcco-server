import { check } from 'express-validator/check';
import database from '../../models';

export default class RegisterValidator {
  static validate() {
    return [
      check('id_hak_akses')
        .not().isEmpty().withMessage('Hak akses tidak boleh kosong'),
      check('nama')
        .not().isEmpty().withMessage('Nama tidak boleh kosong'),
      check('email')
        .not().isEmpty().withMessage('Email tidak boleh kosong')
        .isEmail().withMessage('Email tidak valid')
        .custom(async value => {
          let pengguna = await database.Pengguna.findOne({ where: { email: value } });

          if (pengguna) {
            return Promise.reject('Email sudah terdaftar');
          }
        }),
      check('password')
        .not().isEmpty().withMessage('Password tidak boleh kosong'),
      check('alamat')
        .not().isEmpty().withMessage('Alamat tidak boleh kosong'),
      check('no_telp')
        .not().isEmpty().withMessage('No Telp tidak boleh kosong')
        .isInt().withMessage('No telp hanya boleh mengandung angka')
    ];
  }
}