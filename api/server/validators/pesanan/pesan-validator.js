import { check } from 'express-validator/check';

export default class PesanValidator {
  static validate() {
    return [
      check('id_pelanggan')
        .not().isEmpty().withMessage('Id pelanggan tidak boleh kosong'),
      check('id_layanan')
        .not().isEmpty().withMessage('Id layanan tidak boleh kosong')
    ];
  }
}