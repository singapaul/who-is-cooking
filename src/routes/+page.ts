import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';


  async function hardReset() {
	const list = [
		{ name: 'Matt', defaultPosition: 0, cooked: false, id: 'bd' },
		{ name: 'Henry', defaultPosition: 1, cooked: false, id: 'davies' },
		{ name: 'James', defaultPosition: 2, cooked: false, id: 'fussey' },
		{ name: 'Pelayo', defaultPosition: 3, cooked: false, id: 'rat' },
		{ name: 'Rob', defaultPosition: 4, cooked: false, id: 'temu' },
		{ name: 'Hugo', defaultPosition: 5, cooked: false, id: 'jordan' },
		{ name: 'Paul', defaultPosition: 6, cooked: false, id: 'mao' }
	];
	const userRef = doc(db, 'rotor', '267rotor');
	setDoc(userRef, { Order: list });
}


export const load = (async () => {
	const docRef = doc(db, 'rotor', '267rotor');
	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		throw error(404, 'that user does not exist!');
	}

	if(docSnap.data().Order.every(chef => chef.cooked === true)){
		setTimeout(hardReset, 5000)
	}
 
	return {
		array: docSnap.data()?.Order
	};
}) satisfies PageLoad;
