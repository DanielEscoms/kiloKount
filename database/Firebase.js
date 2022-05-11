/* eslint-disable prettier/prettier */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCM9XGXe-4vUIlJtJf-dku7koCm4DKvVzk",
    authDomain: "kilokount.firebaseapp.com",
    projectId: "kilokount",
    storageBucket: "kilokount.appspot.com",
    messagingSenderId: "974942535219",
    appId: "1:974942535219:web:5604f23e7b906f9615ed46"
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
//export const database = getFirestore();
/*
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import * as firebase from 'firebase/compat';
import firestore from 'firebase/compat/firestore';
import auth from 'firebase/compat/auth';



const firebaseConfig = {
    apiKey: "AIzaSyCM9XGXe-4vUIlJtJf-dku7koCm4DKvVzk",
    authDomain: "kilokount.firebaseapp.com",
    projectId: "kilokount",
    storageBucket: "kilokount.appspot.com",
    messagingSenderId: "974942535219",
    appId: "1:974942535219:web:5604f23e7b906f9615ed46"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore();
}

export {firebase} ;
*/