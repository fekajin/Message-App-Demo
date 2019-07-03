/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginForm from './components/LoginForm';
import SignForm from './components/SignForm';
import ForgotPassForm from './components/ForgotPassForm';
import Search from './components/Search';
import MessageMain from './components/MessageMain';
import Settings from './components/Settings';
import MessageWindow from './components/MessageWindow';

const myIcon = <Icon name="clipboard-account" size={30} color="blue" />;

const RouterComponent = () => (

    <Router>
        <Scene
            key="root"
            title="Message App"
            titleStyle={{
                fontSize: 25,
            }}
            headerLayoutPreset='center'
            activeBackgroundColor="gray"
            activeTintColor="white"
            labelStyle={{ fontSize: 15, paddingBottom: 5 }}
            tabBarStyle={{ borderWidth: 10, borderRadius: 15, borderColor: 'white' }}
        >
            <Scene
                key='LogIn'
                initial
                tabs
                headerMode='none'
                hideNavBar
                type='replace'
            >
                <Scene key="Login">
                    <Scene
                        key="loginScreen"
                        component={LoginForm}
                        initial
                        hideNavBar={false}
                    />
                </Scene>
                <Scene key="SignUp">
                    <Scene
                        key="signUpScreen"
                        component={SignForm}
                        icon={myIcon}
                    />
                </Scene>

                <Scene key="ForgotPassword">
                    <Scene
                        key="loginScreen"
                        component={ForgotPassForm}
                    />
                </Scene>

            </Scene>

            <Scene
                headerMode='none'
                key="main"
                tabs
                hideNavBar
            >
                <Scene
                    key="Message"
                    tabBarLabel='Main Screen'
                    hideNavBar={false}
                >
                    <Scene
                        key="messageScreen"
                        component={MessageMain}
                    />
                </Scene>

                <Scene
                    key="Search"
                    tabBarLabel='Search'
                >
                    <Scene
                        key="searchScreen"
                        component={Search}
                        hideNavBar={false}
                    />
                </Scene>

                <Scene
                    key="Settings"
                    tabBarLabel='Settings'
                >
                    <Scene
                        key="settingsScreen"
                        component={Settings}
                    />
                </Scene>
            </Scene>

            <Scene
                key="messageWindow"
                component={MessageWindow}
            />

        </Scene>
    </Router>
);

export default RouterComponent;

