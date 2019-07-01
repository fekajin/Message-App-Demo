import {
    USER_SEARCH
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_SEARCH:
            return action.payload;
        default:
            return state;
    }
};

