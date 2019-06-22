import {
  SAVE_PELANGGAN_ACCOUNT_LIST,
  SAVE_TUKANG_ACCOUNT_LIST,
  SAVE_PELANGGAN_ACCOUNT_COUNTS,
  SAVE_TUKANG_ACCOUNT_COUNTS,
} from '../actions/akunActions';

const akunState = {
  pelanggan: [],
  tukang: [],
  pelangganCount: 0,
  tukangCount: 0,
};

const akunReducers = (state = akunState, action) => {
  switch (action.type) {
    case SAVE_PELANGGAN_ACCOUNT_LIST:
      return { ...state, pelanggan: action.data };
    case SAVE_TUKANG_ACCOUNT_LIST:
      return { ...state, tukang: action.data };
    case SAVE_PELANGGAN_ACCOUNT_COUNTS:
      return { ...state, pelangganCount: action.data };
    case SAVE_TUKANG_ACCOUNT_COUNTS:
      return { ...state, tukangCount: action.data };
    default:
      return state;
  }
};

export default akunReducers;
