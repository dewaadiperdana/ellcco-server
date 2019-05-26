import { check } from 'express-validator/check';

class StoreValidator {
  static validate() {
    return [
      check('nama')
        .not().isEmpty().withMessage('Nama tidak boleh kosong')
    ];
  }
}

export default StoreValidator;