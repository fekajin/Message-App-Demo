/* eslint-disable camelcase */
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { messagesFetchByUser } from '../actions';
import { MessageMainItem } from './MessageMainItem';


class MessageMain extends Component {

    UNSAFE_componentWillMount() {
        this.props.messagesFetchByUser();
        this.createDataSource(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }
    createDataSource({ fetchs }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.DataSource = ds.cloneWithRows(fetchs);
    }
    renderRow(fetch) {
        return <MessageMainItem fetch={fetch} />;
    }

    render() {
        return (
           <ListView
           enableEmptySections
           dataSource={this.DataSource}
           renderRow={this.renderRow}
           />
        );
    }
}

const mapStateToProps = state => {
    const fetchs = _.map(state.fetchs, (val, uid) => ({ ...val, uid }));
    return { fetchs };
    };

export default connect(mapStateToProps, { messagesFetchByUser })(MessageMain);
