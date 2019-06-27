/* eslint-disable max-len */
/* eslint-disable prefer-template */

import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class MessageMainItem extends Component {
    onRowPress() {
        Actions.doctorForm({ fetch: this.props.fetch });
    }
    render() {
        const { name, surname } = this.props.fetch;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            { name + ' ' + surname } 
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
        color: '#1F73FC'
    }
};

export default MessageMainItem;
