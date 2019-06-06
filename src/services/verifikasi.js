import randomstring from "randomstring";
import moment from "moment";
import db from "../database/models";
import { Helpers, Mail } from "../utils";

const mail = new Mail();
const Verifikasi = db.Verifikasi;

class VerifikasiService {
  static async createVerification(hakAkses, akun) {
    const token = VerifikasiService.generateTokenVerifikasi();
    const tglBerlaku = moment()
      .add(30, "minutes")
      .format("YYYY-MM-DD HH:mm:ss");

    try {
      const data = {
        [`id_${hakAkses}`]: akun.id,
        token: token,
        tgl_berlaku: tglBerlaku
      };

      const verifikasi = await Verifikasi.create(data);

      await VerifikasiService.sendVerificationEmail(verifikasi, akun, hakAkses);
    } catch (error) {
      throw error;
    }
  }

  static async sendVerificationEmail(verifikasi, akun, hakAkses) {
    try {
      let data = {
        ...akun,
        ...verifikasi,
        tokenLink: `${Helpers.appUrl()}/api/v1/${hakAkses}/verifikasi/${
          verifikasi.token
        }`
      };

      let send = await mail.send(
        "Admin Ellcco <hello@ellcco.herokuapp.com>",
        akun.email,
        "Verifikasi Akun",
        "verifikasi_akun",
        data
      );

      return Promise.resolve(send);
    } catch (error) {
      throw error;
    }
  }

  static async verifikasiAkun(token) {
    try {
      let verifikasi = await Verifikasi.findOne({ where: { token: token } });

      if (verifikasi === null) {
        return Promise.reject("Token verifikasi tidak ditemukan");
      } else {
        let expired = moment().isAfter(verifikasi.dataValues.tgl_berlaku);

        if (expired) {
          await Verifikasi.destroy({ where: { id: verifikasi.dataValues.id } });
          return Promise.reject("Token verifikasi sudah kadaluarsa");
        } else {
          await Verifikasi.destroy({ where: { id: verifikasi.dataValues.id } });
          return Promise.resolve(verifikasi.dataValues);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  static generateTokenVerifikasi() {
    let kode = randomstring.generate(32);

    return kode;
  }
}

export default VerifikasiService;
