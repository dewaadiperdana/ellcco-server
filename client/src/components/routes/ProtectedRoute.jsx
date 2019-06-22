import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

import { fetchAuthData } from '../../store/actions/adminActions';
import AuthLoading from '../AuthLoading';
import { DashboardLayout } from '../layouts';

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: true,
      loading: false,
    };
  }

  componentDidMount() {
    this.checkIsAuthenticated();
  }

  checkIsAuthenticated = async () => {
    const { cookies } = this.props;
    const token = cookies.get('token');
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/is-authenticated`;

    if (!token) {
      this.setState({ loading: false, authenticated: false });
      return;
    }

    this.setState({ loading: true });

    try {
      const response = await axios.post(url, {}, { withCredentials: true });

      this.props.fetchAuthData();
      this.setState({ loading: false, authenticated: response.data.isAuthenticated });
    } catch (error) {
      this.setState({ loading: false, authenticated: false });
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { authenticated, loading } = this.state;

    return (
      <Route
        {...rest}
        render={(matchProps) => {
          if (loading) {
            return (
              <AuthLoading />
            );
          }

          if (!authenticated) {
            return (
              <Redirect to="/login" />
            );
          }

          return (
            <DashboardLayout>
              <Component {...matchProps} />
            </DashboardLayout>
          );
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAuthData: () => { dispatch(fetchAuthData()); },
});

export default connect(null, mapDispatchToProps)(withCookies(withRouter(ProtectedRoute)));

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};
