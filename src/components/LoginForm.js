/* eslint-disable react/self-closing-comp */
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

const myIcon = <Icon name="cellphone-message" size={100} color="#900" />;

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
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }


    render() {
        return (
            <ScrollView>
                <View>
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
                </View>
            </ScrollView>
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
