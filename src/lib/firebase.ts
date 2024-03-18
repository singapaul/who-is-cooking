// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Import the functions you need from the SDKs you need

import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { doc, getDoc, getFirestore, onSnapshot } from 'firebase/firestore';
import { writable, type Readable, derived } from 'svelte/store';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBbl1NaYS3SE3lb0ROS2Pie0ZDoD8wLgzI',
	authDomain: 'who-is-cooking.firebaseapp.com',
	projectId: 'who-is-cooking',
	storageBucket: 'who-is-cooking.appspot.com',
	messagingSenderId: '169576180053',
	appId: '1:169576180053:web:2bd9c7a24914b018e727dc',
	measurementId: 'G-41QYQE18QH'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

/**
 * @returns a store with the current firebase user
 */
function userStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}

export const user = userStore();

/**
 * @param  {string} path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(path: string) {
	let unsubscribe: () => void;

	const docRef = doc(db, path);

	const { subscribe } = writable<T | null>(null, (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			set((snapshot.data() as T) ?? null);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
}

interface UserData {
	username: string;
	bio: string;
	photoURL: string;
	links: unknown[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
	if ($user) {
		return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
	} else {
		set(null);
	}
});

export function rotorStore() {
	const { subscribe, set } = writable([]); // Initialize your store with null or appropriate initial state

	const docRef = doc(db, 'rotor', '267rotor');

	// This part does not need to be asynchronous; you can set up the subscription immediately
	const unsubscribe = onSnapshot(
		docRef,
		(doc) => {
			if (doc.exists()) {
				set(doc.data()); // Update the store with the new document data
			} else {
				set([]); // Handle the case where the document does not exist
			}
		},
		(error) => {
			console.error('Error getting document:', error);
			set([]); // Optional: set to null or handle the error as appropriate
		}
	);

	// Return an object that behaves like a Svelte store
	return {
		subscribe,
		// Optionally include a method to manually unsubscribe, if needed for cleanup
		unsubscribe() {
			unsubscribe();
		}
	};
}

// Create an instance of the store
export const rotor = rotorStore();
