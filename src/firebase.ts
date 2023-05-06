import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
// import {
// 	collection,
// 	CollectionReference,
// 	doc,
// 	DocumentReference,
// 	getFirestore
// } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAt81oWFllxPQ38HTYF5Hvl9KpXyykmpYo',
	authDomain: 'tobeactive-be755.firebaseapp.com',
	projectId: 'tobeactive-be755',
	storageBucket: 'tobeactive-be755.appspot.com',
	messagingSenderId: '58064093530',
	appId: '1:58064093530:web:5f609bc9f4b0a1eda27363'
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
// const db = getFirestore();
