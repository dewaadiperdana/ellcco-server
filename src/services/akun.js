import jwt from "jsonwebtoken";
import { Hash } from "../utils";
import db from "../database/models";
import randomstring from "randomstring";
import TukangService from './tukang';
import VerifikasiService from "./verifikasi";

const Pelanggan = db.Pelanggan;
const Tukang = db.Tukang;

class AkunService {
  static async register(hakAkses, akun) {
    let response;

    try {
      switch (hakAkses) {
        case "pelanggan":
          response = await AkunService.registerPelanggan(akun);
          await VerifikasiService.createVerification("pelanggan", response);
          return response;
        case "tukang":
          response = await AkunService.registerTukang(akun);
          await VerifikasiService.createVerification("tukang", response);
          return response;
        default:
          response = await AkunService.registerPelanggan(akun);
          await VerifikasiService.createVerification("pelanggan", response);
          return response;
      }
    } catch (error) {
      throw error;
    }
  }

  static async verifikasi(hakAkses, token) {
    switch (hakAkses) {
      case "pelanggan":
        await AkunService.verifikasiAkunPelanggan(token);
        break;
      case "tukang":
        await AkunService.verifikasiAkunTukang(token);
        break;
      default:
        await AkunService.verifikasiAkunPelanggan(token);
        break;
    }
  }

  static async login(hakAkses, akun) {
    let response;

    switch (hakAkses) {
      case "pelanggan":
        response = await AkunService.processLogin(Pelanggan, akun);
        return response;
      case "tukang":
        response = await AkunService.processLogin(Tukang, akun);
        return response;
      default:
        response = await AkunService.processLogin(Pelanggan, akun);
        return response;
    }
  }

  static async registerPelanggan(pelanggan) {
    try {
      const data = {
        ...pelanggan,
        password: await Hash.make(pelanggan.password),
        kode: await AkunService.generateKodeAkun("pelanggan"),
        hak_akses: "pelanggan"
      };

      const response = await Pelanggan.create(data);

      return Promise.resolve(response);
    } catch (error) {
      throw error;
    }
  }

  static async registerTukang(tukang) {
    try {
      const data = {
        ...tukang,
        password: await Hash.make(tukang.password),
        kode: await AkunService.generateKodeAkun("tukang"),
        hak_akses: "tukang"
      };

      const response = await Tukang.create(data);

      return Promise.resolve(response);
    } catch (error) {
      throw error;
    }
  }

  static async verifikasiAkunPelanggan(token) {
    try {
      const verifikasi = await VerifikasiService.verifikasiAkun(token);
      await Pelanggan.update(
        { aktif: true },
        { where: { id: verifikasi.id_pelanggan } }
      );

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async verifikasiAkunTukang(token) {
    try {
      const verifikasi = await VerifikasiService.verifikasiAkun(token);
      await Tukang.update(
        { aktif: true },
        { where: { id: verifikasi.id_tukang } }
      );

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async processLogin(model, data) {
    try {
      let akun = await model.findOne({ where: { email: data.email } });

      if (akun === null) {
        return Promise.reject({
          modal: {
            key: "modal",
            message: "Akun tidak ditemukan"
          }
        });
      }
      let matchPassword = await Hash.check(data.password, akun.password);

      if (!matchPassword) {
        return Promise.reject({
          modal: {
            key: "modal",
            message: "Password salah"
          }
        });
      }

      if (!akun.aktif) {
        return Promise.reject({
          modal: {
            key: "modal",
            message: "Akun sedang tidak aktif"
          }
        });
      }

      delete akun.dataValues.password;
      let token = jwt.sign(akun.dataValues, process.env.SECRET_KEY);

      return Promise.resolve({
        akun: akun.dataValues,
        token: token
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAccount(role, id, include = null) {
    let model;

    try {
      switch(role) {
        case 'pelanggan':
          model = Pelanggan;
          break;
        case 'tukang':
          model = Tukang;
          break;
        default:
          model = Pelanggan;
          break;
      }

      const account = model.findOne({
        where: { id: id },
        include: include
      });

      return Promise.resolve(account);
    } catch (error) {
      throw error;
    }
  }

  static async storeDeviceToken(hakAkses, data, socket) {
    switch (hakAkses) {
      case "pelanggan":
        await AkunService.storeDeviceData(Pelanggan, data, socket);
        break;
      case "tukang":
        await AkunService.storeDeviceData(Tukang, data, socket);
        break;
      default:
        await AkunService.storeDeviceData(Pelanggan, data, socket);
        break;
    }
  }

  static async storeDeviceData(model, data, socket) {
    try {
      const key = 'token' in data ? 'token' : 'socket';
      const perangkat = {
        [key]: data[key],
      };

      const akun = model.findOne({ where: { id: data.idAkun } });

      if (akun[key] === null || (akun[key] !== data[key])) {
        await model.update(perangkat, { where: { id: data.idAkun } });

        if (data.hakAkses === 'tukang') {
          await TukangService.subscribeToSocketTopicAndChannel(socket, data);
          await TukangService.subscribeToFCMTopicAndChannel(data);
        }
      }

      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }

  static async isEmailAlreadyRegistered(role, email) {
    let model;

    switch (role) {
      case "pelanggan":
        model = db.Pelanggan;
        break;
      case "tukang":
        model = db.Tukang;
        break;
      default:
        model = db.Pelanggan;
        break;
    }

    let akun = await model.findOne({ where: { email: email } });

    if (akun) {
      return Promise.reject("Email sudah terdaftar");
    }
  }

  static async checkIsAuthenticated(token) {
    try {
      const verified = jwt.verify(token, process.env.SECRET_KEY);

      return Promise.resolve({
        isAuthenticated: true,
        hakAkses: verified.hak_akses
      });
    } catch (error) {
      return Promise.resolve({
        isAuthenticated: false,
        hakAkses: null
      });
    }
  }

  static generateKodeAkun(hakAkses) {
    let kode = "";
    let random = randomstring.generate(10);

    switch (hakAkses) {
      case "pelanggan":
        kode = "PL-";
        break;
      case "tukang":
        kode = "TK-";
        break;
      default:
        kode = "PL";
    }

    kode += random.toUpperCase();
    return kode;
  }
}

export default AkunService;