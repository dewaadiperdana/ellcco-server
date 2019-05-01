import { check } from 'express-validator/check';

export default class RegisterValidator {
  static validate() {
    return [
      check('id_hak_akses')
        .not().isEmpty().withMessage('Id hak akses tidak boleh kosong'),
      check('nama')
        .not().isEmpty().withMessage('Nama tidak boleh kosong'),
      check('email')
        .not().isEmpty().withMessage('Email tidak boleh kosong')
        .isEmail().withMessage('Email tidak valid'),
      check('password')
        .not().isEmpty().withMessage('Password tidak boleh kosong')
    ];
  }
}