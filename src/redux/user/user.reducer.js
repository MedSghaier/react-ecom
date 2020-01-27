import UserActionTypes from './user.types'
const INITIA_STATE = {
    currentUser : null,
    error: null
}
const userReducer = (state=INITIA_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
        case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.GOOGLE_SIGN_IN_START:
        case UserActionTypes.EMAIL_SIGN_IN_START:
            return {
                ...state,
                error: action.payload
            }
        default:
            return {...state}
    }
}

export default userReducer;