import firebase from 'firebase';
import {
    MESSAGELIST_FETCH_SUCCESS,
    CONVERSATION_FETCH_SUCCESS
}
    from './types';

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

