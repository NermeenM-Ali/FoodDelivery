import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../assets/colors'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface CustomButtonProps {
    btnTxt: string
    onPress: () => any
    bgColor: any
}
export default class CustomButton extends Component<CustomButtonProps> {
    render() {
        let { btnTxt, onPress, bgColor } = this.props
        return (
            <TouchableOpacity style={[styles.BtnContainer, { backgroundColor: bgColor }]} activeOpacity={0.7} onPress={onPress}>
                {this.props.children}
                <Text style={styles.Btntxt}>{btnTxt}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    BtnContainer: {
        width: scale(300),
        height: verticalScale(60),
        marginTop: verticalScale(10),
        borderRadius: moderateScale(10),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        elevation: 1,
        flexDirection: 'row',
        marginBottom: verticalScale(20)
    },
    Btntxt: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(16),
        color: colors.WHITE_COLOR,
        marginHorizontal: scale(10),
        marginTop: verticalScale(7)
    }
})
