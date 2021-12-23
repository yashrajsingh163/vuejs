// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAuth } from "firebase/auth";

// import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// import firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCoR4GM71E3usDovnPDnKPurvC-PbjraO8",
    authDomain: "testchatihb.firebaseapp.com",
    databaseURL: "https://testchatihb-default-rtdb.firebaseio.com",
    projectId: "testchatihb",
    storageBucket: "testchatihb.appspot.com",
    messagingSenderId: "93114041257",
    appId: "1:93114041257:web:6fe8fbb03c932e320d7ab8",
    measurementId: "G-JP0LVVMLN9"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const fire = getDatabase(app);

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// export const fire = firebaseApp.firestore();

const app = initializeApp(firebaseConfig);
const fire = getFirestore(app);

// Get a list of cities from your database
async function getCities(fire) {
    const citiesCol = collection(fire, 'chats');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);
}

getCities

// const app = initializeApp(firebaseConfig)

// const auth = getAuth(app)
// const db = getDatabase(app)



export default fire;