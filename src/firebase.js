import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBcV3BHETK89jMK1BAPYwXPz_K0HD237hU",
  authDomain: "reactapptest-10711.firebaseapp.com",
  projectId: "reactapptest-10711",
  storageBucket: "reactapptest-10711.appspot.com",
  messagingSenderId: "95034377237",
  appId: "1:95034377237:web:cfb1550aa739adf395fa1c",
  measurementId: "G-CM5GS2762K"
};

 const app = initializeApp(firebaseConfig);
const storage = getStorage(app); 
export {storage, storage as default};
