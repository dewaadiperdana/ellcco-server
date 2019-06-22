class Admin {
  id = '';

  nama = '';

  username = '';

  hak_akses = '';

  constructor(data) {
    Object.assign(this, data);
  }
}

export default Admin;
