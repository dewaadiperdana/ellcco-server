import { check } from 'express-validator/check';

export default class TerimaValidator {
  static validate() {
    return [
      check('id_pesanan')
        .not().isEmpty().withMessage('Id pesanan tidak boleh kosong'),
      check('id_pengguna')
        .not().isEmpty().withMessage('Id pengguna tidak boleh kosong')
    ];
  }
}