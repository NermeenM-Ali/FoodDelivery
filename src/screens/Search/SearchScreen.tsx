import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, Keyboard, FlatList } from 'react-native'
import colors from '../../assets/colors'
import CardTextInput from '../../components/CardTextInput'
import Header from '../../components/Header'
import ordersData from '../../data/ordersData'
import RestaurantData from '../../data/RestaurantData'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import RestaurantCard from '../Home/HomeComponents/RestaurantCard'
import OrdersCard from '../Orders/OrdersComponents/OrdersCard'

export enum searchEnums { FOR_RESTAURANTS, FOR_ORDERS }
interface SearchScreenProps {
    navigation: any
    route: {
        params: {
            searchType: searchEnums
        }
    }
}
interface SearchScreenState {
    searchResultList: any[]
    searchVal: any
    isRefresh: boolean
}

export default class SearchScreen extends Component<SearchScreenProps, SearchScreenState>{
    constructor(props: SearchScreenProps) {
        super(props)
        this.state = {
            searchResultList: [],
            searchVal: null,
            isRefresh: false
        }
    }
    renderResultList() {
        let { searchResultList, isRefresh } = this.state
        let { navigation, route } = this.props
        let { searchType } = route.params
        return (
            <FlatList
                data={searchResultList}
                renderItem={({ item, index }) => searchType === searchEnums.FOR_RESTAURANTS ? <RestaurantCard item={item} index={index} navigation={navigation} /> :
                    <OrdersCard item={item} index={index} navigation={navigation} />}
                keyExtractor={(_, index) => index.toString()}
                style={{ flex: 1, marginTop: verticalScale(20) }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginHorizontal: scale(5), alignSelf: 'center' }}
                refreshing={isRefresh}
                onRefresh={() => {
                    this.setState({ isRefresh: true }, () => {
                        /* regreshList */
                        setTimeout(() => { this.setState({ isRefresh: false }) }, 2000)
                    })
                }} />
        )
    }

    renderEmptyView() {
        return (
            <View style={styles.emptyView}>
                <Text style={styles.emptyTxt}>No Result Yet !</Text>
            </View>
        )
    }

    renderSearchInput() {
        let { searchType } = this.props.route.params
        let { searchVal } = this.state
        return (
            <CardTextInput
                value={searchVal}
                onChangeText={(val: any) => this.setState({ searchVal: val }, () => {
                    this.applySearch(val, searchType)
                })}
                withBorders
                placeHolder={'Restaurant name or Order name..'}
                keyboardType='default'
                iconName='search'
                onSubmitEditing={() => {
                    Keyboard.dismiss()
                    this.applySearch(searchVal, searchType)
                }} />
        )
    }
    applySearch = (searchVal: any, searchType: searchEnums) => {
        let data = [];
        let filteredName = searchVal ? searchVal.toLowerCase() : null
        if (searchVal !== "" || searchVal !== null || searchVal.length >= 3) {
            if (searchType === searchEnums.FOR_RESTAURANTS) {
                data = RestaurantData.filter((item: any) => item.name.toLowerCase().match(filteredName))
                this.setState({ searchResultList: data })
            } else if (searchType === searchEnums.FOR_ORDERS) {
                data = ordersData.filter((item: any) => item.name.toLowerCase().match(filteredName))
                this.setState({ searchResultList: data })
            }
        } else {
            this.setState({ searchResultList: [], searchVal: null })
        }
    }
    render() {
        let { navigation } = this.props
        let { searchResultList } = this.state
        return (
            <View style={styles.container}>
                <Header headerTitle='Search' hasBackIcon navigation={navigation} />
                {this.renderSearchInput()}
                {
                    searchResultList.length ?
                        this.renderResultList() :
                        this.renderEmptyView()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR,
    },
    emptyView: {
        alignSelf: 'center',
        marginTop: verticalScale(350)
    },
    emptyTxt: {
        fontSize: moderateScale(16),
        fontFamily: 'Poppins-Regular',
        color: colors.LIGHT_GRAY_COLOR
    }
})
