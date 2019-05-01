import randomstring from 'randomstring';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';

import database from '../src/models';
import Mail from '../utils/Mail';
import Hash from '../utils/Hash';
import Helper from '../utils/Helper';

dotenv.config();

const mail = new Mail();
const Op = Sequelize.Op;

class PenggunaService {
  static async addPengguna(pengguna) {
    try {
      pengguna.password = await Hash.make(pengguna.password);

      return await database.Pengguna.create(pengguna);
    } catch (error) {
      throw error;
    }
  }

  static async addVerifikasi(idPengguna) {
    try {
      let token = await this.generateTokenVerifikasi();
      let tglBerlakuToken = moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');

      return await database.VerifikasiAkun.create({
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
        let pengguna = await database.Pengguna.findOne({ where: { email: data.email } });

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
        let verifikasi = await database.VerifikasiAkun.findOne({ where: { token: token } });
  
        if (verifikasi === null) {
          reject({
            message: 'Token verifikasi tidak ditemukan'
          });
        } else {
          let expired = moment().isAfter(verifikasi.tanggal_berlaku);

          if (expired) {
            await database.VerifikasiAkun.destroy({ where: { id: verifikasi.id } });

            reject({
              message: 'Token verifikasi sudah kadaluarsa'
            });
          } else {
            await database.Pengguna.update(
              { aktif: true },
              { where: { id: verifikasi.id_pengguna } }
            );

            await database.VerifikasiAkun.destroy({ where: { id: verifikasi.id } });

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
          'Admin eLconics <hello@elconics.herokuapp.com>',
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
    return new Promise(async (resolve, reject) => {
      try {
        let role = await database.HakAkses.findByPk(idRole);
        let kode = '';

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

        kode = kode + Math.floor(Math.random() * (999 - 100) + 100);

        resolve(kode);
      } catch (error) {
        throw error;
      }
    });
  }

  static async getHakAkses() {
    return new Promise(async (resolve, reject) => {
      try {
        let hakAkses = await database.HakAkses.findAll({
          where: {
            nama: {
              [Op.notIn]: ['Admin']
            }
          }
        });

        let data = hakAkses.map(item => {
          return item.dataValues;
        });

        resolve(data);
      } catch (error) {
        throw error;
      }
    });
  }
}

export default PenggunaService;