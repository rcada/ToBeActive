import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	// doc,
	// DocumentReference,
	getFirestore,
	Timestamp
} from 'firebase/firestore';

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
const db = getFirestore();

// SportsCenters Collection
export type SportsCenter = {
	name: string;
	city: string;
	openTime: number;
	closeTime: number;
	sports: Sport[];
	multisport: boolean;
	isic: boolean;
	beverage: boolean;
	freeParking: boolean;
};

export type SportsCenterWithId = SportsCenter & { id: string };

export type SportType =
	| 'badminton'
	| 'basketball'
	| 'box'
	| 'dance'
	| 'pilates'
	| 'soccer'
	| 'squash'
	| 'swimming'
	| 'tennis'
	| 'table-tennis'
	| 'volleyball';

export type Sport = {
	name: SportType;
	count: number;
};

export const sportscentersCollection = collection(
	db,
	'sportscenters'
) as CollectionReference<SportsCenter>;

export type Reservation = {
	by: string;
	submissionDate: Timestamp;
	date: string;
	startTime: number;
	endTime: number;
	sportsCenterId: string;
	sport: string;
	count: number;
};

export type ReservationWithId = Reservation & {
	id: string;
};

export const reservationCollection = collection(
	db,
	'reservations'
) as CollectionReference<Reservation>;
