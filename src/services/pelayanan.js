import db from "../database/models";
import { admin } from "../app";

const Jasa = db.Jasa;
const Tukang = db.Tukang;
const PelayananJasa = db.PelayananJasa;

class PelayananService {
  static async list(id) {
    try {
      const tukang = await Tukang.findOne({
        where: { id: id },
        include: [
          {
            model: Jasa,
            as: "jasa"
          }
        ]
      });

      const jasaTukang = tukang.jasa.map(item => item.id);
      const listJasa = await Jasa.findAll({});
      const jasaIds = listJasa.map(item => item.id);

      const idJasaFiltered = jasaIds.filter(item => !jasaTukang.includes(item));

      const jasaFiltered = listJasa.filter(item =>
        idJasaFiltered.includes(item.id)
      );

      return Promise.resolve({
        isServing: tukang.jasa,
        notServing: jasaFiltered
      });
    } catch (error) {
      throw error;
    }
  }

  static async getTukang(idJasa) {
    try {
      const pelayananJasa = await PelayananJasa.findAll({
        where: { id_jasa: idJasa }
      });

      const response =
        pelayananJasa === null
          ? null
          : pelayananJasa.map(item => item.dataValues);

      return Promise.resolve(response);
    } catch (error) {
      throw error;
    }
  }

  static async store(data) {
    try {
      await PelayananJasa.create(data);
      await PelayananService.subscribeToFcmChannel(
        data.id_tukang,
        data.id_jasa
      );

      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const pelayanan = await PelayananJasa.findOne({ where: { id: id } });

      await PelayananService.unsubscribeFromFcmChannel(
        pelayanan.id_tukang,
        pelayanan.id_jasa
      );

      await PelayananJasa.destroy({ where: { id: id } });

      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }

  static async getTukangAndJasa(idTukang, idJasa) {
    try {
      const tukang = await Tukang.findOne({ where: { id: idTukang } });
      const jasa = await Jasa.findOne({ where: { id: idJasa } });

      return Promise.resolve({
        tukang: tukang,
        jasa: jasa
      });
    } catch (error) {
      throw error;
    }
  }

  static async subscribeToFcmChannel(idTukang, idJasa) {
    try {
      const pelayanan = await PelayananService.getTukangAndJasa(
        idTukang,
        idJasa
      );

      await admin
        .messaging()
        .subscribeToTopic(pelayanan.tukang.token, pelayanan.jasa.channel);
    } catch (error) {
      throw error;
    }
  }

  static async subscribeToSocketChannel(data, socket) {
    try {
      const pelayanan = await PelayananService.getTukangAndJasa(
        data.id_tukang,
        data.id_jasa
      );

      socket.join(pelayanan.jasa.channel);
    } catch (error) {
      throw error;
    }
  }

  static async unsubscribeFromFcmChannel(idTukang, idJasa) {
    try {
      const pelayanan = await PelayananService.getTukangAndJasa(
        idTukang,
        idJasa
      );

      await admin
        .messaging()
        .unsubscribeFromTopic(pelayanan.tukang.token, pelayanan.jasa.channel);
    } catch (error) {
      throw error;
    }
  }

  static async unsubscribeFromSocketChannel() {}
}

export default PelayananService;
