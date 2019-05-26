import db from '../database/models';
import randomstring from 'randomstring';

const Jasa = db.Jasa;

class JasaService {
  static async get(limit = null) {
    try {
      let jasa = {};

      if (limit !== null) {
        jasa = await Jasa.findAll({ limit });
        return Promise.resolve(jasa.length <= 0 ? {} : jasa.map(item => item.dataValues));
      }

      jasa = await Jasa.findAll({});
      return Promise.resolve(jasa.length <= 0 ? {} : jasa.map(item => item.dataValues));
    } catch (error) {
      return Promise.resolve(error);
    }
  }

  static async store(jasa) {
    try {
      const channel = `${jasa.nama.toLowerCase().replace(' ', '-')}_${JasaService.generateChannel()}`
      jasa.channel = channel;

      await Jasa.create(jasa);

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async update(id, jasa) {
    try {
      const channel = `${jasa.nama.toLowerCase().replace(' ', '-')}_${JasaService.generateChannel()}`
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

  static generateChannel() {
    const channel = randomstring.generate(6);

    return channel;
  }
}

export default JasaService;