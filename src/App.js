/* eslint-disable react/self-closing-comp */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';


class App extends Component {
    componentDidMount() {
        const config = {
            apiKey: 'AIzaSyB8T_kO6nMlIrUxFqQGx8O3puSEiAofg14',
            authDomain: 'message-b6bd5.firebaseapp.com',
            databaseURL: 'https://message-b6bd5.firebaseio.com',
            projectId: 'message-b6bd5',
            storageBucket: '',
            messagingSenderId: '511582843195',
            appId: '1:511582843195:web:d07484c3f4d644ee'
        };

        firebase.initializeApp(config);
    }
    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Router />
            </Provider>
        );
    }
}


export default App;
