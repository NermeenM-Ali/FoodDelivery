import React, { Component } from 'react'
import { StyleSheet, View, Image, ScrollView, I18nManager, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { saveUserData, changeUserDataProp } from '../../redux/actions/UserDataAction'
import colors from '../../assets/colors'
import Header from '../../components/Header'
import { UploadFile } from '../../components/UploadFile'
import { verticalScale } from '../../utils/Scaling'
import { IUser } from './AccountScreen'
import CardTextInput from '../../components/CardTextInput'
import CustomButton from '../../components/CustomButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


interface EditProfileScreenProps {
    navigation: any
    userData: IUser
    saveUserData: any
    changeUserDataProp: any
}
interface EditProfileScreenState {
    userUploadedImage: any
    isImageLoading: boolean
}
class EditProfileScreen extends Component<EditProfileScreenProps, EditProfileScreenState> {
    constructor(props: EditProfileScreenProps) {
        super(props)
        this.state = {
            userUploadedImage: '',
            isImageLoading: false
        }
    }
    inputsFailed: any = {}
    renderProfileImgSection() {
        let { changeUserDataProp, userData } = this.props
        let { userImage } = userData
        return (
            <UploadFile
                uploadStyle={styles.profileImgContainer}
                FolderName={'ProfileImage'}
                multiple={false}
                uploadFile={() => { }}
                getVideo={() => { }}
                uploading={(isImageLoading: boolean) => { this.setState({ isImageLoading }) }}
                onSuccess={(data: any) => {
                    this.setState({ userUploadedImage: data.path }, () => console.log(this.state.userUploadedImage))
                    changeUserDataProp('userImage', data.path)
                }}>
                <Image source={userImage ? { uri: userImage } : require('../../assets/images/noImg.png')} style={styles.img} resizeMode='cover' />
            </UploadFile>
        )
    }

    userDataForm() {

        let { userName, userNumber, userEmail } = this.props.userData
        const initialData = {
            userImage: "",
            userName: userName,
            userEmail: userEmail,
            userNumber: userNumber,

        };
        const ValidationSchema = Yup.object().shape({
            userName: Yup.string()
                .required(I18nManager.isRTL ? 'مطلوب' : 'required'),
            userNumber: Yup.string()
                .required(I18nManager.isRTL ? 'مطلوب' : 'required'),
            userEmail: Yup.string()
                .email()
                .required(I18nManager.isRTL ? 'مطلوب' : 'required'),
        });
        return (
            <Formik initialValues={initialData} validationSchema={ValidationSchema}
                onSubmit={(values) => { this.Save(values) }}>
                {
                    (formikProps) => (
                        <View style={{ marginVertical: verticalScale(5), flex: 1 }}>
                            <ScrollView style={{ paddingBottom: verticalScale(70) }}>
                                <CardTextInput
                                    value={formikProps.values.userName}
                                    onChangeText={formikProps.handleChange('userName')}
                                    placeHolder={'User name'}
                                    keyboardType='default'
                                    iconName='user'
                                    isUserName
                                    inputRef={(input: any) => { this.inputsFailed.userName = input; }}
                                    error={formikProps.errors.userName}
                                    touched={formikProps.touched.userName}
                                    onSubmitEditing={() => {
                                        Keyboard.dismiss()
                                        this.inputsFailed.userEmail.focus();
                                    }} />

                                <CardTextInput
                                    value={formikProps.values.userEmail}
                                    onChangeText={formikProps.handleChange('userEmail')}
                                    placeHolder={'User email'}
                                    keyboardType='email-address'
                                    iconName='email'
                                    inputRef={(input: any) => { this.inputsFailed.userEmail = input; }}
                                    error={formikProps.errors.userEmail}
                                    touched={formikProps.touched.userEmail}
                                    onSubmitEditing={() => {
                                        Keyboard.dismiss()
                                        this.inputsFailed.userNumber.focus();
                                    }} />

                                <CardTextInput
                                    value={formikProps.values.userNumber}
                                    onChangeText={formikProps.handleChange('userNumber')}
                                    placeHolder={'User number'}
                                    keyboardType='numeric'
                                    maxLength={11}
                                    iconName='call'
                                    inputRef={(input: any) => { this.inputsFailed.userNumber = input; }}
                                    error={formikProps.errors.userNumber}
                                    touched={formikProps.touched.userNumber}
                                    onSubmitEditing={() => Keyboard.dismiss()} />


                            </ScrollView>
                            <CustomButton btnTxt='Save'
                                onPress={() => formikProps.handleSubmit()}
                                bgColor={colors.MAIN_COLOR} >
                                <MaterialCommunityIcons name='account-edit' size={25} style={{ color: colors.WHITE_COLOR, marginTop: verticalScale(2) }} />
                            </CustomButton>
                        </View>
                    )
                }
            </Formik>
        )
    }

    Save = (values: any) => {
        let { navigation } = this.props
        let { userUploadedImage } = this.state
        let data = { ...values, userImage: userUploadedImage }
        this.props.saveUserData(data, navigation)
    }
    render() {
        let { navigation } = this.props
        return (
            <View style={styles.container}>
                <Header hasBackIcon headerTitle='Edit Profile' navigation={navigation} />
                {this.renderProfileImgSection()}
                {this.userDataForm()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR
    },
    profileImgContainer: {
        width: '100%',
        height: verticalScale(400),
    },
    img: {
        width: '100%',
        height: '100%'
    }
})

const mapStateToProps = (state: any) => ({
    userData: state.UserDataReducer.userData
})
const mapDispatchToProps = {
    saveUserData,
    changeUserDataProp
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
