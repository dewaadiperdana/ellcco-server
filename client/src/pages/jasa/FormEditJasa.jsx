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
import Jasa from '../../lib/models/jasa';
import Error from '../../lib/Error';

class FormEditJasa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: new Error({}),
      loading: false,
      success: false,
      form: new Jasa({})
    };
  }

  componentDidMount() {
    this.getDataJasa();
  }

  getDataJasa = async () => {
    this.setState({ loading: true });
    const { match } = this.props;

    try {
      const jasa = await JasaService.single(match.params.id);

      this.setState({ loading: false, form: new Jasa(jasa) });
    } catch (error) {
      this.setState({ loading: false });
      throw error;
    }
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
      const { id, nama } = this.state.form;
      await JasaService.edit(id, nama);

      this.setState({ loading: false, success: true });
    } catch (error) {
      this.setState({ loading: false, errors: new Error(error) });
    }
  }

  render() {
    const { loading, errors, success, form } = this.state;

    return (
      <Page.Content>
        <Grid.Row justifyContent="center">
          <Grid.Col width={6}>
            {success ? (
              <Alert type="success">
                Data&nbsp;
                <strong>jasa</strong>
                &nbsp;berhasil disimpan.
              </Alert>
            ) : null}
            <Card>
              <Card.Header>
                Tambah Edit Jasa
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
                    value={form.nama}
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

export default FormEditJasa;
