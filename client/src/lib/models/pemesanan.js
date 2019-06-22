import Akun from './akun';
import Jasa from './jasa';

class Pemesanan {
  id = '';

  id_pelanggan = '';

  id_tukang = '';

  id_jasa = '';

  kode = '';

  tanggal = '';

  biaya = 0;

  kerusakan = '';

  deskripsi = '';

  status = '';

  pelanggan = new Akun({});

  tukang = new Akun({});

  jasa = new Jasa({});

  constructor(data) {
    Object.assign(this, data);

    this.pelanggan = new Akun(data.pelanggan);
    this.tukang = new Akun(data.tukang);
    this.jasa = new Jasa(data.jasa);
  }
}

export default Pemesanan;
