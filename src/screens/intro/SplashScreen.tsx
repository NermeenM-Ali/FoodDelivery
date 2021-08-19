import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import colors from '../../assets/colors'

interface SplashScreenProps {
    navigation: any
}

export default class SplashScreen extends Component<SplashScreenProps> {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.replace('TabScreen')
        }, 2000)
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={require('../../assets/images/logo.png')} resizeMode='contain' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLUE_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '70%',
        height: '70%'
    }
})
