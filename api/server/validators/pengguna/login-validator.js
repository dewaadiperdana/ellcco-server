import { check } from 'express-validator/check';

export default class LoginValidator {
  static validate() {
    return [
      check('email')
        .not().isEmpty().withMessage('Email tidak boleh kosong')
        .isEmail().withMessage('Email tidak valid'),
      check('password')
        .not().isEmpty().withMessage('Password tidak boleh kosong')
    ];
  }
}