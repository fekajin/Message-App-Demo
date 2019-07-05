/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, TextInput, KeyboardAvoidingView, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import {
    fetchConversation,
    messageUpdate,
    sendMessageToMe,
    sendMessageToThem,
    userFetch
} from '../actions';
import { Spinner } from './common';

const imageSea = require('../images/resim.jpg');

const replyIcon = <Icon name={'reply'} size={35} color={'green'} />;

class MessageWindow extends Component {

    constructor(props) {
        super(props);
        if (this.props.fetch === undefined) {
            const { uid } = this.props.mainMessage;
            this.props.fetchConversation(uid);
        } else {
            const { id } = this.props.fetch;
            this.props.fetchConversation(id);
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

            <TouchableOpacity onPress={this.onButtonPressSend.bind(this)} >
                {replyIcon}
            </TouchableOpacity>
        );
    }

    render() {
        const { inputStyle } = styles;
        return (
            <ImageBackground
                source={imageSea}
                style={{ width: '100%', height: '100%' }}
            >
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
                    <View style={styles.writeBoxStyle}>
                        <TextInput
                            keyboardType="default"
                            placeholder="xxxArifxxx"
                            autoCorrect={false}
                            style={inputStyle}
                            multiline
                            numberOfLines={4}
                            value={this.props.message}
                            allowFontScaling={false}
                            onChangeText={this.updateMessage.bind(this)}
                            onFocus={() => { this.getKeyboard(); }}
                        />
                        {this.renderSendButton()}
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = {
    ownerViewStyle: {
        borderTopColor: 'purple',
        borderWidth: 1,
        borderRadius: 12,
        marginLeft: 50,
        marginRight: 5,
        marginBottom: 7,
        alignItems: 'center',
        opacity: 0.6,
        backgroundColor: '#85DCFF'
    },

    guestViewStyle: {
        borderTopColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        marginRight: 50,
        marginLeft: 5,
        marginBottom: 7,
        alignItems: 'center',
        opacity: 0.6,
        backgroundColor: 'pink'
    },

    ownerTextStyle: {
        fontSize: 20,
        padding: 5,
        color: 'rgb(0,0,0)',
        borderRadius: 15,
        borderColor: '#1F73FC',
        opacity: 1,
        fontWeight: 'bold'
    },

    guestTextStyle: {
        fontSize: 20,
        padding: 5,
        color: 'rgb(0,0,0)',
        borderRadius: 15,
        borderColor: 'black',
        fontWeight: 'bold',
        opacity: 1
    },

    writeBoxStyle: {
        flex: 1.4,
        flexDirection: 'row',
        backgroundColor: '#47DCE8',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 15
    },

    inputStyle: {
        color: 'blue',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 15,
        lineHeight: 13,
        flex: 7.5,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'green',
        fontWeight: 'bold'
    },

    buttonStyle: {
        borderColor: 'green',
        borderWidth: 3,
        borderRadius: 20
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
