import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import FetchReducer from './FetchReducer';

export default combineReducers({
    auth: AuthReducer,
    users: UserReducer,
    fetchs: FetchReducer
});
