import React, { Component } from 'react';
import {
  Page,
  Card,
  Grid,
  Dropdown,
  Button,
} from 'tabler-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FormattedNumber } from 'react-intl';

import { DataTable } from '../../components';
import { fetchPemesanan } from '../../store/actions/pemesananActions';
import PemesananStatusLabel from './components/PemesananStatusLabel';

class Pemesanan extends Component {
  componentDidMount() {
    this.props.fetchPemesanan('all');
  }

  filterPemesanan(filter) {
    this.props.fetchPemesanan(filter);
  }

  renderPemesanan = () => {
    const { pemesanan } = this.props;
    const columns = [
      { title: 'Kode', data: 'kode' },
      { title: 'Pelanggan', data: 'pelanggan' },
      { title: 'Tukang', data: 'tukang' },
      { title: 'Tanggal', data: 'tanggal' },
      { title: 'Biaya', data: 'biaya' },
      { title: 'Status', data: 'status' },
      { title: 'Invoice', data: 'invoice' },
    ];

    const dataSet = pemesanan.map(item => ({
      kode: item.kode,
      pelanggan: item.pelanggan.nama,
      tukang: item.tukang.nama,
      tanggal: moment(item.tanggal).format('ll'),
      biaya: (
        <FormattedNumber
          value={item.biaya}
          style="currency"
          currency="IDR"
        />
      ),
      status: (<PemesananStatusLabel status={item.status} />),
      invoice: (
        <Button
          RootComponent="a"
          size="sm"
          color="secondary"
          icon="clipboard"
          href={`/#/pemesanan/invoice/${item.id}`}
        >
          Lihat Invoice
        </Button>
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
            <Card.Title>Laporan Pemesanan</Card.Title>
            <Card.Options className="mr-5">
              <Button.Dropdown value="Filter" color="secondary">
                <Dropdown.Item
                  to="/#/pemesanan"
                  onClick={() => this.filterPemesanan('all')}
                >
                    Semua
                </Dropdown.Item>
                <Dropdown.ItemDivider />
                <Dropdown.Item
                  to="/#/pemesanan"
                  onClick={() => this.filterPemesanan('last_1_weeks')}
                >
                    1 minggu terakhir
                </Dropdown.Item>
                <Dropdown.Item
                  to="/#/pemesanan"
                  onClick={() => this.filterPemesanan('last_2_weeks')}
                >
                    2 minggu terakhir
                </Dropdown.Item>
                <Dropdown.ItemDivider />
                <Dropdown.Item
                  to="/#/pemesanan"
                  onClick={() => this.filterPemesanan('last_1_months')}
                >
                    1 bulan terakhir
                </Dropdown.Item>
                <Dropdown.Item
                  to="/#/pemesanan"
                  onClick={() => this.filterPemesanan('last_2_months')}
                >
                    2 bulan terakhir
                </Dropdown.Item>
              </Button.Dropdown>
            </Card.Options>
          </Card.Header>
          {this.renderPemesanan()}
        </Card>
      </Page.Content>
    );
  }
}

const mapStateToProps = state => ({
  pemesanan: state.pemesanan.pemesanan,
});

const mapDispatchToProps = dispatch => ({
  fetchPemesanan: (filter) => { dispatch(fetchPemesanan(filter)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Pemesanan);
