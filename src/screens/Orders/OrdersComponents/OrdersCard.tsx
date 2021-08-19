import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Pressable } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import colors from '../../../assets/colors'
import { moderateScale, scale, verticalScale } from '../../../utils/Scaling'

interface OrdersCardProps {
    item: {
        id: number,
        name: string,
        description: string,
        img: any,
        deliveryTime: string,
        type: string
    }
    index: number
    navigation: any
}
export default class OrdersCard extends Component<OrdersCardProps> {
    render() {
        let { item, index, navigation } = this.props
        let { description, name, img, deliveryTime, type } = item
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <Image source={img} resizeMode='cover' style={styles.img} />
                    </View>
                    <View>
                        <View style={styles.detailsContainer}>
                            <View style={styles.titleSection}>
                                <Text style={styles.nameTxt}>{name}</Text>
                                <Text style={styles.deliverytimeTxt}>{deliveryTime}</Text>
                            </View>
                            <Text numberOfLines={2} style={styles.descriptionTxt}>{description}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.typeTxt}>{type}</Text>
                                <Fontisto name='world-o' size={20} style={[styles.icon, { marginHorizontal: 0 }]} />
                            </View>
                        </View>
                    </View>
                </View>
                {index % 2 === 0 && (<View style={styles.seperator} />)}
                {
                    index % 2 !== 0 &&
                    (<View style={styles.offerSection}>
                        <View style={styles.offerInfoSection}>
                            <Text numberOfLines={6} style={styles.offerTxt}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut incidunt dicta quasi quod voluptates, nisi rem sint temporibus minima doloribus odio magni, fugit voluptate quas! Laborios</Text>
                        </View>
                        <View style={styles.moreInfoSection}>
                            <Text style={styles.moreInfoTxt}>More Info</Text>
                            <Fontisto name='world-o' size={20} style={styles.icon} />
                        </View>
                    </View>)
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: scale(380),
        height: verticalScale(130),
        marginHorizontal: scale(5),
        marginVertical: verticalScale(5),
        backgroundColor: colors.WHITE_COLOR,
        flexDirection: 'row',
        borderRadius: moderateScale(7),
        overflow: 'hidden'
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
        width: scale(380),
        height: verticalScale(2),
        borderBottomColor: colors.DARK_GRAY,
        borderBottomWidth: 1,
        alignSelf: 'center',
        marginVertical: verticalScale(5)
    },
    detailsContainer: {
        width: scale(240),
        height: verticalScale(80),
        paddingHorizontal: scale(7),
    },
    titleSection: {
        width: scale(240),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: verticalScale(60),
        paddingHorizontal: scale(7),
    },
    nameTxt: {
        fontFamily: "Poppins-Bold",
        fontSize: moderateScale(16),
        marginTop: verticalScale(5)
    },
    typeTxt: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(14),
        color: colors.LIGHT_GRAY_COLOR,
        marginLeft: scale(4)
    },
    descriptionTxt: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(14),
        color: colors.LIGHT_GRAY_COLOR
    },
    deliverytimeTxt: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(12),
        color: colors.LIGHT_GRAY_COLOR
    },
    offerSection: {
        width: scale(380),
        height: verticalScale(150),
        marginHorizontal: scale(5),
        marginVertical: verticalScale(5),
        flexDirection: 'row',
        borderRadius: moderateScale(7),
        borderColor: colors.SHADOW_COLOR,
        borderWidth: scale(3),
        overflow: 'hidden'
    },
    offerInfoSection: {
        width: scale(240),
        backgroundColor: colors.WHITE_COLOR,
        paddingHorizontal: scale(7),
        justifyContent: 'center',
        alignItems: 'center'
    },
    offerTxt: {
        fontFamily: "Poppins-Regular",
        fontSize: moderateScale(14),
        color: colors.LIGHT_GRAY_COLOR
    },
    moreInfoSection: {
        width: scale(130),
        backgroundColor: colors.WHITE_COLOR,
        paddingHorizontal: scale(7),
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginLeft: scale(5),
        flexDirection: 'row',
        paddingBottom: verticalScale(10)
    },
    moreInfoTxt: {
        fontFamily: "Poppins-Bold",
        fontSize: moderateScale(16),
        color: colors.GREEN_COLOR,

    },
    icon: {
        color: colors.LIGHT_GRAY_COLOR,
        marginBottom: verticalScale(7),
        marginHorizontal: scale(10)
    }
})
