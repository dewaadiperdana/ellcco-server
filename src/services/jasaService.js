import db from '../database/models';
import randomstring from 'randomstring';

const Jasa = db.Jasa;
const sequelize = db.sequelize;

class JasaService {
  static async get(limit = null) {
    try {
      if (!limit) {
        const jasa = await Jasa.findAll({ limit });
        return Promise.resolve(jasa);
      }

      const jasa = await Jasa.findAll({});
      return Promise.resolve(jasa);
    } catch (error) {
      return Promise.resolve(error);
    }
  }

  static async store(jasa) {
    try {
      const channel = `${jasa.nama
        .toLowerCase()
        .replace(" ", "-")}_${JasaService.generateChannel()}`;
      jasa.channel = channel;

      await Jasa.create(jasa);

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async update(id, jasa) {
    try {
      const channel = `${jasa.nama
        .toLowerCase()
        .replace(" ", "-")}_${JasaService.generateChannel()}`;
      jasa.channel = channel;

      await Jasa.update(jasa, { where: { id: id } });

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async delete(id) {
    try {
      await Jasa.destroy({ where: { id: id } });

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async byId(id) {
    try {
      const jasa = await Jasa.findOne({ where: { id: id } });

      return Promise.resolve(jasa.dataValues);
    } catch (error) {
      throw error;
    }
  }

  static async count() {
    try {
      const count = await Jasa.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']]
      });

      return Promise.resolve(count);
    } catch (error) {
      throw error;
    }
  }

  static generateChannel() {
    const channel = randomstring.generate(6);

    return channel;
  }
}

export default JasaService;