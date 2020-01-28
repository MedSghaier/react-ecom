import UserActionTypes from './user.types'
const INITIA_STATE = {
    currentUser : null,
    error: null
}
const userReducer = (state=INITIA_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.GOOGLE_SIGN_IN_START:
        case UserActionTypes.EMAIL_SIGN_IN_START:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.SIGN_OUT_SUCCES:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return {...state}
    }
}

export default userReducer;