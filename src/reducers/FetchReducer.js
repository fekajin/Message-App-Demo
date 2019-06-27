import {
    USER_SEARCH, MESSAGELIST_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_SEARCH:
            return action.payload;
        case MESSAGELIST_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

