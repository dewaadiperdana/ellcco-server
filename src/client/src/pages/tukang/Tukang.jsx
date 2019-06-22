import React, { Component } from 'react';
import {
  Page,
  Grid,
  Card,
  Button,
  Dropdown,
} from 'tabler-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { DataTable } from '../../components';
import AkunService from '../../lib/services/akunService';
import { fetchAccountList } from '../../store/actions/akunActions';

class Tukang extends Component {
  constructor(props) {
    super(props);

    this.swall = withReactContent(Swal);
  }

  componentDidMount() {
    this.props.fetchAccountList('tukang');
  }

  onActivateAccount = (id) => {
    this.swall.fire({
      title: 'Aktifkan akun?',
      text: 'Anda yakin ingin mengaktifkan akun ini?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Saya Yakin',
      cancelButtonText: 'Batalkan',
    }).then((result) => {
      if (result.value) {
        this.swall.fire({
          title: 'Mengaktifkan akun',
          text: 'Sedang mengaktifkan akun',
          onBeforeOpen: () => {
            Swal.showLoading();

            AkunService.activateOrDeactivateAccount('activation', 'tukang', id)
              .then((response) => {
                Swal.hideLoading();

                this.swall.fire(
                  'Berhasil!',
                  'Akun telah diaktifkan',
                  'success',
                ).then(() => this.props.fetchAccountList('tukang'));
              })
              .catch((error) => {
                Swal.hideLoading();

                this.swall.fire(
                  'Ups!',
                  error.message('modal'),
                  'error',
                );
              });
          },
        });
      }
    });
  }

  onDeactivateAccount = (id) => {
    this.swall.fire({
      title: 'Nonaktifkan akun?',
      text: 'Anda yakin ingin menonaktifkan akun ini?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Saya Yakin',
      cancelButtonText: 'Batalkan',
    }).then((result) => {
      if (result.value) {
        this.swall.fire({
          title: 'Menonaktifkan akun',
          text: 'Sedang menonaktifkan akun',
          onBeforeOpen: () => {
            Swal.showLoading();

            AkunService.activateOrDeactivateAccount('deactivation', 'tukang', id)
              .then((response) => {
                Swal.hideLoading();

                this.swall.fire(
                  'Berhasil!',
                  'Akun telah dinonaktifkan',
                  'success',
                ).then(() => this.props.fetchAccountList('tukang'));
              })
              .catch((error) => {
                Swal.hideLoading();

                this.swall.fire(
                  'Ups!',
                  error.message('modal'),
                  'error',
                );
              });
          },
        });
      }
    });
  }

  render() {
    const columns = [
      { title: 'Kode', data: 'kode' },
      { title: 'Nama', data: 'nama' },
      { title: 'Email', data: 'email' },
      { title: 'Status', data: 'aktif' },
      { title: 'Alamat', data: 'alamat' },
      { title: 'No. Telp', data: 'no_telp' },
      { title: 'Aksi', data: 'action' },
    ];

    const dataSet = this.props.tukang.map(item => ({
      kode: item.kode,
      nama: item.nama,
      email: item.email,
      aktif: item.aktif ? (
        <span>
          <span className="status-icon bg-success"></span>
          Aktif
        </span>
      ) : (
        <span>
          <span className="status-icon bg-danger"></span>
          Nonaktif
        </span>
      ),
      alamat: item.alamat,
      no_telp: item.no_telp,
      action: (
        <Button.Dropdown size="sm" color="secondary" value="Aksi">
          <Dropdown.Item
            to="/#/tukang"
            onClick={() => this.onActivateAccount(item.id)}
          >
            Aktifkan
          </Dropdown.Item>
          <Dropdown.Item
            to="/#/tukang"
            onClick={() => this.onDeactivateAccount(item.id)}
          >
            Nonaktifkan
          </Dropdown.Item>
        </Button.Dropdown>
      ),
    }));

    return (
      <div>
        <Page.Header>
          <Page.Title>Data Tukang</Page.Title>
        </Page.Header>
        <Grid.Row>
          <Card>
            <Card.Body>
              <DataTable
                columns={columns}
                data={dataSet}
              />
            </Card.Body>
          </Card>
        </Grid.Row>
      </div>
    );
  }
}

Tukang.propTypes = {
  fetchAccountList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tukang: state.akun.tukang,
});

const mapDispatchToProps = dispatch => ({
  fetchAccountList: (role) => { dispatch(fetchAccountList(role)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tukang);
