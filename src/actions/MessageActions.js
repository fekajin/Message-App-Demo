/* eslint-disable arrow-body-style */
import firebase from 'firebase';
import {
    MESSAGELIST_FETCH_SUCCESS,
    CONVERSATION_FETCH_SUCCESS,
    SEND_MESSAGE_ME,
    SEND_MESSAGE_THEM,
    SEND_MESSAGE_ERROR,
    MESSAGE_UPDATE,
    SENDING_MESSAGE
}
    from './types';

export const messageUpdate = (text) => {
    return {
        type: MESSAGE_UPDATE,
        payload: text
    };
};

export const messagesFetchByUser = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/app/userMessages/${currentUser.uid}`)
            .on('value', snapshot => {
                dispatch({ type: MESSAGELIST_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const fetchConversation = (otherUserId) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/app/conversations/${currentUser.uid}/${otherUserId}`)
            .on('value', snapshot => {
                dispatch({ type: CONVERSATION_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const sendMessageToMe = (otherUserId, message, time, nickname) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: SENDING_MESSAGE });
        firebase.database().ref(`/app/conversation/${currentUser.uid}/${otherUserId}`)
            .push(message, time, currentUser.uid)
            .then(() => {
                dispatch({ type: SEND_MESSAGE_ME });
            })
            .catch(() => {
                dispatch({ type: SEND_MESSAGE_ERROR });
            });
        firebase.database().ref(`/app/userMessages/${currentUser.uid}/${otherUserId}`)
            .set(nickname);
    };
};

export const sendMessageToThem = (otherUserId, message, time, nickname) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        dispatch({ type: SENDING_MESSAGE });
        firebase.database().ref(`/app/conversation/${otherUserId}/${currentUser.uid}`)
            .push(message, time, currentUser.uid)
            .then(() => {
                dispatch({ type: SEND_MESSAGE_THEM });
            })
            .catch(() => {
                dispatch({ type: SEND_MESSAGE_ERROR });
            });
        firebase.database().ref(`/app/userMessages/${otherUserId}/${currentUser.uid}`)
            .set(nickname);
    };
};
