import { takeLatest, call, put } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';


export function* fetchCollectionsAsync(){
    yield console.log('FIRED');

    try{

        const collectionRef = firestore.collection('collections');
        
        // Similar to await in an async function
        const snapshot = yield collectionRef.get();

        // call takes a func and its paramters
        const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot);

        // Put is the saga equivelent for dispatch -- it fires actions 
        yield put(fetchCollectionsSuccess(collectionMap))
    } catch (err) {
        yield put(fetchCollectionsFailure(err.message))
    }

        // collectionRef.get().then(
        //     snapShot => {
        //         const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
        //         dispatch(fetchCollectionsSuccess(collectionsMap));
        // }).catch( err => dispatch(fetchCollectionsFailure(err.message)))
}

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionsAsync )
}