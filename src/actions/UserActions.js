/* eslint-disable arrow-body-style */
/* eslint-disable max-len */

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    USER_UPDATE,
    USER_INPUT_UPDATE,
    USER_FETCH, USER_CREATE,
    LOGIN_USER_UNSUCCESS,
    SIGN_USER,
    USER_SEARCH,
    USER_SEARCH_UPDATE,
    LOGIN_USER_SUCCESS
} from './types';


export const userInputUpdate = ({ prop, value }) => ({
    type: USER_INPUT_UPDATE,
    payload: { prop, value }
});

export const searchInputUpdate = (value) => {
    return {
        type: USER_SEARCH_UPDATE,
        payload: value
    };
};

export const userFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/app/users/${currentUser.uid}`)
            .on('value', snapshot => {
                dispatch({ type: USER_FETCH, payload: snapshot.val() });
            });
    };
};

export const userUpdate = ({ name, surname, phone, adress, nickname }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/app/users/${currentUser.uid}`)
            .set({ name, surname, phone, adress, nickname })
            .then(() => {
                dispatch({ type: USER_UPDATE });
                Actions.main();
            });
    };
};

export const userCreate = ({ name, surname, phone, adress, nickname, email, password }) => (dispatch) => {
    dispatch({ type: SIGN_USER });
    if (email === '' || name === '' || phone === '' || adress === '' || nickname === '' || email === '' || password === '') {
        loginUserFl(dispatch);
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                const { currentUser } = firebase.auth();
                firebase.database().ref(`/app/users/${currentUser.uid}`)
                    .set({ name, surname, phone, adress, nickname })
                    .then(() => {
                        const id = currentUser.uid;
                        firebase.database().ref('/app/userNicks')
                            .push({ nickname, phone, id })
                            .then(() => {
                                firebase.database().ref(`/app/userLog/${currentUser.uid}`)
                                    .set({ email, password });
                                dispatch({ type: USER_CREATE });
                                dispatch({ type: LOGIN_USER_SUCCESS });
                                Actions.main();
                            });
                    })
                    .catch(() =>
                        dispatch({ type: LOGIN_USER_UNSUCCESS })
                    );
            });
    }
};

export const userSearch = () => (dispatch) => {
    firebase.database().ref('/app/userNicks')
        .on('value', snapshot => {
            console.log(snapshot.val());
            dispatch({ type: USER_SEARCH, payload: snapshot.val() });
        });
};

const loginUserFl = (dispatch) => {
    dispatch({ type: LOGIN_USER_UNSUCCESS });
};


export const userDelete = () => {
    const { currentUser } = firebase.auth();
    return () => {
        firebase.database().ref(`/app/users/${currentUser.uid}`)
            .remove();
    };
};

