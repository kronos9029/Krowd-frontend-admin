// import firebase from 'firebase/app';
// import { firebaseConfig, firebaseConfigSecondary } from '../config';

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
//   firebase.firestore();
// }

// class FirebaseService {
//   static loginWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     return firebase.auth().signInWithPopup(provider);
//   };
// }

// export default FirebaseService;

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '../config';
import { TempBusiness } from '../@types/krowd/business';

const FIREBASE_DATASTORAGE_CONFIG = {
  colection: {
    business: 'business'
  }
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

class FirebaseService {
  static loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  static async createTempBusinessFirebase(email: string, password: string, name: string) {
    const _firebase = firebase.app('Secondary');
    _firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        _firebase
          .firestore()
          .collection('business')
          .add({
            uid: res.user?.uid,
            email: email,
            name: name,
            password: password,
            address: '',
            description: '',
            image: '',
            phoneNum: '',
            status: 'notSubmited',
            taxIdentificationNumber: '',
            fieldList: [{ id: '', name: '' }],
            denied_message: ''
          })
          .then(() => _firebase.auth().currentUser?.sendEmailVerification())
          .then(() => _firebase.auth().signOut());
      });
  }

  static async getAllTempBusiness() {
    const _firebase = firebase.app('Secondary');
    const businessRef = _firebase
      .firestore()
      .collection(FIREBASE_DATASTORAGE_CONFIG.colection.business);
    const snapshot = await businessRef.get();
    const listBusiness: TempBusiness[] = [];
    snapshot.forEach(async (doc) => {
      const data = doc.data();
      var business: TempBusiness = {
        email: data.email,
        displayName: data.name,
        uid: data.uid,
        password: data.password,
        description: data.description,
        phoneNum: data.phoneNum,
        status: data.status,
        address: data.address,
        denied_message: data.denied_message,
        taxIdentificationNumber: data.taxIdentificationNumber,
        fieldList: data.fieldList
      };
      listBusiness.push(business);
    });
    return listBusiness;
  }

  static async getTempBusinessID(uid: string) {
    const _firebase = firebase.app('Secondary');
    const businessRef = await _firebase
      .firestore()
      .collection(FIREBASE_DATASTORAGE_CONFIG.colection.business)
      .where('uid', '==', uid)
      .get();

    const snapshot = businessRef.docs.at(0);
    const data = snapshot?.data();
    const businessID: TempBusiness | null =
      (data && {
        email: data.email,
        displayName: data.name,
        uid: data.uid,
        password: data.password,
        description: data.description,
        phoneNum: data.phoneNum,
        status: data.status,
        address: data.address,
        denied_message: data.denied_message,
        taxIdentificationNumber: data.taxIdentificationNumber,
        fieldList: data.fieldList
      }) ||
      null;
    return businessID;
  }
}

export default FirebaseService;
