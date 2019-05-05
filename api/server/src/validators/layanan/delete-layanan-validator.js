import { check } from 'express-validator/check';

export default class DeleteLayananValidator {
  static validate() {
    return [
      check('id')
        .not().isEmpty().withMessage('Id layanan tidak boleh kosong'),
    ];
  }
}