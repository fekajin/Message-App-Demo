/* eslint-disable camelcase */
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { userSearch, searchInputUpdate } from '../actions';
import { MessageMainItem } from './MessageMainItem';
import { CardSection, Input, Button } from './common';

const myIcon = <Icon name="account-search" size={30} color="blue" />;

class Search extends Component {

    onSearchChange(text) {
        this.props.searchInputUpdate(text);
    }

    UNSAFE_componentWillMount() {
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

    SearchUser() {
        const { nick } = this.props;
        console.log(nick);
        this.props.userSearch(nick);
    }

    renderRow(fetch) {
        return <MessageMainItem fetch={fetch} />;
    }

    render() {
        return (
            <View style={{ paddingTop: 15 }} >
                <CardSection>
                    <Input
                        keyboardType="default"
                        label="Nick"
                        placeholder="xxxArifxxx"
                        value={this.props.nick}
                        onChangeText={this.onSearchChange.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.SearchUser.bind(this)}>
                        {myIcon}  Search 
                    </Button>
                </CardSection>
                <ListView
                    enableEmptySections
                    dataSource={this.DataSource}
                    renderRow={this.renderRow}
                />
            </View>

        );
    }
}

const mapStateToProps = state => {
    const fetchs = _.map(state.fetchs, (val, uid) => ({ ...val, uid }));
    const { nick } = state.users;
    return { fetchs, nick };
};

export default connect(mapStateToProps,
    {
        userSearch,
        searchInputUpdate
    })(Search);
