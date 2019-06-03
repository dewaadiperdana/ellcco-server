import NotifikasiService from "../services/notifikasi";

class NotifikasiController {
  static async index(req, res) {
    try {
      const notifikasi = await NotifikasiService.get(
        req.params.hak_akses,
        req.params.id
      );

      return res.json(notifikasi);
    } catch (error) {
      throw error;
    }
  }

  static async unread(req, res) {
    try {
      const notifikasi = await NotifikasiService.unread(
        req.params.hak_akses,
        req.params.id
      );

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

  static async single(req, res) {
    try {
      const notifikasi = await NotifikasiService.single(req.params.id);

      return res.json(notifikasi);
    } catch (error) {
      throw error;
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await NotifikasiService.delete(req.params.id);

      return res.json(deleted);
    } catch (error) {
      throw error;
    }
  }
}

export default NotifikasiController;