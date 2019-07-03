/* eslint-disable max-len */
/* eslint-disable prefer-template */

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from './common';

class MessageWindowItem extends Component {

    renderRow() {
        const { count, messageText } = this.props.message;
        if (count === 0) {
            return (
                <Text style={styles.ownerStyle}>
                    {messageText}
                </Text>
            );
        }
            return (
                <Text style={styles.guestStyle}>
                    {messageText}
                </Text>
            );
    }

    render() {
        return (
            <View>
                <CardSection>
                    {this.renderRow()}
                </CardSection>
            </View>
        );
    }
}

const styles = {
    ownerStyle: {
        fontSize: 25,
        paddingLeft: 50,
        color: '#1F73FC'
    },

    guestStyle: {
        fontSize: 25,
        paddingRight: 50,
        color: 'white'
    }
};

export default MessageWindowItem;
