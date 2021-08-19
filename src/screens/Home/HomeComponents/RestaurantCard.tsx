import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import colors from '../../../assets/colors'
import { moderateScale, scale, verticalScale } from '../../../utils/Scaling'

interface RestaurantCardProps {
    item: {
        id: number,
        name: string,
        description: string
        img: any,
        rating: string,
        price: string,
        distance: string
    }
    index: number
    navigation: any
}
export default class RestaurantCard extends Component<RestaurantCardProps> {
    render() {
        let { item } = this.props
        let { img, description, name, distance, price, rating } = item
        return (
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <Image source={img} resizeMode='cover' style={styles.img} />
                </View>
                <View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name}>{name}</Text>
                        <Text numberOfLines={2} style={styles.description}>{description}</Text>
                    </View>
                    <View style={styles.seperator} />
                    <View style={styles.footerSection}>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome name='star' size={12} style={{ color: colors.LIGHT_GRAY_COLOR, marginTop: verticalScale(2) }} />
                            <Text style={[styles.footerTxt, { marginHorizontal: scale(3) }]}>{rating}</Text>
                        </View>
                        <Text style={styles.footerTxt}>{distance}</Text>
                        <Text style={styles.footerTxt}>{price}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: scale(380),
        height: verticalScale(150),
        marginHorizontal: scale(5),
        marginVertical: verticalScale(5),
        backgroundColor: colors.WHITE_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: colors.SHADOW_COLOR,
        borderWidth: 1,
        borderRadius: moderateScale(7)
    },
    imgContainer: {
        width: scale(130),
        height: '100%',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    seperator: {
        width: scale(240),
        height: verticalScale(2),
        backgroundColor: colors.SHADOW_COLOR
    },
    detailsContainer: {
        width: scale(240),
        height: verticalScale(80),
        paddingHorizontal: scale(7),
    },
    footerSection: {
        width: scale(240),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: verticalScale(60),
        paddingHorizontal: scale(7),
    },
    name: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(16),
        marginTop: verticalScale(5)
    },
    description: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(12),
        color: colors.LIGHT_GRAY_COLOR
    },
    footerTxt: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(12),
        color: colors.LIGHT_GRAY_COLOR
    }
})
