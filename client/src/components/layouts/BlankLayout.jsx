import React from 'react';
import PropTypes from 'prop-types';

const BlankLayout = ({ children }) => {
  return (
    <div className="page">
      <div className="page-single">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BlankLayout;

BlankLayout.propTypes = {
  children: PropTypes.element
};
