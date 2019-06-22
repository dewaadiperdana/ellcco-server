import { SAVE_ADMIN_AUTH } from '../actions/adminActions';
import Admin from '../../lib/models/admin';

const adminState = {
  auth: new Admin({}),
};

const adminReducers = (state = adminState, action) => {
  switch (action.type) {
    case SAVE_ADMIN_AUTH:
      return { ...state, auth: action.data };
    default:
      return state;
  }
}

export default adminReducers;
