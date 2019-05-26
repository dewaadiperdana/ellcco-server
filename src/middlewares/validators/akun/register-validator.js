import { check } from 'express-validator/check';
import AkunService from '../../../services/akun';

class RegisterValidator {
  static validate(hakAkses) {
    return [
      check('nama')
        .not().isEmpty().withMessage('Nama tidak boleh kosong'),
      check('email')
        .isEmail().withMessage('Email tidak valid')
        .not().isEmpty().withMessage('Email tidak boleh kosong')
        .custom(async value => {
          await AkunService.isEmailAlreadyRegistered(hakAkses, value);
        }),
      check('password')
        .not().isEmpty().withMessage('Password tidak boleh kosong'),
      check('alamat')
        .not().isEmpty().withMessage('Alamat tidak boleh kosong'),
      check('no_telp')
        .isNumeric().withMessage('No. telp hanya boleh mengandung angka')
        .not().isEmpty().withMessage('No. telp tidak boleh kosong')
    ];
  }
}

export default RegisterValidator;