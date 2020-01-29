import ShopActionTypes from './shop.types';
// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
     type: ShopActionTypes.FETCH_COLLECTIONS_START,
 })

 export const fetchCollectionsSuccess = (collectionsMap) =>({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap

 })

 export const fetchCollectionsFailure = (errMsg) =>({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errMsg

 })

// export const fetchCollectionsStartAsync = () =>{
//     return dispatch => {
//         const collectionRef = firestore.collection('collections');
//         dispatch(fetchCollectionsStart());

//         collectionRef.get().then(
//             snapShot => {
//                 const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
//                 dispatch(fetchCollectionsSuccess(collectionsMap));
//         }).catch( err => dispatch(fetchCollectionsFailure(err.message)))
//     }
// }