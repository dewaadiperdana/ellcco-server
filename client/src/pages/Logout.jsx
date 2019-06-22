import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

class Logout extends Component {
  componentDidMount() {
    const { cookies, history } = this.props;

    cookies.remove('token');

    history.push('/login');
  }

  render() {
    return null;
  }
}

export default withCookies(Logout);
