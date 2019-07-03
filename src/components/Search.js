/* eslint-disable camelcase */
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { userSearch, searchInputUpdate } from '../actions';
import SearchMainItem from './SearchMainItem';
import { CardSection, Input, Button } from './common';

const myIcon = <Icon name="account-search" size={30} color="blue" />;

class Search extends Component {

    // componentDidUpdate() {
    //     const { fetchs } = this.props;
    //     this.createDataSource(fetchs);
    //     this.renderRow();
    // }
    componentDidMount() {
        console.log(Actions.currentScene);
    }

    onSearchChange(text) {
        this.props.searchInputUpdate(text);
    }

    UNSAFE_componentWillMount() {
        this.createDataSource(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
        console.log(nextProps);
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
        console.log(data);
        return <SearchMainItem fetch={data} />;
    }

    render() {
        return (
            <View style={{ paddingTop: 15 }} >
                <CardSection>
                    <Input
                        keyboardType="default"
                        label="Nick Name  :"
                        placeholder="xxxArifxxx"
                        value={this.props.nickname}
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
    const { nickname } = state.users;
    return { fetchs, nickname };
};

export default connect(mapStateToProps,
    {
        userSearch,
        searchInputUpdate
    })(Search);
