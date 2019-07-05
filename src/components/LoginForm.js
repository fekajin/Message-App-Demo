/* eslint-disable react/self-closing-comp */
import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

const myIcon = <Icon name="cellphone-message" size={100} color="#900" />;
const imageLogin = require('../images/login.jpg');

class LoginForm extends Component {

    oneEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPressLogin() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    renderButtonLogin() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={this.onButtonPressLogin.bind(this)}>
                Login
        </Button>
        );
    }
    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white', opacity: 0.7 }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }


    render() {
        return (
            <ImageBackground
                source={imageLogin}
                style={{ width: '100%', height: '100%' }}
            >
                <ScrollView>
                        <View style={{ alignItems: 'center' }}>
                            {myIcon}
                        </View>
                        <Card >
                            <CardSection>
                                <Input
                                    label="Mail"
                                    placeholder="example@mail.com"
                                    onChangeText={this.oneEmailChange.bind(this)}
                                    value={this.props.email}
                                />
                            </CardSection>

                            <CardSection>
                                <Input
                                    keyboardType="default"
                                    secureTextEntry
                                    label="Password"
                                    placeholder='password'
                                    onChangeText={this.onPasswordChange.bind(this)}
                                    value={this.props.password}
                                />
                            </CardSection>
                            {this.renderError()}
                            <CardSection>
                                {this.renderButtonLogin()}
                            </CardSection>

                        </Card>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
