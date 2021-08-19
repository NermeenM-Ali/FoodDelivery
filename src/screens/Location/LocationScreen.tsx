import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { getCurrentLocation } from '../../redux/actions/LocationAction'

interface LocationScreenProps {
    navigation: any
    getCurrentLocation: any
    currentPosition: {
        coords:
        {
            accuracy: number,
            altitude: number,
            heading: number,
            latitude: number,
            longitude: number,
            speed: number
        },
        mocked: boolean,
        timestamp: number
    }
}
class LocationScreen extends Component<LocationScreenProps> {
    marker: any
    componentDidMount() {
        this.props.getCurrentLocation()
    }
    render() {
        let { currentPosition, navigation } = this.props
        let { latitude, longitude } = currentPosition.coords
        return (
            <View style={styles.container}>
                <Header headerTitle='Location' navigation={navigation} />
                {
                    latitude !== 0 ?
                        <MapView
                            style={styles.map}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }} >
                            <Marker
                                ref={(marker: any) => { this.marker = marker }}
                                draggable
                                coordinate={{
                                    latitude: latitude,
                                    longitude: longitude,
                                }}
                                onPress={() => { }} />
                        </MapView> : null
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})

const mapStateToProps = (state: any) => ({
    currentPosition: state.LocationReducer.currentLocationData
})

const mapDispatchToProps = {
    getCurrentLocation
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen)