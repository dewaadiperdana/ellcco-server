import LayananService from '../services/LayananService';
import Util from '../utils/Utils';

const util = new Util();

class LayananController {
  static async getAllLayanan(req, res) {
    try {
      const layanan = await LayananService.getAllLayanan();

      if (layanan.length > 0) {
        util.setSuccess(200, 'Layanan ditemukan', layanan);
      } else {
        util.setSuccess(200, 'Layanan tidak ditemukan');
      }

      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default LayananController;