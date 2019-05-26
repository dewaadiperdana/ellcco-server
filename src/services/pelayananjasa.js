import db from '../database/models';

const PelayananJasa = db.PelayananJasa;

class PelayananJasaService {
  static async getTukang(idJasa) {
    try {
      const pelayananJasa = await PelayananJasa.findAll({ where: { id_jasa: idJasa } });
      const response = pelayananJasa === null ? null : pelayananJasa.map(item => item.dataValues);

      return Promise.resolve(response);
    } catch (error) {
      throw error;
    }
  }
}

export default PelayananJasaService;