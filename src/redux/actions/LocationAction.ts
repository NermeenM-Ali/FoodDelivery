import Geolocation from '@react-native-community/geolocation'
// @ts-ignore
import Geocoder from 'react-native-geocoder';
import * as types from '../Type'


export const getCurrentLocation = () => {
    return (dispatch: any) => {
        Geolocation.getCurrentPosition(
            (position: any) => {
                let lat = position.coords.latitude
                let lng = position.coords.longitude
                dispatch({
                    type: types.CURRENT_LOCATION,
                    payload: position
                })
                if (position) {
                    Geocoder.geocodePosition({ lat, lng }).then((response: any) => {
                        dispatch({
                            type: types.REAL_ADDRESS,
                            payload: response[0]

                        })
                    }).catch((err: any) => console.log(err))
                }
            },
            (error: any) => console.log('Error', JSON.stringify(error)),
            { enableHighAccuracy: false, timeout: 20000 },
        );
    }
}