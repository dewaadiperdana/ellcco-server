import randomstring from 'randomstring';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';

import db from '../src/models';
import Mail from '../utils/Mail';
import Hash from '../utils/Hash';
import Helper from '../utils/Helper';
import HakAksesService from '../services/HakAksesService';

dotenv.config();

const mail = new Mail();
const Op = Sequelize.Op;

class PenggunaService {
  static async addPengguna(pengguna) {
    try {
      pengguna.password = await Hash.make(pengguna.password);

      return await db.Pengguna.create(pengguna);
    } catch (error) {
      throw error;
    }
  }

  static async getPengguna(idPengguna) {
    try {
      const pengguna = await db.Pengguna.findByPk(idPengguna);

      if (pengguna === null) {
        return Promise.reject({ message: 'Pengguna tidak ditemukan' });
      }

      return Promise.resolve(pengguna.dataValues);
    } catch (error) {
      throw error;
    }
  }

  static async getPesananPengguna(idPengguna) {
    
  }

  static async addVerifikasi(idPengguna) {
    try {
      let token = await this.generateTokenVerifikasi();
      let tglBerlakuToken = moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');

      return await db.VerifikasiAkun.create({
        id_pengguna: idPengguna,
        token: token,
        tanggal_berlaku: tglBerlakuToken
      });
    } catch (error) {
      throw error;
    }
  }

  static async login(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let pengguna = await db.Pengguna.findOne({ where: { email: data.email } });

        if (pengguna === null) {
          reject({
            message: 'Akun tidak ditemukan'
          });
        } else {
          let passwordMatch = await Hash.check(data.password, pengguna.password);

          if (!passwordMatch) {
            reject({
              message: 'Password salah'
            });
          }

          if(!pengguna.aktif) {
            reject({
              message: 'Akun sedang tidak aktif'
            });
          }

          let payload = {
            id: pengguna.id,
            id_hak_akses: pengguna.id_hak_akses,
            nama: pengguna.nama,
            email: pengguna.email,
            aktif: pengguna.aktif,
            tgl_registrasi: pengguna.tgl_registrasi
          };

          let token = jwt.sign(payload, process.env.SECRET_KEY);

          resolve(token);
        }
      } catch (error) {
        throw error;
      }
    });
  }

  static async verifikasiToken(token) {
    return new Promise(async (resolve, reject) => {
      try {
        let verifikasi = await db.VerifikasiAkun.findOne({ where: { token: token } });
  
        if (verifikasi === null) {
          reject({
            message: 'Token verifikasi tidak ditemukan'
          });
        } else {
          let expired = moment().isAfter(verifikasi.tanggal_berlaku);

          if (expired) {
            await db.VerifikasiAkun.destroy({ where: { id: verifikasi.id } });

            reject({
              message: 'Token verifikasi sudah kadaluarsa'
            });
          } else {
            await db.Pengguna.update(
              { aktif: true },
              { where: { id: verifikasi.id_pengguna } }
            );

            await db.VerifikasiAkun.destroy({ where: { id: verifikasi.id } });

            resolve(true);
          }
        }
      } catch (error) {
        throw error;
      }
    });
  }

  static async sendEmailVerifikasi(pengguna, verifikasi) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = {
          ...pengguna,
          ...verifikasi,
          tokenLink: `${Helper.appUrl()}api/pengguna/verifikasi/${verifikasi.token}`
        };

        let send = await mail.send(
          'Admin Ellcco <hello@ellcco.herokuapp.com>',
          pengguna.email,
          'Verifikasi Akun',
          'verifikasi_akun',
          data
        );
        
        resolve(send);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async generateTokenVerifikasi() {
    return new Promise((resolve, reject) => {
      try {
        let token = randomstring.generate(64);

        resolve(token);
      } catch (error) {
        throw error;
      }
    });
  }

  static async generateKodePengguna(idRole) {
    try {
      let role = await db.HakAkses.findByPk(idRole);

      if (role === null) {
        return Promise.reject({ message: 'Hak akses tidak dapat ditemukan' });
      }

      let kode = '';
      let random = randomstring.generate(6);

      switch(role.nama) {
        case 'Admin':
          kode = 'AD-';
          break;
        case 'Tukang':
          kode = 'TK-';
          break;
        case 'Pelanggan':
          kode = 'PL-';
          break;
        default:
          kode = 0;
      }

      kode = kode + random.toUpperCase();

      return Promise.resolve(kode);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getHakAkses() {
    try {
      let hakAkses = await db.HakAkses.findAll({
        where: {
          nama: {
            [Op.notIn]: ['Admin']
          }
        }
      });

      let data = hakAkses.map(item => {
        return item.dataValues;
      });

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getAllTukang(includes = null) {
    try {
      const hakAksesTukang = await HakAksesService.getIdHakAksesByKode(1);
      let operators = {
        include: includes,
        where: { id_hak_akses: hakAksesTukang.id }
      };

      const tukang = await db.Pengguna.findAll(operators);
      const returnData = tukang.map(item => {
        return item.dataValues;
      });

      return Promise.resolve(tukang === null ? tukang : returnData);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async isTukang(idPengguna) {
    try {
      const kode = await HakAksesService.getKodeByIdPengguna(idPengguna);

      if (Number.parseInt(kode.kode) === 1) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default PenggunaService;