import { SAVE_JASA, SAVE_JASA_COUNT } from '../actions/jasaActions';

const jasaState = {
  all: [],
  count: 0,
};

const jasaReducers = (state = jasaState, action) => {
  switch (action.type) {
    case SAVE_JASA:
      return { ...state, all: action.data };
    case SAVE_JASA_COUNT:
      return { ...state, count: action.data };
    default:
      return state;
  }
};

export default jasaReducers;
