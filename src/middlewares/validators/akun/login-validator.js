import { check } from 'express-validator/check';

class LoginValidator {
  static validate() {
    return [
      check('email')
        .isEmail().withMessage('Email tidak valid')
        .not().isEmpty().withMessage('Email tidak boleh kosong'),
      check('password')
        .not().isEmpty().withMessage('Password tidak boleh kosong')
    ];
  }
}

export default LoginValidator;