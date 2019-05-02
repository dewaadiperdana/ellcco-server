import { check } from 'express-validator/check';

export default class UpdateLayananValidator {
  static validate() {
    return [
      check('id')
        .not().isEmpty().withMessage('Id layanan tidak boleh kosong'),
      check('nama')
        .not().isEmpty().withMessage('Nama layanan tidak boleh kosong')
    ];
  }
}