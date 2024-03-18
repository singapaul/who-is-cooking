import type { PageLoad } from './$types';
import { db } from '$lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
export const load = (async () => {
	const q = query(collection(db, 'meals'));
	const querySnapshot = await getDocs(q);
	const data = querySnapshot.docs
		.map((doc) => {
			// doc.data() is never undefined for query doc snapshots
			return {
				id: doc.id, // This adds the document ID to your data object
				...doc.data(), // This spreads the document data into the object
				ref: doc.ref.path // Optional: includes the full path to the document reference
			};
		})
		.reverse();

	console.log(data);

	return {
		data
	};
}) satisfies PageLoad;
