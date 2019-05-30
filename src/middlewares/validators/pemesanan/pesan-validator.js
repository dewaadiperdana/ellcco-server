import { check } from 'express-validator/check';

class PesanValidator {
  static validate() {
    return [
      check('id_pelanggan')
        .not().isEmpty().withMessage('Id pelanggan tidak boleh kosong'),
      check('id_jasa')
        .not().isEmpty().withMessage('Id jasa tidak boleh kosong'),
      check('kerusakan')
        .not().isEmpty().withMessage('Kerusakan tidak boleh kosong'),
      check('deskripsi')
        .not().isEmpty().withMessage('Deskripsi kerusakan tidak boleh kosong')
    ];
  }
}

export default PesanValidator;