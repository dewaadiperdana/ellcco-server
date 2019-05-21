import randomstring from 'randomstring';
import db from '../models';

import StatusPesananService from './StatusPesananService';
import NotifikasiService from './NotifikasiService';
import RuangObrolanService from './RuangObrolanService';

export default class PesananService {
  static async addPesanan(dataPesanan) {
    try {
      const defaultStatus = await StatusPesananService.getDefaultStatus();
      const kodePesanan = PesananService.generateKodePesanan();
      const data = {
        id_status: defaultStatus.id,
        kode_pesanan: kodePesanan,
        ...dataPesanan
      };

      const pesanan = await db.Pesanan.create(data);
      
      return Promise.resolve(pesanan);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getHistoriPengguna(type, idPengguna) {
    try {
      const histori = await db.Pesanan.findAll({
        where: {
          [`id_${type}`]: idPengguna
        },
        include: [db.StatusPesanan]
      });

      const returnHistori = histori.length <= 0 ? null : histori.map(item => {
        return {
          id: item.dataValues.id,
          id_tukang: item.dataValues.id_tukang,
          id_pelanggan: item.dataValues.id_pelanggan,
          id_layanan: item.dataValues.id_layanan,
          kode_pesanan: item.dataValues.kode_pesanan,
          tanggal: item.dataValues.tanggal,
          biaya: item.dataValues.biaya,
          nama_kerusakan: item.dataValues.nama_kerusakan,
          deskripsi_kerusakan: item.dataValues.deskripsi_kerusakan,
          createdAt: item.dataValues.createdAt,
          updatedAt: item.dataValues.updatedAt,
          nama_status: item.StatusPesanan.dataValues.nama,
          kode_status: item.StatusPesanan.dataValues.kode,
          icon_status: item.StatusPesanan.dataValues.icon
        };
      });

      return Promise.resolve(returnHistori);
    } catch (error) {
      throw error;
    }
  }

  static async terimaPesanan(idPesanan, idPengguna) {
    try {
      const pesanan = await db.Pesanan.findOne({
        where: {
          id: idPesanan
        },
        include: [db.StatusPesanan]
      });

      const status = await StatusPesananService.getStatusByKode(2);

      if (pesanan.StatusPesanan.dataValues.kode !== 1 && pesanan.id_tukang !== null) {
        return Promise.reject({
          modal: {
            key: 'modal',
            message: 'Pesanan sudah diterima'
          }
        });
      }

      await db.Pesanan.update({
        id_tukang: idPengguna,
        id_status: status.id
      }, {
        where: {
          id: idPesanan
        }
      });

      await NotifikasiService.addNotifikasi({
        id_pengguna: pesanan.dataValues.id_pelanggan,
        judul: 'Pesanan Diterima',
        deskripsi: 'Pesanan anda telah diterima',
        tipe: 'regular'
      }, pesanan);
      await NotifikasiService.notifikasiPenerimaanPesanan(pesanan.dataValues.id_pelanggan, pesanan);
      await RuangObrolanService.buatRuangObrolan({
        id_tukang: idPengguna,
        id_pelanggan: pesanan.dataValues.id_pelanggan,
        id_pesanan: pesanan.dataValues.id
      });

      return Promise.resolve(pesanan);
    } catch (error) {
      throw error;
    }
  }

  static async detailPesanan(idPesanan, idPelanggan, idTukang) {
    try {
      const pesanan = await db.Pesanan.findOne({ where: { id: idPesanan }, include: [db.Layanan, db.StatusPesanan] });
      const pelanggan = await db.Pengguna.findOne({ where: { id: idPelanggan } });

      delete pelanggan.dataValues.password;

      const detail = {
        pesanan: {
          kode_pesanan: pesanan.dataValues.kode_pesanan,
          tanggal: pesanan.dataValues.tanggal,
          nama_kerusakan: pesanan.dataValues.nama_kerusakan,
          deskripsi_kerusakan: pesanan.dataValues.deskripsi_kerusakan,
          layanan: pesanan.Layanan.dataValues,
          status: pesanan.StatusPesanan.dataValues
        },
        pelanggan: pelanggan.dataValues,
        tukang: !idTukang ? null : await db.Pengguna.findOne({ where: { id: idTukang } })
      };

      return Promise.resolve(detail);
    } catch (error) {
      throw error;
    }
  }

  static async getByKode(kode) {
    try {
      const pesanan = await db.Pesanan.findOne({ where: { kode_pesanan: kode } });

      return Promise.resolve(pesanan.dataValues);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static generateKodePesanan() {
    let kode = 'PS-';
    let random = randomstring.generate(12);
    kode = kode + random.toUpperCase();

    return kode;
  }
}