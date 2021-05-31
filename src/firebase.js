import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase
	.initializeApp({
		apiKey: 'AIzaSyBRrTrhmjGi5PYcY1oBaIp3R5aoyo6wNmE',
		authDomain: 'inner-chat.firebaseapp.com',
		projectId: 'inner-chat',
		storageBucket: 'inner-chat.appspot.com',
		messagingSenderId: '88555779622',
		appId: '1:88555779622:web:bad1a52960286916ef18e7'
	})
	.auth();
