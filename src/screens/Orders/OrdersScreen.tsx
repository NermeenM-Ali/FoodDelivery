import React, { Component } from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import colors from '../../assets/colors'
import Header from '../../components/Header'
import ordersData from '../../data/ordersData'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import { searchEnums } from '../Search/SearchScreen'
import OrdersCard from './OrdersComponents/OrdersCard'

interface OrdersScreenProps {
    navigation: any
}
interface OrdersScreenState {
    isRefresh: boolean
}
export default class OrdersScreen extends Component<OrdersScreenProps, OrdersScreenState> {
    constructor(props: OrdersScreenProps) {
        super(props)
        this.state = {
            isRefresh: false
        }
    }
    renderOrdersList() {
        let { navigation } = this.props
        let { isRefresh } = this.state
        return (
            <FlatList
                data={ordersData}
                renderItem={({ item, index }) => <OrdersCard item={item} index={index} navigation={navigation} />}
                keyExtractor={(_, index) => index.toString()}
                style={{ flex: 1, backgroundColor: colors.WHITE_COLOR }}
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
    render() {
        let { navigation } = this.props
        return (
            <View style={styles.container}>
                <Header headerTitle='Orders' screenType={searchEnums.FOR_ORDERS} hasSearchIcon navigation={navigation} />
                <View style={styles.recentOrdersContainer}>
                    <Text style={styles.recentOrdersTxt}>{"Recently Ordered"}</Text>
                </View>
                {this.renderOrdersList()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },
    recentOrdersContainer: {
        backgroundColor: colors.WHITE_COLOR,
        flexDirection: 'row',
        paddingVertical: verticalScale(10),
        justifyContent: 'flex-start',
        alignItems: 'center',
        elevation: 1,
        paddingHorizontal: scale(20),
        marginTop: verticalScale(15)
    },
    recentOrdersTxt: {
        color: colors.BLUE_COLOR,
        fontFamily: 'Poppins-Bold',
        fontSize: moderateScale(18),
        marginTop: verticalScale(8)
    },
})
