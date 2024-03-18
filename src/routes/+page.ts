import { doc, getDoc } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async () => {
	const docRef = doc(db, 'rotor', '267rotor');
	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		throw error(404, 'that user does not exist!');
	}

	return {
		array: docSnap.data()?.Order
	};
}) satisfies PageLoad;
