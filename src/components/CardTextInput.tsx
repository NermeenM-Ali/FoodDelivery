
import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, I18nManager } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../assets/colors'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface CardTextInputProps {
    value: any
    onChangeText: (any: any) => any
    onSubmitEditing: () => any
    keyboardType: string | any
    placeHolder: string | any
    inputRef?: any
    error?: any
    touched?: any
    iconName: string
    maxLength?: number
    isUserName?: boolean
    withBorders?: boolean
}
export default class CardTextInput extends Component<CardTextInputProps>{
    render() {
        let { iconName, withBorders = false, maxLength, isUserName, value, onChangeText, placeHolder, keyboardType, inputRef, error, touched, onSubmitEditing } = this.props
        return (
            <>
                <View style={[styles.inputContainer, withBorders ? { borderWidth: scale(2), borderColor: colors.SHADOW_COLOR } : { borderBottomWidth: scale(2), borderBottomColor: error && touched ? 'red' : colors.SHADOW_COLOR }]}>
                    <View style={styles.cardImgContainer}>
                        {
                            isUserName ?
                                <Entypo name="user" size={18} color={colors.MAIN_COLOR} />
                                : <MaterialIcons name={iconName} size={withBorders ? 25 : 18} style={{ marginTop: verticalScale(2), color: colors.MAIN_COLOR }} />
                        }

                    </View>

                    <TextInput
                        value={value}
                        ref={inputRef}
                        placeholder={placeHolder}
                        placeholderTextColor={colors.DARK_GRAY}
                        secureTextEntry={false}
                        maxLength={maxLength ? maxLength : 200}
                        autoCapitalize='none'
                        autoCorrect={false}
                        selectionColor={colors.MAIN_COLOR}
                        keyboardType={keyboardType}
                        onChangeText={onChangeText}
                        onSubmitEditing={onSubmitEditing}
                        style={[styles.input, {
                            width: withBorders ? scale(300) : scale(265),
                        }]} />

                </View>
                {error && touched ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorTxt}>{error}</Text>
                    </View>
                ) : null}
            </>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        width: scale(342),
        height: verticalScale(55),
        backgroundColor: colors.WHITE_COLOR,
        borderRadius: moderateScale(10),
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: verticalScale(15)
    },
    cardImgContainer: {
        width: scale(30),
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: scale(5)
    },
    input: {
        width: scale(265),
        height: verticalScale(50),
        color: colors.BLUE_COLOR,
        paddingHorizontal: scale(10),
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(15),
        marginTop: verticalScale(5)
    },
    errorTxt: {
        color: 'red',
        fontFamily: "Poppins-Regular",
        alignSelf: 'flex-start',
        fontSize: moderateScale(10)
    },
    errorContainer: {
        width: '78%',
        alignSelf: 'center',
        marginTop: verticalScale(5)
    },
})
