import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/database';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDjl37CZBo1DL7C42QVueukmuTumuEPxZk",
    authDomain: "prank-app-c2439.firebaseapp.com",
    projectId: "prank-app-c2439",
    storageBucket: "prank-app-c2439.appspot.com",
    messagingSenderId: "1047156175909",
    appId: "1:1047156175909:web:0f6a0e26c84c4285fdfbcc",
    measurementId: "G-DLLYKV4R6T"
};

firebase.initializeApp(firebaseConfig);

export const fb = firebase;
export const fs = firebase.firestore();
export const auth = firebase.auth();