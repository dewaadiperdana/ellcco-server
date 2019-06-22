import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import adminReducers from './reducers/adminReducers';
import jasaReducers from './reducers/jasaReducers';
import akunReducers from './reducers/akunReducers';

const store = createStore(
  combineReducers({
    admin: adminReducers,
    jasa: jasaReducers,
    akun: akunReducers,
  }),
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
);

export default store;
