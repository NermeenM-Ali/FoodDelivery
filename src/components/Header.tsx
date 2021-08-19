
import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import colors from '../assets/colors'
import { searchEnums } from '../screens/Search/SearchScreen'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface HeaderProps {
    navigation: any,
    headerTitle?: string
    hasDrawerIcon?: boolean
    hasBackIcon?: boolean
    hasSearchIcon?: boolean
    screenType?: searchEnums
}
class Header extends Component<HeaderProps> {

    render() {
        let { navigation, screenType = searchEnums.FOR_RESTAURANTS, headerTitle, hasBackIcon = false, hasDrawerIcon = false, hasSearchIcon = false } = this.props
        {/* onPress={() => navigation.goBack()}*/ }
        return (
            <View style={styles.container}>
                {hasDrawerIcon ?
                    <TouchableOpacity activeOpacity={0.7} style={styles.arrowBtn} onPress={() => { console.log('Open Drawer !') }}>
                        <IonIcon name="ios-menu-outline" size={30} color={colors.MAIN_COLOR} />
                    </TouchableOpacity>
                    : hasBackIcon ?
                        <TouchableOpacity activeOpacity={0.7} style={styles.arrowBtn} onPress={() => { navigation.goBack() }}>
                            <IonIcon name="ios-arrow-back" size={22} color={colors.MAIN_COLOR} />
                        </TouchableOpacity> : <View style={styles.arrowBtn} />
                }
                <View style={styles.titleContainer}>
                    <Text style={styles.titleTxt}>{headerTitle}</Text>
                </View>
                {
                    hasSearchIcon ?
                        <TouchableOpacity activeOpacity={0.7} style={styles.arrowBtn} onPress={() => { navigation.navigate('SearchScreen', { searchType: screenType }) }}>
                            <IonIcon name="search" size={22} color={colors.MAIN_COLOR} />
                        </TouchableOpacity> : <View style={{ width: scale(30) }} />
                }

            </View>
        )
    }
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.WHITE_COLOR,
        height: verticalScale(60),
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 1.5,
        paddingHorizontal: scale(20)
    },
    arrowBtn: {
        width: scale(30),
        height: verticalScale(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        marginTop: verticalScale(10),
    },
    titleTxt: {
        fontFamily: 'Poppins-Bold',
        fontSize: moderateScale(18),
        color: colors.MAIN_COLOR,
        alignSelf: 'center',
        textAlign: 'center',
    }
})
