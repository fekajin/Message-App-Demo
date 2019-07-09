/* eslint-disable max-len */
/* eslint-disable prefer-template */
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CardSection } from './common';

const myIcon = <Icon name="tooltip-account" size={50} color="blue" />;

class SearchMainItem extends Component {
    onRowPress() {
        const { nickname } = this.props.fetch;
        Actions.messageWindow({ fetch: this.props.fetch, title: nickname }); //id nickname phone uid
    }
    renderUser() {
        const { nickname } = this.props.fetch;
        if (this.props.fetch !== 'ben') {
            return (
                <CardSection>
                    {myIcon}
                    <Text style={styles.titleStyle}>
                        {nickname}
                    </Text>
                </CardSection>
            );
        }
    }
    render() {
        return (
            <ScrollView>
                <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                    <View>
                        {this.renderUser()}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
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

export default SearchMainItem;
