import { check } from 'express-validator/check';

class PesanValidator {
  static validate() {
    return [
      check('id_pelanggan')
        .not().isEmpty().withMessage('Id pelanggan tidak boleh kosong'),
      check('id_jasa')
        .not().isEmpty().withMessage('Id jasa tidak boleh kosong')
    ];
  }
}

export default PesanValidator;