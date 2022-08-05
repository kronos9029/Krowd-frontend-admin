export const firebaseConfig = {
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
export const firebaseConfigSecondary = {
  apiKey: 'AIzaSyAnOIHrRunqD82BN6yscpcg78rNTLxSAhM',
  appId: '1:71002133649:web:1f8ca95c618519df339b30',
  projectId: 'revenuesharinginvest-44354'
};
export const REACT_APP_API_URL =
  'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/';

export const cognitoConfig = {
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID
};

export const auth0Config = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN
};

export const mapConfig = process.env.REACT_APP_MAP_MAPBOX;

export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;
