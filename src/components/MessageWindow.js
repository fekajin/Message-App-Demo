/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import {
    fetchConversation,
    messageUpdate,
    sendMessageToMe,
    sendMessageToThem,
    userFetch,
    previousScene
} from '../actions';
import { CardSection, Input, Spinner, Button } from './common';
import MessageWindowItem from './MessageWindowItem';

class MessageWindow extends Component {
    componentDidMount() {
        this.props.previousScene(Actions.prevScene);
        console.log(Actions.prevScene);
    }

    onButtonPressSend() {
        const { message, prevScene } = this.props;
        if (prevScene === 'message') {
            console.log('if düştü');
            const { uid, val } = this.props.mainMessage;
            this.props.sendMessageToThem(uid, message, this.props.nickname);
            this.props.sendMessageToMe(uid, message, val);
        } else {
            console.log('else düştü');
            const { id, nickname } = this.props.fetch;
            this.props.sendMessageToThem(id, message, this.props.nickname);
            this.props.sendMessageToMe(id, message, nickname);
        }
    }

    getData() {
        const { personMessages } = this.props;
        const tempData = [];

        // personMessages.slice(-5);
        for (let i = personMessages.length; i >= 0; i--) {
            if (i > (personMessages.length - 5)) {
                tempData.push(personMessages[i]);
            }
        }
        return tempData;
    }

    updateMessage(text) {
        this.props.messageUpdate(text);
    }

    _listEmptyComponent = () => {
        return (
            <View>
                <Text>merhaba</Text>
            </View>
        );
    }

    UNSAFE_componentWillMount() {
        this.props.fetchConversation();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.props.fetchConversation();
        this.getData(nextProps);
    }


    renderItem(personMessage) {
        return <MessageWindowItem message={personMessage} />;
    }

    renderSendButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={this.onButtonPressSend.bind(this)}>
                send
        </Button>
        );
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.getData()}
                    extraData={this.props.personMessages}
                    keyExtractor={(index) => `key${index}`}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.listEmptyComponent}
                />
                <View>
                    <CardSection>
                        <Input
                            keyboardType="default"
                            placeholder="xxxArifxxx"
                            value={this.props.message}
                            onChangeText={this.updateMessage.bind(this)}
                        />
                        {this.renderSendButton()}
                    </CardSection>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const personMessages = _.map(state.personMessages, (val, uid) => ({ ...val, uid }));
    const { time, loading, message, otherUserId, prevScene } = state.sendMessages;
    const { nickname } = state.users;
    return { personMessages, time, loading, message, otherUserId, nickname, prevScene };
};

export default connect(mapStateToProps,
    {
        fetchConversation,
        messageUpdate,
        sendMessageToMe,
        sendMessageToThem,
        userFetch,
        previousScene
    })(MessageWindow);
