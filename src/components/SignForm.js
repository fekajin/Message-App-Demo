/* eslint-disable max-len */
import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { userCreate, userInputUpdate, userDelete, signUser, emailChanged, passwordChanged } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

const myIcon = <Icon name="clipboard-account" size={50} color="blue" />;
const image = require('../images/sign.jpg');

class SignForm extends Component {

    oneEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onSaveButtonPress() {
        const { name, surname, phone, adress, nickname, email, password } = this.props;
        this.props.userCreate({ name, surname, phone, adress, nickname, email, password });
    }

    renderButtonSignIn() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={this.onSaveButtonPress.bind(this)}>
                Sign Up
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
                source={image}
                style={{ width: '100%', height: '100%' }}
            >
                <ScrollView>
                    <Card style={{ paddingLeft: 20 }}>
                        <CardSection>
                            <Input
                                keyboardType="default"
                                label="Name"
                                placeholder="Arif"
                                value={this.props.name}
                                onChangeText={value => this.props.userInputUpdate({ prop: 'name', value })}
                            />
                        </CardSection>

                        <CardSection>
                            <Input
                                keyboardType="default"
                                label="Surname"
                                placeholder="Erdem"
                                value={this.props.surname}
                                onChangeText={value => this.props.userInputUpdate({ prop: 'surname', value })}
                            />
                        </CardSection>

                        <CardSection>
                            <Input
                                keyboardType="numeric"
                                label="Phone"
                                placeholder="+90-555-333-44-99"
                                value={this.props.phone}
                                onChangeText={value => this.props.userInputUpdate({ prop: 'phone', value })}
                            />
                        </CardSection>

                        <CardSection>
                            <Input
                                keyboardType="default"
                                label="Adress"
                                placeholder="red street - no:7 / Manchester/ England"
                                value={this.props.adress}
                                onChangeText={value => this.props.userInputUpdate({ prop: 'adress', value })}
                            />
                        </CardSection>

                        <CardSection>
                            <Input
                                keyboardType="default"
                                label="Nickname"
                                placeholder="32265514182"
                                value={this.props.nickname}
                                onChangeText={value => this.props.userInputUpdate({ prop: 'nickname', value })}
                            />
                        </CardSection>

                        <Card>
                            <CardSection>
                                <Input
                                    keyboardType="default"
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
                                {myIcon}
                                {this.renderButtonSignIn()}
                            </CardSection>

                        </Card>
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

const mapStateToProps = ({ users, auth }) => {
    const { name, surname, phone, adress, nickname } = users;
    const { email, password, error, loading } = auth;
    return { name, surname, phone, adress, nickname, email, password, error, loading };
};

export default connect(mapStateToProps, { userInputUpdate, userCreate, userDelete, signUser, emailChanged, passwordChanged })(SignForm);
