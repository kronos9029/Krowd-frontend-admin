import firebase1 from 'firebase';
var firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APPID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  apiKey: 'AIzaSyAnOIHrRunqD82BN6yscpcg78rNTLxSAhM',
  authDomain: 'revenuesharinginvest-44354.firebaseapp.com',
  projectId: 'revenuesharinginvest-44354',
  storageBucket: 'revenuesharinginvest-44354.appspot.com',
  messagingSenderId: '71002133649',
  appId: '1:71002133649:web:1f8ca95c618519df339b30',
  measurementId: 'G-YPFBPWMLF6'
};
firebase1.initializeApp(firebaseConfig);
export { firebase1 };
