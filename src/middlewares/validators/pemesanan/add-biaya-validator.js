import { check } from "express-validator/check";

class AddBiayaValidator {
  static validate() {
    return [
      check("biaya")
        .isNumeric()
        .withMessage("Biaya hanya boleh mengandung angka")
        .not()
        .isEmpty()
        .withMessage("Biaya tidak boleh kosong")
    ];
  }
}

export default AddBiayaValidator;
