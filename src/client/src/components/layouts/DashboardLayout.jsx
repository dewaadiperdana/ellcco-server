import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, Site, Container } from 'tabler-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class DashboardLayout extends Component {
  render() {
    const { children, match, auth } = this.props;

    return (
      <div className="page">
        <div className="flex-fill">
          <Site.Header
            imageURL="/assets/images/logo.svg"
            href="/#/"
            accountDropdown={{
              avatarURL: '/assets/images/admin-placeholder.jpg',
              name: auth.nama,
              description: 'Administrator',
              options: [
                { icon: 'log-out', value: 'Logout', to: '/#/logout' },
              ],
            }}
          />
          <Site.Nav>
            <Nav>
              <Nav.Item
                active={match.path === '/'}
                to="/#/"
                icon="home"
              >
                Dashboard
              </Nav.Item>
              <Nav.Item
                active={match.path === '/jasa' || match.path === '/jasa/tambah'}
                hasSubNav
                value="Jasa"
                icon="sliders"
              >
                <Nav.SubItem to="/#/jasa" value="Lihat Data" />
                <Nav.SubItem to="/#/jasa/tambah" value="Tambah Data" />
              </Nav.Item>
              <Nav.Item active={match.path === '/pelanggan'} to="/#/pelanggan" icon="users">
                Pelanggan
              </Nav.Item>
              <Nav.Item active={match.path === '/tukang'} to="/#/tukang" icon="users">
                Tukang
              </Nav.Item>
              <Nav.Item active={match.path === '/pemesanan'} to="/#/pemesanan" icon="shopping-bag">
                Pemesanan
              </Nav.Item>
            </Nav>
          </Site.Nav>
          <Container>
            {children}
          </Container>
        </div>
      </div>
    );
  }
}

DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

const mapStateToProps = state => ({
  auth: state.admin.auth,
});

export default connect(mapStateToProps, null)(withRouter(DashboardLayout));
