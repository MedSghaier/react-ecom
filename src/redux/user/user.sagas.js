import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';
import { 
    signInFailure,
    signInSuccess, 
    signOutSuccess, 
    signOutFailure, 
    signUpFailure,
    signUpSuccess
} from './user.actions';

export function* getSnapshotFromUSerAuth(userAuth, additionalData){
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }catch(err){
        yield put(signInFailure(err))
    }
}
export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
       yield getSnapshotFromUSerAuth(user)
    }catch(err){
        yield put(signInFailure(err))
    }
}
export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({payload: {email, password}}){

    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUSerAuth(user);

    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onEmailSignInstart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return 
        yield getSnapshotFromUSerAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut(){
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error ))
    }
}
export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* signUp({payload:{email, password, displayName}}){
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: displayName }));
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* signInAfterSignUp({ payload: user, additionalData }){
    yield getSnapshotFromUSerAuth(user, additionalData)
}
export function* onSignUpSucces(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}
export function* onSingUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInstart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSingUpStart),
        call(onSignUpSucces)
    ])
}