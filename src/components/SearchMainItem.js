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
        Actions.messageWindow({ fetch: this.props.fetch }); //id nickname phone uid
        console.log('fetch', this.props.fetch);
    }
    render() {
        const { nickname } = this.props.fetch;

        return (
            <ScrollView>
                <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                    <View>
                        <CardSection>
                            {myIcon}
                            <Text style={styles.titleStyle}>
                                {nickname}
                            </Text>
                        </CardSection>
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
