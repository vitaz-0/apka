
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCfOpjm_kaoKmO4Voki9TIu7E49Gk1tvfQ",
  authDomain: "happytripper-71f4a.firebaseapp.com",
  databaseURL: "https://happytripper-71f4a.firebaseio.com",
  storageBucket: "happytripper-71f4a.appspot.com",
};

console.log("firebase login");
firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseConfig;
