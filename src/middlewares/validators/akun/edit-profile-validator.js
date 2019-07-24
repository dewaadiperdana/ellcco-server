import { check } from "express-validator/check";
import AkunService from "../../../services/akunService";

class EditProfileValidator {
  static validate(hakAkses) {
    return [
      check("nama")
        .not()
        .isEmpty()
        .withMessage("Nama tidak boleh kosong"),
      check("email")
        .isEmail()
        .withMessage("Email tidak valid")
        .not()
        .isEmpty()
        .withMessage("Email tidak boleh kosong")
        .custom(async (value, { req }) => {
          const akun = await AkunService.getAccount(hakAkses, req.params.id);

          if (value !== akun.email) {
            await AkunService.isEmailAlreadyRegistered(hakAkses, value);
          }
        }),
      check("alamat")
        .not()
        .isEmpty()
        .withMessage("Alamat tidak boleh kosong"),
      check("no_telp")
        .isNumeric()
        .withMessage("No. telp hanya boleh mengandung angka")
        .not()
        .isEmpty()
        .withMessage("No. telp tidak boleh kosong")
    ];
  }
}

export default EditProfileValidator;
