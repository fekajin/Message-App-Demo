import {
    SEND_MESSAGE_ERROR,
    SEND_MESSAGE_ME,
    SEND_MESSAGE_THEM,
    MESSAGE_UPDATE,
    SENDING_MESSAGE
} from '../actions/types';

const INITIAL_STATE = {
    message: '',
    otherUserId: '',
    time: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MESSAGE_UPDATE:
            return { ...state, message: action.payload };
        case SEND_MESSAGE_ERROR:
            return { ...state, message: '', time: '', loading: false };
        case SEND_MESSAGE_THEM:
            return INITIAL_STATE;
        case SEND_MESSAGE_ME:
            return INITIAL_STATE;
        case SENDING_MESSAGE:
            return { ...state, loading: true };
        default:
            return state;
    }
};

