import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCWcXpEtPZM7UFmAjRvW6pRvGWouuu1rFQ",
    authDomain: "ecom-clothing-store.firebaseapp.com",
    databaseURL: "https://ecom-clothing-store.firebaseio.com",
    projectId: "ecom-clothing-store",
    storageBucket: "ecom-clothing-store.appspot.com",
    messagingSenderId: "125601101688",
    appId: "1:125601101688:web:1008560b301f1f3e7dfa8d"
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
   const userRef = firestore.doc(`users/${userAuth.uid}`);

   const snapShot = await userRef.get();

   if(!snapShot.exists){
     const { displayName, email } = userAuth;
     const createdAt = new Date();

     try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
     }catch (err){
        console.log('error creating user', err.message);
     }
   }

   return userRef;
  // console.log(snapShot);
  
}

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;