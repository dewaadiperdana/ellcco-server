import db from "../database/models";
import randomstring from "randomstring";
import jwt from "jsonwebtoken";

const Pelanggan = db.Pelanggan;

class PelangganService {
  static async editProfile(id, data) {
    try {
      await Pelanggan.update(data, { where: { id: id } });
      const profile = await Pelanggan.findOne({ where: { id: id } });

      delete profile.password;

      const token = jwt.sign(profile.dataValues, process.env.SECRET_KEY);

      return Promise.resolve({
        akun: profile,
        token: token
      });
    } catch (error) {
      throw error;
    }
  }
}

export default PelangganService;
