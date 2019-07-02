import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import _ from 'lodash';
import { fetchConversation } from '../actions';
import { CardSection, Input } from './common';
import MessageWindowItem from './MessageWindowItem';


class MessageWindow extends Component {
    componentDidMount() {
        this.fetchConversation();
    }

    componentWillReceiveProps() {
        this.fetchConversation();
    }

    getData() {
        const { personMessages } = this.props;
        const tempData = [];
        for (let i = personMessages.length; i >= 0; i--) {
            if (i > (personMessages.length - 5)) {
                tempData.push(personMessages[i]);
            }
        }
        return tempData;
    }

    renderItem(personMessage) {
        return <MessageWindowItem message={personMessage} />;
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.getData()}
                    extraData={this.props.personMessages}
                    renderItem={this.renderItem}
                />
                <View>
                    <CardSection>
                        <Input
                            keyboardType="default"
                            placeholder="xxxArifxxx"
                            value={this.props.fetch.nickname}
                            onChangeText={this.onSearchChange.bind(this)}
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
    return { personMessages };
};

export default connect(mapStateToProps, { fetchConversation })(MessageWindow);
