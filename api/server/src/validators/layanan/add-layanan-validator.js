import { check } from 'express-validator/check';

export default class AddLayananValidator {
  static validate() {
    return [
      check('nama')
        .not().isEmpty().withMessage('Nama layanan tidak boleh kosong')
    ];
  }
}