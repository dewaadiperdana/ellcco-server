import NotifikasiService from '../services/notifikasi';

class NotifikasiController {
  static async index(req, res) {
    try {
      const notifikasi = await NotifikasiService.get(req.params.hak_akses, req.params.id);

      return res.json(notifikasi);
    } catch (error) {
      throw error;
    }
  }

  static async unread(req, res) {
    try {
      const notifikasi = await NotifikasiService.unread(req.params.hak_akses, req.params.id);

      return res.json(notifikasi);
    } catch (error) {
      throw error;
    }
  }

  static async markAsRead(req, res) {
    try {
      await NotifikasiService.markAsRead(req.body.id);
    } catch (error) {
      throw error;
    }
  }
}

export default NotifikasiController;