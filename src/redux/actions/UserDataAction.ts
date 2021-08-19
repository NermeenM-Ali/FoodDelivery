import * as types from '../Type'

export const saveUserData = (data: any, navigation: any) => {
    return (dispatch: any) => {
        dispatch({
            type: types.SAVE_USER_DATA,
            payload: data
        })
        navigation.goBack()
    }
}

export const changeUserDataProp = (prop: any, value: any) => {
    return {
        type: types.CHANGE_USER_DATA_PROPS,
        prop,
        value
    }
}