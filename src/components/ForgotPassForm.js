import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, CardSection, Input, Button } from './common';
import { emailChanged } from '../actions';

const myIcon = <Icon name="key-change" size={100} color="#900" />;
const forgotImage = require('../images/forgot.jpg');

class ForgotPassForm extends Component {

    oneEmailChange(text) {
        this.props.emailChanged(text);
    }

    renderButtonForgot() {
        return (
        <Button>
            Change Password
        </Button>
        );
    }

    render() {
        return (
            <ImageBackground
            source={forgotImage}
            style={{ height: '100%', width: '100%' }}
            >
            <View style={{ alignItems: 'center' }}>
            {myIcon}
            </View>
            <Card>
                <CardSection>
                    <Input
                    label="Mail"
                    placeholder="example@mail.com"
                    onChangeText={this.oneEmailChange.bind(this)}
                    value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    {this.renderButtonForgot()}
                </CardSection>

            </Card>
            </ImageBackground>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged })(ForgotPassForm);
