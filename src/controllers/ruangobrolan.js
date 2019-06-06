import RuangObrolanService from "../services/ruangobrolan";

class RuangObrolanController {
  static async index(req, res) {
    try {
      const response = await RuangObrolanService.get(req.params.id);

      return res.json(response);
    } catch (error) {
      throw error;
    }
  }

  static async pesanObrolan(req, res) {
    try {
      const response = await RuangObrolanService.getPesanObrolan(
        req.params.hak_akses,
        req.params.id_ruang_obrolan,
        req.params.id_akun
      );

      return res.json(response);
    } catch (error) {
      throw error;
    }
  }
}

export default RuangObrolanController;
