import type { PageLoad } from './$types';
import { db } from '$lib/firebase';
import { collection, query, getDocs, Timestamp } from 'firebase/firestore';
export const load = (async () => {
	type FireBaseResponse = {
		chef: string;
		cost: number;
		createdAt: Timestamp;
		likedBy: string[];
		photoURL: string;
		postedById: string;
		recipe: string;
		ref: string;
		dish: string;
		id: string;
	};

	const q = query(collection(db, 'meals'));
	const querySnapshot = await getDocs(q);
	const data = querySnapshot.docs.map((doc) => {
		// doc.data() is never undefined for query doc snapshots
		return {
			id: doc.id, // This adds the document ID to your data object
			...doc.data(), // This spreads the document data into the object
			ref: doc.ref.path // Optional: includes the full path to the document reference
		};
	});

	const typed: FireBaseResponse[] = data;

	return {
		typed
	};
}) satisfies PageLoad;
