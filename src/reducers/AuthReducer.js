/* eslint-disable max-len */
import { EMAIL_CHANGED,
   PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
     LOGIN_USER_UNSUCCESS, 
     LOGIN_USER, 
     SIGN_USER, 
     SIGN_USER_SUCCESS
    } from '../actions/types';

const INITIAL_STATE = { email: 'example@mail.com', password: 'celal1997', user: null, error: ' ', loading: false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
          return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
          return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
          return { ...state, ...INITIAL_STATE, user: action.payload, error: '' };
        case LOGIN_USER_UNSUCCESS:
          return { ...state, error: 'İşlem Başarısız!', password: '', loading: false };
        case LOGIN_USER:
          return { ...state, loading: true, error: '' };
        case SIGN_USER:
          return { ...state, loading: true, error: '' };
          case SIGN_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, user: action.payload, error: '' };
        default:
         return state;
    }
};
