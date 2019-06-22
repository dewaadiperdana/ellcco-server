import React, { Component } from 'react';
import {
  Page,
  Card,
  Grid,
  Dropdown,
  Button
} from 'tabler-react';
import { DataTable } from '../../components';

class Pemesanan extends Component {
  render() {
    const columns = [
      { title: 'Kode', data: 'kode' },
      { title: 'Pelanggan', data: 'pelanggan' },
      { title: 'Tukang', data: 'tukang' },
      { title: 'Tanggal', data: 'tanggal' },
      { title: 'Biaya', data: 'biaya' },
      { title: 'Status', data: 'status' },
    ];

    return (
      <div>
        <Page.Header>
          <Page.Title>Laporan Pemesanan</Page.Title>
        </Page.Header>
        <Grid.Col>
          <Card>
            <Card.Body>
              <Button.Dropdown value="Filter" color="secondary">
                <Dropdown.Item to="/#/pemesanan">Semua</Dropdown.Item>
                <Dropdown.ItemDivider />
                <Dropdown.Item to="/#/pemesanan">1 minggu terakhir</Dropdown.Item>
                <Dropdown.Item to="/#/pemesanan">2 minggu terakhir</Dropdown.Item>
                <Dropdown.ItemDivider />
                <Dropdown.Item to="/#/pemesanan">1 bulan terakhir</Dropdown.Item>
                <Dropdown.Item to="/#/pemesanan">2 bulan terakhir</Dropdown.Item>
              </Button.Dropdown>
              <DataTable
                data={[]}
                columns={columns}
              />
            </Card.Body>
          </Card>
        </Grid.Col>
      </div>
    );
  }
}

export default Pemesanan;
