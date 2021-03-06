/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    userUpdate,
    userInputUpdate,
    userDelete,
    userFetch
} from '../actions';
import { Card, CardSection, Input, Button } from './common';

const imageSettings = require('../images/settings.jpg');

class UserInfo extends Component {

    componentDidMount() {
        this.props.userFetch();
    }

    onSaveButtonPress() {
        const { name, surname, phone, adress, nickname } = this.props;
        this.props.userDelete();
        this.props.userUpdate({ name, surname, phone, adress, nickname });
    }

    onExitButtonPress() {
        Actions.LogIn();
    }


    render() {
        return (
            <ImageBackground
                source={imageSettings}
                style={{ width: '100%', height: '100%' }}
            >
                <Card backgroundColor={'blue'}>
                    <CardSection>
                        <Input
                            label="Name"
                            placeholder="Arif"
                            value={this.props.name}
                            onChangeText={value => this.props.userInputUpdate({ prop: 'name', value })}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            label="Surname"
                            placeholder="Erdem"
                            value={this.props.surname}
                            onChangeText={value =>
                                this.props.userInputUpdate({
                                    prop: 'surname', value
                                })}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            label="Phone"
                            placeholder="+90-555-333-44-99"
                            value={this.props.phone}
                            onChangeText={value => this.props.userInputUpdate({ prop: 'phone', value })}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            label="Adress"
                            placeholder="red street - no:7 / Manchester/ England"
                            value={this.props.adress}
                            onChangeText={value =>
                                this.props.userInputUpdate({
                                    prop: 'adress', value
                                })}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            label="Nickname"
                            placeholder="5335566450"
                            value={this.props.nickname}
                            onChangeText={value =>
                                this.props.userInputUpdate({
                                    prop: 'nickname', value
                                })}
                        />
                    </CardSection>

                    <CardSection>
                        <Button onPress={this.onSaveButtonPress.bind(this)}>
                            Save Info
                       </Button>
                    </CardSection>
                </Card>
                <CardSection style={{ marginTop: 160, margin: 100, opacity: 0.7, backgroundColor: 'black', borderRadius: 20 }} >
                    <Button onPress={this.onExitButtonPress.bind(this)}>
                        Exit
                       </Button>
                </CardSection>
            </ImageBackground>
        );
    }
}


const mapStateToProps = (state) => {
    const { name, surname, phone, adress, nickname } = state.users;
    return { name, surname, phone, adress, nickname };
};

export default connect(mapStateToProps, {
    userInputUpdate,
    userUpdate,
    userDelete,
    userFetch
})(UserInfo);
