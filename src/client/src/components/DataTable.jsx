import React, { Component } from 'react';
import { Table } from 'tabler-react';
import PropTypes from 'prop-types';

class DataTable extends Component {
  render() {
    const { columns, data } = this.props;

    return (
      <div>
        <Table>
          <Table.Header>
            <Table.Row>
              {columns.map((item, key) => (
                <Table.ColHeader key={key}>{item.title}</Table.ColHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((item, key) => (
              <Table.Row key={key}>
                {columns.map((column, index) => (
                  <Table.Col key={index}>{item[column.data]}</Table.Col>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default DataTable;
