import {
  USER_UPDATE,
  USER_INPUT_UPDATE,
  USER_FETCH,
  USER_CREATE,
  USER_SEARCH_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  surname: '',
  phone: '',
  adress: '',
  identity: '',
  nick: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_UPDATE:
      return INITIAL_STATE;
    case USER_INPUT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_SEARCH_UPDATE:
      return { ...state, nick: action.payload.value };
    case USER_FETCH:
      return action.payload;
    case USER_CREATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
