import React, { Component } from 'react'
import { Text, StyleSheet, View, Pressable, Image } from 'react-native'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../assets/colors';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import { moderateScale, scale, verticalScale } from '../../utils/Scaling';

interface LoginScreenProps {
    navigation: any
}
interface LoginScreenState {
    userInfo: any
}
export default class LoginScreen extends Component<LoginScreenProps, LoginScreenState> {
    constructor(props: LoginScreenProps) {
        super(props)
        this.state = {
            userInfo: null
        }
    }

    _responseInfoCallback = (error: any, result: any) => {
        if (error) {
            console.log('Error fetching data: ' + error.toString());

        } else {
            this.setState({ userInfo: result })
        }
    }
    onFacebookButtonPress = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        let data = await AccessToken.getCurrentAccessToken()
        if (!data) {
            console.log('Something went wrong obtaining access token');
        } else {
            const infoRequest = new GraphRequest(
                '/me?fields=id,first_name,last_name,name,picture.type(large),email,gender',
                null,
                this._responseInfoCallback,
            );
            new GraphRequestManager().addRequest(infoRequest).start();
        }
    }

    renderUserInfo() {
        let { userInfo } = this.state
        let { email, name, picture } = userInfo
        let { url } = picture.data
        return (
            <View style={styles.userInfoSection}>
                <Image source={{ uri: url }} style={styles.userImg} resizeMode='contain' />
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.userEmail}>{email}</Text>


                <CustomButton btnTxt='LogOut'
                    onPress={() => {
                        LoginManager.logOut()
                        this.setState({ userInfo: null })
                    }}
                    bgColor={colors.MAIN_COLOR} >
                    <SimpleLineIcons name='logout' size={18} style={{ color: colors.WHITE_COLOR, marginTop: verticalScale(2) }} />
                </CustomButton>
            </View>
        )
    }

    renderFBLoginBtn() {
        return (
            <View style={styles.FbLoginSection}>
                <Text style={styles.signTxt}>Try to Sign-in !</Text>
                <CustomButton btnTxt='Facebook Sign-In'
                    onPress={() => this.onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
                    bgColor={colors.BLUE_COLOR} >
                    <FontAwesome name='facebook-square' size={25} style={{ color: colors.WHITE_COLOR, marginTop: verticalScale(2) }} />
                </CustomButton>
            </View >
        )
    }
    render() {
        let { navigation } = this.props
        let { userInfo } = this.state
        return (
            <View style={styles.container}>
                <Header headerTitle='Facebook Login' navigation={navigation} />
                {userInfo ?
                    this.renderUserInfo() :
                    (this.renderFBLoginBtn())}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR,

    },
    FbLoginSection: {
        height: verticalScale(400),
        marginTop: verticalScale(180),
        justifyContent: 'center',
        alignItems: 'center',
    },
    FbBtn: {
        backgroundColor: colors.BLUE_COLOR,
        width: scale(300),
        height: verticalScale(60),
        borderRadius: moderateScale(10),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        elevation: 1,
        flexDirection: 'row'
    },
    FbLogOutBtn: {
        backgroundColor: colors.MAIN_COLOR,
        width: scale(300),
        height: verticalScale(60),
        marginTop: verticalScale(50),
        borderRadius: moderateScale(10),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        elevation: 1,
        flexDirection: 'row'
    },
    Fbtxt: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(14),
        color: colors.WHITE_COLOR,
        marginHorizontal: scale(10),
        marginTop: verticalScale(7)
    },
    signTxt: {
        fontFamily: "Poppins-Bold",
        fontSize: moderateScale(18),
        color: colors.BLUE_COLOR,
        marginBottom: verticalScale(40)
    },
    userInfoSection: {
        backgroundColor: colors.SHADOW_COLOR,
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(10),
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: verticalScale(100)
    },
    userName: {
        fontFamily: "Poppins-Bold",
        fontSize: moderateScale(20),
        color: colors.BLUE_COLOR,
        marginTop: verticalScale(40),
    },
    userEmail: {
        fontFamily: "Poppins-Bold",
        fontSize: moderateScale(14),
        color: colors.DARK_GRAY,
        marginTop: verticalScale(10),
    },
    userImg: {
        width: scale(150),
        height: scale(150),
        borderRadius: scale(150) / 2
    }
})
