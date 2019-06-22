import React, { Component } from 'react';
import {
  Card,
  Form,
  Button,
  Alert,
} from 'tabler-react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import PropTypes from 'prop-types';

import { saveAdminAuthData } from '../store/actions/adminActions';
import Error from '../lib/Error';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      errors: new Error({}),
      form: {
        username: '',
        password: '',
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  }

  onSubmitLogin = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { cookies, history } = this.props;
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/login`;

    try {
      const response = await axios.post(url, this.state.form);
      this.setState({ loading: false });

      cookies.set('token', response.data.token, {
        expires: moment().add(1, 'h').toDate(),
      });

      this.props.saveAdminAuthData(response.data.admin);

      history.push('/');
    } catch (error) {
      this.setState({ loading: false, errors: new Error(error.response.data) });
    }
  }

  componentDidMount() {
    const { cookies, history } = this.props;

    if (cookies.get('token')) {
      history.push('/');
    }
  }

  render() {
    const {
      loading,
      errors,
    } = this.state;

    return (
      <div className="flex-container-center">
        <div className="col col-login">
          <Card>
            <Card.Body>
              <Card.Title>
                Masuk ke dashboard
              </Card.Title>
              <Form onSubmit={this.onSubmitLogin}>
                <Form.Input
                  disabled={loading}
                  name="username"
                  label="Username"
                  placeholder="Masukkan username"
                  invalid={errors.has('username')}
                  feedback={errors.message('username')}
                  onChange={this.handleChange}
                />
                <Form.Input
                  disabled={loading}
                  name="password"
                  type="password"
                  label="Password"
                  invalid={errors.has('password')}
                  feedback={errors.message('password')}
                  placeholder="Masukkan password"
                  onChange={this.handleChange}
                />
                <Button block disabled={loading} loading={loading} color="primary">Masuk</Button>
              </Form>
            </Card.Body>
          </Card>
          {
            errors.has('error') ? (
              <div className="mt-2">
                <Alert icon="alert-triangle" type="danger">
                  {errors.message('error')}
                </Alert>
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

Login.path = '/sample-page';
Login.navigationOptions = {
  title: 'Sample page',
};

Login.propTypes = {
  saveAdminAuthData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  saveAdminAuthData: (auth) => { dispatch(saveAdminAuthData(auth)); },
});

export default connect(null, mapDispatchToProps)(withCookies(Login));
