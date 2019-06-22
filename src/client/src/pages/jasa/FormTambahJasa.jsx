import React, { Component } from 'react';
import {
  Card,
  Form,
  Button,
  Grid,
  Page,
  Alert,
} from 'tabler-react';

import JasaService from '../../lib/services/jasaService';
import Error from '../../lib/Error';

class FormTambahJasa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: new Error({}),
      loading: false,
      success: false,
      form: {
        nama: '',
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

  saveDataJasa = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      await JasaService.store(this.state.form);

      this.setState({ loading: false, success: true });
    } catch (error) {
      this.setState({ loading: false, errors: new Error(error) });
    }
  }

  render() {
    const { loading, errors, success } = this.state;

    return (
      <Page.Content>
        <Grid.Row justifyContent="center">
          <Grid.Col width={6}>
            {success ? (
              <Alert type="success">
                Data
                <strong>jasa</strong>
                berhasil disimpan.
              </Alert>
            ) : null}
            <Card>
              <Card.Header>
                Tambah Data Jasa
              </Card.Header>
              <Card.Body>
                <Form onSubmit={this.saveDataJasa}>
                  <Form.Input
                    name="nama"
                    label="Nama"
                    placeholder="Nama Jasa"
                    disabled={loading}
                    invalid={errors.has('nama')}
                    feedback={errors.message('nama')}
                    onChange={this.handleChange}
                  />
                  <Button
                    block
                    type="submit"
                    color="success"
                    loading={loading}
                  >
                    Simpan
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    );
  }
}

export default FormTambahJasa;
