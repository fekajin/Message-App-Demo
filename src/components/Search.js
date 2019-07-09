/* eslint-disable camelcase */
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView, View, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { userSearch, searchInputUpdate, userFetch } from '../actions';
import SearchMainItem from './SearchMainItem';
import { CardSection, Input, Button } from './common';

const myIcon = <Icon name="account-search" size={30} color="blue" />;
const imageSearch = require('../images/search.jpg');

class Search extends Component {

    onSearchChange(text) {
        this.props.searchInputUpdate(text);
    }

    UNSAFE_componentWillMount() {
        this.props.userFetch();
        this.createDataSource(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource(data) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.DataSource = ds.cloneWithRows(data.fetchs);
    }

    SearchUser() {
        this.props.userSearch();
    }

    renderRow(data) {
        if (this.props.nickname === data.nickname) {
            return <SearchMainItem fetch='ben' />;
        } 
            return <SearchMainItem fetch={data} />;
    }

    render() {
        return (
            <ImageBackground
                source={imageSearch}
                style={{ width: '100%', height: '100%' }}
            >
                <View style={{ paddingTop: 15 }} >
                    <CardSection>
                        <Input
                            keyboardType="default"
                            label="Nick Name  :"
                            placeholder="xxxArifxxx"
                            value={this.props.searchName}
                            onChangeText={this.onSearchChange.bind(this)}
                        />
                    </CardSection>
                    <CardSection style={{ marginTop: 10, margin: 100, marginBottom: 20 }}>
                        <Button onPress={this.SearchUser.bind(this)}>
                            {myIcon}  Search
                    </Button>
                    </CardSection>
                    <ListView
                        enableEmptySections
                        dataSource={this.DataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    const fetchs = _.map(state.fetchs, (val, uid) => ({ ...val, uid }));
    const { nickname, searchName } = state.users;
    return { fetchs, nickname, searchName };
};

export default connect(mapStateToProps,
    {
        userSearch,
        searchInputUpdate,
        userFetch
    })(Search);
