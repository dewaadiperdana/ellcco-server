import { check } from 'express-validator/check';

class LoginValidator {
  static validate() {
    return [
      check('username')
        .not().isEmpty().withMessage('Username tidak boleh kosong'),
      check('password')
        .not().isEmpty().withMessage('Password tidak boleh kosong')
    ];
  }
}

export default LoginValidator;