/* eslint-disable camelcase */
import React, { Component, } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView, ImageBackground } from 'react-native';
import { messagesFetchByUser } from '../actions';
import MessageMainItem from './MessageMainItem';

const image = require('../images/mesaj.jpg');

class MessageMain extends Component {

    UNSAFE_componentWillMount() {
        this.props.messagesFetchByUser();
        this.createDataSource(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
        console.log('deneme');
    }
    createDataSource({ messages }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.DataSource = ds.cloneWithRows(messages);
    }
    renderRow(message) {
        return <MessageMainItem message={message} />;
    }

    render() {
        return (
            <ImageBackground
                source={image}
                style={{ width: '100%', height: '100%' }}
            >
                <ListView
                    enableEmptySections
                    dataSource={this.DataSource}
                    renderRow={this.renderRow}
                />
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    const messages = _.map(state.messages, (val, uid) => ({ val, uid }));
    console.log(messages);
    return { messages };
};

export default connect(mapStateToProps, { messagesFetchByUser })(MessageMain);
