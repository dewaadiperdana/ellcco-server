import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BlankLayout } from '../layouts';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <BlankLayout>
        <Component {...matchProps} />
      </BlankLayout>
    )}
  />
);

export default withRouter(PublicRoute);

PublicRoute.propTypes = {
  component: PropTypes.object.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};
