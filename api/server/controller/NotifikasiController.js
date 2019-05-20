import NotifikasiService from '../services/NotifikasiService';
import Response from '../utils/Response';

class NotifikasiController {
  static async getNotifikasiPengguna(req, res) {
    try {
      const notifikasi = await NotifikasiService.getNotifikasiPengguna(req.params.id_pengguna);

      return Response.success(res, 200, 'Berhasil', notifikasi);
    } catch (error) {
      throw error;
    }
  }

  static async tandaiSudahDibaca(req, res) {
    try {
      await NotifikasiService.tandaiSudahDibaca({
        id: req.body.id,
        dibaca: true
      });

      return Response.success(res, 200, 'Berhasil', true);
    } catch (error) {
      throw error;
    }
  }

  static async getNotifikasiBelumDibaca(req, res) {
    console.log('get unread notificaiton');
    try {
      const notifikasi = await NotifikasiService.getNotifikasiBelumDibaca(req.params.id_pengguna);

      return Response.success(res, 200, 'Berhasil', notifikasi);
    } catch (error) {
      throw error;
    }
  }
}

export default NotifikasiController;