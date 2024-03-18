import { db } from '$lib/firebase';
import type { PageLoad } from './$types';
import { doc, getDoc } from 'firebase/firestore';

export const load = (async ({ params }) => {
	let data;

	const docRef = doc(db, 'meals', params.dish);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		data = docSnap.data();
	} else {
		// docSnap.data() will be undefined in this case
		console.log('No such document!');
	}
	return {
		data
	};
}) satisfies PageLoad;
