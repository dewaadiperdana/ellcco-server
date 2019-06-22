class Akun {
  id = '';

  kode = '';

  nama = '';

  email = '';

  aktif = false;

  alamat = '';

  no_telp = '';

  hak_akses = '';

  token = '';

  socket = '';

  constructor(data) {
    delete data.password;

    Object.assign(this, data);
  }
}

export default Akun;
