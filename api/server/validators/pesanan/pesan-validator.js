import { check } from 'express-validator/check';

export default class PesanValidator {
  static validate() {
    return [
      check('id_pelanggan')
        .not().isEmpty().withMessage('Id pelanggan tidak boleh kosong'),
      check('id_layanan')
        .not().isEmpty().withMessage('Id layanan tidak boleh kosong'),
      check('nama_kerusakan')
        .not().isEmpty().withMessage('Nama kerusakan tidak boleh kosong'),
      check('deskripsi_kerusakan')
        .not().isEmpty().withMessage('Deskripsi kerusakan tidak boleh kosong')
    ];
  }
}