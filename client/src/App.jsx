import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import indonesianLocaleData from 'react-intl/locale-data/id';

import 'tabler-react/dist/Tabler.css';
import './components/css/style.css';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Jasa from './pages/jasa/Jasa';
import FormTambahJasa from './pages/jasa/FormTambahJasa';
import FormEditJasa from './pages/jasa/FormEditJasa';
import Pelanggan from './pages/pelanggan/Pelanggan';
import Tukang from './pages/tukang/Tukang';
import Pemesanan from './pages/pemesanan/Pemesanan';
import Invoice from './pages/pemesanan/Invoice';
import Logout from './pages/Logout';

import { ProtectedRoute, PublicRoute } from './components/routes';

import store from './store/store';

function AppRouter() {
  return (
    <Router>
      <Provider store={store}>
        <IntlProvider locale="id">
          <Switch>
            <PublicRoute exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Dashboard} />
            <ProtectedRoute exact path="/jasa" component={Jasa} />
            <ProtectedRoute exact path="/jasa/tambah" component={FormTambahJasa} />
            <ProtectedRoute exact path="/jasa/edit/:id" component={FormEditJasa} />
            <ProtectedRoute exact path="/pelanggan" component={Pelanggan} />
            <ProtectedRoute exact path="/tukang" component={Tukang} />
            <ProtectedRoute exact path="/pemesanan" component={Pemesanan} />
            <ProtectedRoute exact path="/pemesanan/invoice/:id" component={Invoice} />
            <ProtectedRoute exact path="/logout" component={Logout} />
            <Route path="" component={NotFound} />
          </Switch>
        </IntlProvider>
      </Provider>
    </Router>
  );
}

export default AppRouter;
