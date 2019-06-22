import React, { Component } from 'react';
import {
  Grid,
  Card,
  Header,
  Text,
  Button,
  Page,
} from 'tabler-react';
import { connect } from 'react-redux';

import { fetchAccountCounts } from '../store/actions/akunActions';
import { fetchJasaCount } from '../store/actions/jasaActions';
import { fetchPemesananCount } from '../store/actions/pemesananActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAccountCounts('pelanggan');
    this.props.fetchAccountCounts('tukang');
    this.props.fetchJasaCount();
    this.props.fetchPemesananCount();
  }

  render() {
    const { pelangganCount, tukangCount, jasaCount, pemesananCount } = this.props;

    return (
      <div>
        <Page.Content>
          <Grid.Row cards deck justifyContent="center">
            <Grid.Col md={3}>
              <Card>
                <Card.Body>
                  <Header.H1 className="text-center">{jasaCount}</Header.H1>
                  <Text align="center">
                    Jasa
                  </Text>
                </Card.Body>
                <Button block color="primary" RootComponent="a" icon="eye" href="/#/jasa">Lihat</Button>
              </Card>
            </Grid.Col>
            <Grid.Col md={3}>
              <Card>
                <Card.Body>
                  <Header.H1 className="text-center">{pelangganCount}</Header.H1>
                  <Text align="center">
                    Pelanggan
                  </Text>
                </Card.Body>
                <Button block color="primary" RootComponent="a" icon="eye" href="/#/pelanggan">Lihat</Button>
              </Card>
            </Grid.Col>
            <Grid.Col md={3}>
              <Card>
                <Card.Body>
                  <Header.H1 className="text-center">{tukangCount}</Header.H1>
                  <Text align="center">
                    Tukang
                  </Text>
                </Card.Body>
                <Button block color="primary" RootComponent="a" icon="eye" href="/#/tukang">Lihat</Button>
              </Card>
            </Grid.Col>
            <Grid.Col md={3}>
              <Card>
                <Card.Body>
                  <Header.H1 className="text-center">{pemesananCount}</Header.H1>
                  <Text align="center">
                    Pesanan
                  </Text>
                </Card.Body>
                <Button block color="primary" RootComponent="a" icon="eye" href="/#/pemesanan">Lihat</Button>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Page.Content>
      </div>
    );
  }
}

Dashboard.path = '';
Dashboard.navigationOptions = {
  title: 'Dashboard',
  linkName: 'Dashboard',
};

const mapStateToProps = state => ({
  auth: state.admin.auth,
  pelangganCount: state.akun.pelangganCount,
  tukangCount: state.akun.tukangCount,
  jasaCount: state.jasa.count,
  pemesananCount: state.pemesanan.count,
});

const mapDispatchToProps = dispatch => ({
  fetchAccountCounts: (role) => { dispatch(fetchAccountCounts(role)); },
  fetchJasaCount: () => { dispatch(fetchJasaCount()); },
  fetchPemesananCount: () => { dispatch(fetchPemesananCount()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
