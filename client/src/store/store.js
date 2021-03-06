import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import adminReducers from './reducers/adminReducers';
import jasaReducers from './reducers/jasaReducers';
import akunReducers from './reducers/akunReducers';
import pemesananReducers from './reducers/pemesananReducers';

const store = createStore(
  combineReducers({
    admin: adminReducers,
    jasa: jasaReducers,
    akun: akunReducers,
    pemesanan: pemesananReducers,
  }),
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
);

export default store;
