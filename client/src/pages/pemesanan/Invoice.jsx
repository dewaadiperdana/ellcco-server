import React, { Component } from 'react';
import {
  Page,
  Grid,
  Card,
  Header,
  Table,
} from 'tabler-react';
import moment from 'moment';
import { FormattedNumber } from 'react-intl';

import PemesananService from '../../lib/services/pemesananService';
import Pemesanan from '../../lib/models/pemesanan';
import PemesananStatusLabel from './components/PemesananStatusLabel';

class Invoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pemesanan: new Pemesanan({}),
    };
  }

  componentDidMount() {
    this.getDetailPemesanan();
  }

  getDetailPemesanan = async () => {
    const { params } = this.props.match;
    
    try {
      const pemesanan = await PemesananService.detail(params.id);

      this.setState({ pemesanan });
    } catch (error) {
      throw error;
    }
  }

  render() {
    const { pemesanan } = this.state;

    return (
      <Page.Content>
        <Card>
          <Card.Header>
            <Card.Title>{pemesanan.kode}</Card.Title>
            {/* <Card.Options>
              Options
            </Card.Options> */}
          </Card.Header>
          <Card.Body>
            <Grid.Row>
              <Grid.Col>
                <Header.H3>Pelanggan</Header.H3>
                <p>{pemesanan.pelanggan.kode}</p>
                <p>{pemesanan.pelanggan.nama}</p>
                <p>{pemesanan.pelanggan.email}</p>
                <p>{pemesanan.pelanggan.no_telp}</p>
                <p>{pemesanan.pelanggan.alamat}</p>
              </Grid.Col>
              <Grid.Col className="text-right">
                <Header.H3>Tukang</Header.H3>
                <p>{pemesanan.tukang.kode}</p>
                <p>{pemesanan.tukang.nama}</p>
                <p>{pemesanan.tukang.email}</p>
                <p>{pemesanan.tukang.no_telp}</p>
                <p>{pemesanan.tukang.alamat}</p>
              </Grid.Col>
            </Grid.Row>
          </Card.Body>
          <Table striped hasOutline>
            <Table.Header>
              <Table.Row>
                <Table.ColHeader>Kode</Table.ColHeader>
                <Table.ColHeader>Tanggal</Table.ColHeader>
                <Table.ColHeader>Biaya</Table.ColHeader>
                <Table.ColHeader>Status</Table.ColHeader>
                <Table.ColHeader>Kerusakan</Table.ColHeader>
                <Table.ColHeader>Deskripsi</Table.ColHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Col>{pemesanan.kode}</Table.Col>
                <Table.Col>{moment(pemesanan.tanggal).format('ll')}</Table.Col>
                <Table.Col>
                  <FormattedNumber
                    value={pemesanan.biaya}
                    style="currency"
                    currency="IDR"
                  />
                </Table.Col>
                <Table.Col>
                  <PemesananStatusLabel status={pemesanan.status} />
                </Table.Col>
                <Table.Col>{pemesanan.kerusakan}</Table.Col>
                <Table.Col>{pemesanan.deskripsi}</Table.Col>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card>
      </Page.Content>
    )
  }
}

export default Invoice;
