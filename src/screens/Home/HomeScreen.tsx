import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { getCurrentLocation } from '../../redux/actions/LocationAction'
import colors from '../../assets/colors'
import Header from '../../components/Header'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import ImageCard from './HomeComponents/ImageCard'
import ImgsData from '../../data/ImgsData'
import RestaurantCard from './HomeComponents/RestaurantCard'
import RestaurantData from '../../data/RestaurantData'
import { searchEnums } from '../Search/SearchScreen'


interface HomeScreenProps {
    navigation: any
    getCurrentLocation: any
    getHomeImagesSwiper: any
    formattedAddress: string

}
interface HomeScreenState {
    isRefresh: boolean
}

class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
    constructor(props: HomeScreenProps) {
        super(props)
        this.state = {
            isRefresh: false
        }
    }
    componentDidMount() {
        let { getCurrentLocation, } = this.props
        getCurrentLocation()

    }

    renderAddressSection() {
        let { formattedAddress } = this.props
        return (
            <View style={styles.addressContainer}>
                <MaterialCommunityIcons name="google-maps" size={18} color={colors.MAIN_COLOR} style={{ alignSelf: 'center' }} />
                <Text style={styles.addressTxt}>{formattedAddress}</Text>
            </View>
        )
    }

    renderImagesSection() {
        return (
            <View style={styles.swiperImgs}>
                <FlatList
                    horizontal
                    data={ImgsData}
                    scrollEnabled={true}
                    keyExtractor={(_, index) => index.toString()}
                    style={{ marginHorizontal: scale(15) }}
                    renderItem={({ item, index }) => <ImageCard item={item} index={index} />} />
            </View>
        )
    }

    renderRestaurantSection() {
        let { isRefresh } = this.state
        let { navigation } = this.props
        return (
            <FlatList
                data={RestaurantData}
                renderItem={({ item, index }) => <RestaurantCard item={item} index={index} navigation={navigation} />}
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
    render() {
        let { navigation } = this.props
        return (
            <View style={styles.container}>
                <Header headerTitle='Home' screenType={searchEnums.FOR_RESTAURANTS}
                    hasSearchIcon hasDrawerIcon navigation={navigation} />
                {this.renderAddressSection()}
                {this.renderImagesSection()}
                {this.renderRestaurantSection()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR,
    },
    addressContainer: {
        backgroundColor: colors.SHADOW_COLOR,
        flexDirection: 'row',
        paddingVertical: verticalScale(5),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
    },
    addressTxt: {
        color: colors.BLUE_COLOR,
        fontFamily: 'Poppins-Bold',
        fontSize: moderateScale(12),
        marginTop: verticalScale(8)
    },
    swiperImgs: {
        height: verticalScale(170),
        paddingTop: verticalScale(10)
    }
})
const mapStateToProps = (state: any) => ({
    formattedAddress: state.LocationReducer.fullAddressData.formattedAddress,
})

const mapDispatchToProps = {
    getCurrentLocation,
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)