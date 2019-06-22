import React, { Component } from 'react';
import { Table } from 'tabler-react';
import PropTypes from 'prop-types';

class DataTable extends Component {
  renderTableContent = () => {
    const { columns, data } = this.props;

    return data.length > 0 ? (
      data.map(item => (
        <Table.Row key={item.id}>
          {columns.map(column => (
            <Table.Col key={item.id}>{item[column.data]}</Table.Col>
          ))}
        </Table.Row>
      ))
    ) : (
      <Table.Row>
        <Table.Col
          className="text-center"
          colSpan={columns.length}
        >
          Data tidak ditemukan
        </Table.Col>
      </Table.Row>
    );
  }

  render() {
    const { columns } = this.props;

    return (
      <div>
        <Table striped={true}>
          <Table.Header>
            <Table.Row>
              {columns.map(item => (
                <Table.ColHeader key={item.id}>{item.title}</Table.ColHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderTableContent()}
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
