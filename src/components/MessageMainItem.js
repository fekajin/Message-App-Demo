/* eslint-disable max-len */
/* eslint-disable prefer-template */

import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

const userIcon = <Icon name="user" size={35} color="black" />;

class MessageMainItem extends Component {
    onRowPress() {
        const { message } = this.props;
        Actions.messageWindow({ mainMessage: message, title: message.val }); // val: nickname , uid
    }
    render() {
        const { val } = this.props.message;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View style={styles.viewStyle}>
                    <CardSection>
                        {userIcon}
                        <Text style={styles.titleStyle}>
                            { val } 
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 25,
        paddingLeft: 15,
        color: '#1F73FC',
        marginLeft: 20,
        marginRight: 40
    },
    viewStyle: {
        paddingTop: 12,
        alignItems: 'center'
    }
};

export default MessageMainItem;
