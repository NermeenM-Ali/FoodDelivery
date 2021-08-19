import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../../assets/colors'
import Header from '../../components/Header'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import CustomButton from '../../components/CustomButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export interface IUser {
    userImage: string,
    userName: string,
    userEmail: string,
    userNumber: string
}
interface AccountScreenProps {
    navigation: any
    userData: IUser
}

class AccountScreen extends Component<AccountScreenProps> {
    renderUserInfo() {
        let { userData } = this.props
        let { userEmail, userName, userNumber } = userData
        return (
            <View style={styles.detailsContainer}>
                <View style={styles.rowWrapper}>
                    <Entypo name="user" size={18} color={colors.MAIN_COLOR} />
                    <Text numberOfLines={1} style={styles.userName}>{userName}</Text>
                </View>
                <View style={styles.rowWrapper}>
                    <MaterialIcons name="email" size={18} color={colors.MAIN_COLOR} />
                    <Text numberOfLines={1} style={styles.userEmail}>{userEmail}</Text>
                </View>
                <View style={styles.rowWrapper}>
                    <MaterialIcons name="call" size={18} color={colors.MAIN_COLOR} />
                    <Text numberOfLines={1} style={styles.userMobile}>{userNumber}</Text>
                </View>
            </View>
        )
    }

    renderEditButton() {
        let { navigation } = this.props
        return (
            <CustomButton btnTxt='Edit Profile'
                onPress={() => navigation.navigate('EditProfileScreen')}
                bgColor={colors.MAIN_COLOR} >
                <MaterialCommunityIcons name='account-edit' size={25} style={{ color: colors.WHITE_COLOR, marginTop: verticalScale(2) }} />
            </CustomButton>

        )
    }
    render() {
        let { navigation, userData } = this.props
        let { userImage } = userData
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
                    <Header headerTitle='Preview Profile' navigation={navigation} />
                    <View style={styles.profileImgContainer}>
                        <Image source={userImage ? { uri: userImage } : require('../../assets/images/noImg.png')} style={styles.img} resizeMode='cover' />
                    </View>
                    {this.renderUserInfo()}

                </ScrollView>
                {this.renderEditButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR,
    },
    scrollContainer: {
        flex: 1,
    },
    profileImgContainer: {
        width: '100%',
        height: verticalScale(400),
    },
    img: {
        width: '100%',
        height: '100%'
    },
    detailsContainer: {
        width: '100%',
        height: verticalScale(300),
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(30)
    },
    userName: {
        fontFamily: "Poppins-Bold",
        fontSize: moderateScale(18),
        marginTop: verticalScale(8),
        marginHorizontal: scale(10)
    },
    userEmail: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(16),
        marginTop: verticalScale(8),
        marginHorizontal: scale(10)
    },
    userMobile: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(16),
        marginTop: verticalScale(8),
        marginHorizontal: scale(10)
    },
    rowWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.SHADOW_COLOR,
        borderBottomWidth: scale(2),
        paddingVertical: verticalScale(10)
    },

})

const mapStateToProps = (state: any) => ({
    userData: state.UserDataReducer.userData
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)