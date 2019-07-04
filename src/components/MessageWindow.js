/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import {
    fetchConversation,
    messageUpdate,
    sendMessageToMe,
    sendMessageToThem,
    userFetch
} from '../actions';
import { Spinner, Button } from './common';

const replyIcon = <Icon name={'reply'} size={35} color={'green'} />;

class MessageWindow extends Component {

    constructor(props) {
        super(props);
        if (this.props.fetch === undefined) {
            this.props.fetchConversation(this.props.mainMessage.uid);
        } else {
            this.props.fetchConversation(this.props.fetch.id);
        }
        this.props.userFetch();
    }

    onButtonPressSend() {
        const { message } = this.props;
        if (this.props.fetch === undefined) {
            const { uid, val } = this.props.mainMessage;
            this.props.sendMessageToThem(uid, message, this.props.nickname);
            this.props.sendMessageToMe(uid, message, val);
        } else {
            const { id, nickname } = this.props.fetch;
            this.props.sendMessageToThem(id, message, this.props.nickname);
            this.props.sendMessageToMe(id, message, nickname);
        }
    }

    // getData() {
    //     const { personMessages } = this.props;
    //     const tempData = [];

    //     // personMessages.slice(-5);
    //     for (let i = personMessages.length; i >= 0; i--) {
    //         if (i > (personMessages.length - 5)) {
    //             tempData.push(personMessages[i]);
    //         }
    //     }
    //     return tempData;
    // }

    getKeyboard() {
        console.log('triggered');
        return '60';
    }

    updateMessage(text) {
        this.props.messageUpdate(text);
    }

    _listEmptyComponent = () => {
        return (
            <View>
                <Text>  Hadi Merhaba Yaz!</Text>
            </View>
        );
    }

    renderItem({ item }) {
        if (item.count === 1) {
            return (
                <View onLayout={() => console.log(this)} style={styles.ownerViewStyle}>
                    <Text style={styles.ownerTextStyle} >{item.message}</Text>
                </View>
            );
        }
        return (
            <View style={styles.guestViewStyle}>
                <Text style={styles.guestTextStyle} >{item.message}</Text>
            </View>
        );
    }

    renderSendButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={this.onButtonPressSend.bind(this)}>
                {replyIcon}
            </Button>
        );
    }

    render() {
        const { inputStyle } = styles;
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} >
                <View style={{ flex: 9 }}>
                    <FlatList
                        data={this.props.personMessages}
                        extraData={this.props.personMessages}
                        keyExtractor={(index, key) => `${index}${key}`}
                        ListEmptyComponent={this.listEmptyComponent}
                        renderItem={this.renderItem}
                        ref={ref => this.flatList = ref}
                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                        onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                    />
                </View>
                <View style={{ flex: 1.4, flexDirection: 'row', paddingBottom: 5, paddingLeft: 5, paddingTop: 5 }}>
                    <TextInput
                        keyboardType="default"
                        placeholder="xxxArifxxx"
                        autoCorrect={false}
                        style={inputStyle}
                        value={this.props.message}
                        onChangeText={this.updateMessage.bind(this)}
                        onFocus={() => { this.getKeyboard(); }}
                    />
                    {this.renderSendButton()}
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = {
    ownerViewStyle: {
        borderTopColor: 'purple',
        borderWidth: 1,
        borderRadius: 12,
        marginLeft: 50,
        marginBottom: 4,
        alignItems: 'center',
    },

    guestViewStyle: {
        borderTopColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        marginRight: 50,
        marginBottom: 4,
        alignItems: 'center'
    },

    ownerTextStyle: {
        fontSize: 20,
        padding: 5,
        color: '#1F73FC',
        borderRadius: 15,
        borderColor: '#1F73FC'
    },

    guestTextStyle: {
        fontSize: 20,
        padding: 5,
        color: 'black',
        borderRadius: 15,
        borderColor: 'black'
    },

    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 15,
        lineHeight: 23,
        flex: 7.5,
        borderWidth: 0.7,
        borderRadius: 5,
        borderColor: 'green'
    }
};

const mapStateToProps = state => {
    const personMessages = _.map(state.personMessages, (val, uid) => ({ ...val, uid }));
    const { time, loading, message, otherUserId } = state.sendMessages;
    const { nickname } = state.users;
    return { personMessages, time, loading, message, otherUserId, nickname };
};

export default connect(mapStateToProps,
    {
        fetchConversation,
        messageUpdate,
        sendMessageToMe,
        sendMessageToThem,
        userFetch
    })(MessageWindow);
