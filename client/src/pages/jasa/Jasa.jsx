import React, { Component } from 'react';
import {
  Grid,
  Page,
  Button,
  Card,
  Dropdown,
} from 'tabler-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { DataTable } from '../../components';
import { fetchAllDataJasa } from '../../store/actions/jasaActions';
import JasaService from '../../lib/services/jasaService';

class Jasa extends Component {
  constructor(props) {
    super(props);

    this.swall = withReactContent(Swal);
  }

  componentDidMount() {
    this.props.fetchAllDataJasa();
  }

  deleteJasa = (e, id) => {
    e.preventDefault();

    this.swall.fire({
      title: 'Anda yakin?',
      text: 'Anda yakin ingin menghapus data jasa ini?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Saya Yakin',
      cancelButtonText: 'Batalkan',
    }).then((result) => {
      if (result.value) {
        this.swall.fire({
          title: 'Menghapus data',
          text: 'Sedang menghapus data',
          onBeforeOpen: () => {
            Swal.showLoading();

            JasaService.delete(id)
              .then(() => {
                Swal.hideLoading();

                this.swall.fire(
                  'Terhapus!',
                  'Data jasa berhasil dihapus',
                  'success',
                ).then(() => this.props.fetchAllDataJasa());
              });
          },
        });
      }
    });
  }

  renderDataJasa = () => {
    const { jasa } = this.props;
    const columns = [
      { title: 'Nama', data: 'nama' },
      { title: 'Channel', data: 'channel' },
      { title: 'Aksi', data: 'action' }
    ];

    const dataSet = jasa.map(item => ({
      nama: item.nama,
      channel: item.channel,
      action: (
        <Button.Dropdown size="sm" color="secondary" value="Aksi">
          <Dropdown.Item
            to={`/#/jasa/edit/${item.id}`}
          >
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            to="#"
            onClick={(e) => this.deleteJasa(e, item.id)}
          >
            Hapus
          </Dropdown.Item>
        </Button.Dropdown>
      ),
    }));

    return (
      <DataTable
        data={dataSet}
        columns={columns}
      />
    );
  }

  render() {
    return (
      <Page.Content>
        <Card>
          <Card.Header>
            <Card.Title>Data Jasa</Card.Title>
            <Card.Options>
              <Button
                color="secondary"
                icon="plus"
                RootComponent="a"
                href="/#/jasa/tambah"
              >
                Tambah Data
              </Button>
            </Card.Options>
          </Card.Header>
          {this.renderDataJasa()}
        </Card>
      </Page.Content>
    );
  }
}

const mapStateToProps = state => ({
  jasa: state.jasa.all,
});

const mapDispatchToProps = dispatch => ({
  fetchAllDataJasa: () => { dispatch(fetchAllDataJasa()); },
});

Jasa.path = '/jasa';
Jasa.navigationOptions = {
  title: 'Jasa',
  linkName: 'Jasa',
};

Jasa.propTypes = {
  fetchAllDataJasa: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jasa);
