import * as types from '../Type';

const initialState = {
    userData: {
        userImage: '',
        userName: 'user 1',
        userEmail: 'user@user.com',
        userNumber: '01000000000'
    }
}


const UserDataReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.SAVE_USER_DATA:
            return { ...state, userData: action.payload }
        case types.CHANGE_USER_DATA_PROPS:
            return { ...state, userData: { ...state.userData, [action.prop]: action.value } }
        default:
            return state;
    }
}

export default UserDataReducer;