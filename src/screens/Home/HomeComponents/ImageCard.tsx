import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { moderateScale, scale, verticalScale } from '../../../utils/Scaling'

interface ImageCardProps {
    item: {
        id: number,
        img: any
    }
    index: number
    navigation?: any
}
export default class ImageCard extends Component<ImageCardProps> {
    render() {
        let { item } = this.props
        let { img } = item
        return (
            <View style={styles.container}>
                <Image source={img} style={styles.img} resizeMode='cover' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: scale(150),
        height: verticalScale(150),
        marginHorizontal: scale(7),
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(7)
    }
})
