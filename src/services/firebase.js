import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
	apiKey: "AIzaSyC_f0n_3remN7t9DqM2lgxfH5I2opQ_B28",
	authDomain: "instact-5b957.firebaseapp.com",
	databaseURL: "https://instact-5b957.firebaseio.com",
	projectId: "instact-5b957",
	storageBucket: "instact-5b957.appspot.com",
	messagingSenderId: "277823711562",
	appId: "1:277823711562:web:3959088bcd979f5c2cb9b3",
	measurementId: "G-TH13JXDBDS"
};
firebase.initializeApp(config);
export default firebase;
export const db = firebase.firestore();