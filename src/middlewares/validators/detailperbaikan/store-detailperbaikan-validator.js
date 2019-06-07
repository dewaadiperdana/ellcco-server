import { check } from "express-validator/check";

class StoreDetailPerbaikanValidator {
  static validate() {
    return [
      check("nama")
        .not()
        .isEmpty()
        .withMessage("Detail tidak boleh kosong")
    ];
  }
}

export default StoreDetailPerbaikanValidator;
