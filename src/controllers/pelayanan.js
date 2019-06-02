import PelayananService from "../services/pelayanan";

class PelayananController {
  static async list(req, res) {
    try {
      const lists = await PelayananService.list(req.params.id_tukang);

      res.json(lists);
    } catch (error) {
      throw error;
    }
  }

  static async store(req, res) {
    try {
      await PelayananService.store(req.body);

      res.json(true);
    } catch (error) {
      throw error;
    }
  }

  static async delete(req, res) {
    try {
      await PelayananService.delete(req.body.id);

      res.json(true);
    } catch (error) {
      throw error;
    }
  }
}

export default PelayananController;
