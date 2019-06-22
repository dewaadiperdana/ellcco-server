import React, { Component } from 'react';
import Text from '../../../lib/Text';

const PemesananStatusLabel = (props) => {
  let label;

  switch (props.status) {
    case 'menunggu_penerimaan':
      label = (
        <span>
          <span className="status-icon bg-warning"></span>
          {Text.formatStatusLabelCapitalize(props.status)}
        </span>
      );
      break;
    case 'menunggu_perbaikan':
      label = (
        <span>
          <span className="status-icon bg-warning"></span>
          {Text.formatStatusLabelCapitalize(props.status)}
        </span>
      );
      break;
    case 'sedang_perbaikan':
      label = (
        <span>
          <span className="status-icon bg-success"></span>
          {Text.formatStatusLabelCapitalize(props.status)}
        </span>
      );
      break;
    case 'menunggu_pembayaran':
      label = (
        <span>
          <span className="status-icon bg-danger"></span>
          {Text.formatStatusLabelCapitalize(props.status)}
        </span>
      );
      break;
    case 'perbaikan_selesai':
      label = (
        <span>
          <span className="status-icon bg-primary"></span>
          {Text.formatStatusLabelCapitalize(props.status)}
        </span>
      );
      break;
    case 'perbaikan_dibatalkan':
      label = (
        <span>
          <span className="status-icon bg-danger"></span>
          {Text.formatStatusLabelCapitalize(props.status)}
        </span>
      );
      break;
    default:
      label = (
        <span>
          <span className="status-icon bg-primary"></span>
          Menunggu Penerimaan
        </span>
      );
      break;
  }

  return label;
}

export default PemesananStatusLabel;
