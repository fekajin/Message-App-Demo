import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import _ from 'lodash';
import { fetchConversation } from '../actions';
import MessageWindowItem from './MessageWindowItem';

class MessageWindow extends Component {
    componentDidMount() {
        this.fetchConversation();
    }

    componentWillReceiveProps() {
        this.fetchConversation();
    }

    renderItem(personMessage) {
        return <MessageWindowItem message={personMessage} />;
    }

    render() {
        return (
            <FlatList
                data={this.props.data}
                extraData={this.state}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
            />
        );
    }
}

const mapStateToProps = state => {
    const personMessages = _.map(state.personMessages, (val, uid) => ({ ...val, uid }));
    return { personMessages };
    };

export default connect(mapStateToProps, { fetchConversation })(MessageWindow);
