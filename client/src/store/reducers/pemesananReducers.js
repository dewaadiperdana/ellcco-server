import { SAVE_PEMESANAN, SAVE_PEMESANAN_COUNT } from '../actions/pemesananActions';

const pemesananState = {
  pemesanan: [],
  count: 0,
};

const pemesananReducers = (state = pemesananState, action) => {
  switch (action.type) {
    case SAVE_PEMESANAN:
      return { ...state, pemesanan: action.data };
    case SAVE_PEMESANAN_COUNT:
      return { ...state, count: action.data };
    default:
      return state;
  }
}

export default pemesananReducers;
