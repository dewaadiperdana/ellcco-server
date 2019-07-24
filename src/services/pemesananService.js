import db from '../database/models';
import randomstring from 'randomstring';
import NotifikasiService from './notifikasiService';
import RuangObrolanService from './ruangobrolanService';
import AkunService from './akunService';
import moment from 'moment';
import Sequelize from 'sequelize';

const Jasa = db.Jasa;
const Tukang = db.Tukang;
const Pemesanan = db.Pemesanan;
const Pelanggan = db.Pelanggan;
const DetailPerbaikan = db.DetailPerbaikan;
const Op = Sequelize.Op;
const sequelize = db.sequelize;

class PemesananService {
  static async store(pesanan) {
    const kodePesanan = PemesananService.generateKodePesanan();

    try {
      const data = {
        ...pesanan,
        kode: kodePesanan
      };

      const response = await Pemesanan.create(data);

      await NotifikasiService.broadcastNotifikasiPesanan(response);

      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }

  static async detail(id) {
    try {
      const pesanan = await Pemesanan.findOne({
        where: { id: id },
        include: [
          {
            model: Jasa,
            as: "jasa"
          },
          {
            model: Pelanggan,
            as: "pelanggan"
          },
          {
            model: Tukang,
            as: "tukang"
          }
        ]
      });

      return Promise.resolve(pesanan);
    } catch (error) {
      throw error;
    }
  }

  static async histori(tipe, id) {
    try {
      const histori = await Pemesanan.findAll({
        where: { [`id_${tipe}`]: id },
        order: [["tanggal", "DESC"]]
      });

      return Promise.resolve(histori);
    } catch (error) {
      throw error;
    }
  }

  static async addBiaya(id, biaya) {
    try {
      await Pemesanan.update(
        { biaya: biaya, status: "menunggu_pembayaran" },
        { where: { id: id } }
      );

      const pemesanan = await Pemesanan.findOne({
        where: { id: id },
        include: [
          {
            model: Pelanggan,
            as: "pelanggan"
          }
        ]
      });

      await NotifikasiService.sendOrderBillNotification(pemesanan);

      return Promise.resolve(pemesanan);
    } catch (error) {
      throw error;
    }
  }

  static async terima(idPesanan, idTukang) {
    try {
      const pesanan = await Pemesanan.findOne({
        where: { id: idPesanan },
        include: [
          {
            model: Pelanggan,
            as: "pelanggan"
          }
        ]
      });

      if (
        pesanan.status !== "menunggu_penerimaan" &&
        pesanan.id_tukang !== null
      ) {
        return Promise.reject({
          modal: {
            key: "modal",
            message: "Pesanan sudah diterima"
          }
        });
      }

      await Pemesanan.update(
        {
          id_tukang: idTukang,
          status: "menunggu_perbaikan"
        },
        {
          where: { id: idPesanan }
        }
      );

      await RuangObrolanService.create(pesanan);
      await NotifikasiService.sendOrderAcceptedNotification(pesanan);

      await PemesananService.subscribeFCMRuangObrolan(idTukang, pesanan);

      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }

  static async subscribeFCMRuangObrolan(idTukang, pesanan) {
    try {
      const tukang = await AkunService.getAccount('tukang', idTukang);
      const pelanggan = await AkunService.getAccount('pelanggan', pesanan.id_pelanggan);

      await RuangObrolanService.subscribeToRuangObrolanFCM('tukang', {
        hakAkses: tukang.hak_akses,
        idAkun: tukang.id,
        token: tukang.token
      });

      await RuangObrolanService.subscribeToRuangObrolanFCM('pelanggan', {
        hakAkses: pelanggan.hak_akses,
        idAkun: pelanggan.id,
        token: pelanggan.token
      });
    } catch (error) {
      throw error;
    }
  }

  static async detailPerbaikan(id) {
    try {
      const detail = await Pemesanan.findOne({
        where: { id: id },
        include: [
          {
            model: DetailPerbaikan,
            as: "perbaikan"
          }
        ]
      });

      return Promise.resolve(detail.perbaikan);
    } catch (error) {
      throw error;
    }
  }

  static async getSelectedStatus(id) {
    try {
      const statuses = await db.sequelize.query(
        "SELECT * FROM enum_range('menunggu_penerimaan'::enum_pemesanan_status, NULL) AS status;",
        {
          type: db.sequelize.QueryTypes.SELECT
        }
      );

      const pemesanan = await Pemesanan.findOne({ where: { id: id } });

      const selected = statuses[0].status.map(item => {
        return item === pemesanan.status
          ? {
            status: item,
            selected: true
            }
          : {
              status: item,
              selected: false
          };
      });

      return Promise.resolve(selected);
    } catch (error) {
      throw error;
    }
  }

  static async updateStatus(data) {
    try {
      const updated = await Pemesanan.update(
        { status: data.status },
        { where: { id: data.id } }
      );

      return Promise.resolve(updated);
    } catch (error) {
      throw error;
    }
  }

  static async filter(time) {
    const timeSplit = time.split('_');
    const timeNumber = timeSplit[1];
    const timeLabel = timeSplit[2];

    try {
      let pemesanan;

      if (time === 'all') {
        pemesanan = await Pemesanan.findAll({
          include: [
            {
              model: Jasa,
              as: 'jasa'
            },
            {
              model: Pelanggan,
              as: 'pelanggan'
            },
            {
              model: Tukang,
              as: 'tukang'
            }
          ]
        });

        return Promise.resolve(pemesanan);
      }

      const timeThen = moment().subtract(timeNumber, timeLabel).format('YYYY-MM-DD');
      const timeNow = moment().format('YYYY-MM-DD');

      pemesanan = await Pemesanan.findAll({
        where: {
          tanggal: { [Op.between]: [timeThen, timeNow] }
        },
        include: [
          {
            model: Jasa,
            as: "jasa"
          },
          {
            model: Pelanggan,
            as: "pelanggan"
          },
          {
            model: Tukang,
            as: "tukang"
          }
        ]
      });

      return Promise.resolve(pemesanan);
    } catch (error) {
      throw error;
    }
  }

  static async count() {
    try {
      const count = await Pemesanan.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      });

      return Promise.resolve(count);
    } catch (error) {
      throw error;
    }
  }

  static generateKodePesanan() {
    let kode = 'PS-';
    const random = randomstring.generate(5).toUpperCase();

    kode += random;
    return kode;
  }
}

export default PemesananService;
