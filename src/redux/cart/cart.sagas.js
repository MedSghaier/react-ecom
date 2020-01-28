import { takeLatest, call, all, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import {clearCart} from './cart.actions';

export function* clearCartOnSingOut(){
    yield put(clearCart())
}

export function* onSignOutSuccess(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCES, clearCartOnSingOut)
}

export function* cartSagas(){
    yield all([
        call(onSignOutSuccess)
    ])
}