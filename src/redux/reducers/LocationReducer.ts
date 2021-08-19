import * as types from '../Type';

const initialState = {
    currentLocationData: {
        coords:
        {
            accuracy: 0,
            altitude: 0,
            heading: 0,
            latitude: 0,
            longitude: 0,
            speed: 0
        },
        mocked: false,
        timestamp: 0
    },
    fullAddressData: {
        position: { lng: '', lat: '' },
        formattedAddress: '', // the full address
        feature: '',
        streetNumber: '',
        streetName: '',
        postalCode: '',
        locality: '',
        locale: '',
        country: '',
        countryCode: '',
        adminArea: '',
        subAdminArea: '',
        subLocality: ''
    }
}


const LocationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.CURRENT_LOCATION:
            return {
                ...state,
                currentLocationData: action.payload
            }
        case types.REAL_ADDRESS:
            return {
                ...state,
                fullAddressData: action.payload
            }

        default:
            return state;
    }
}

export default LocationReducer;