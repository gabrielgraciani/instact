import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
	apiKey: "AIzaSyD3blW99oykENBSWnwjch4xYXWWuZf2IVU",
	authDomain: "reactmon-55f1b.firebaseapp.com",
	databaseURL: "https://reactmon-55f1b.firebaseio.com",
	projectId: "reactmon-55f1b",
	storageBucket: "reactmon-55f1b.appspot.com",
	messagingSenderId: "172940760428",
	appId: "1:172940760428:web:6f97ef21ed4d6b63e28f49",
	measurementId: "G-L487SHSNG1"
};
firebase.initializeApp(config);
export default firebase;
export const db = firebase.firestore();