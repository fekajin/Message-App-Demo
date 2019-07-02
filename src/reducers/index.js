import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import UserFetchReducer from './UserFetchReducer';
import MessageListReducer from './MessageListReducer';
import PersonMessageReducer from './PersonMessageReducer';
import SendMessageReducer from './SendMessageReducer';

export default combineReducers({
    auth: AuthReducer,
    users: UserReducer,
    fetchs: UserFetchReducer,
    messages: MessageListReducer,
    personMessages: PersonMessageReducer,
    sendMessages: SendMessageReducer
});
