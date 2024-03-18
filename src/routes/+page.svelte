<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import SortableList from '$lib/components/SortableList.svelte';
	import { db, userData, user, rotor } from '$lib/firebase';
	import { doc, setDoc } from 'firebase/firestore';
	import ChefLink from '$lib/components/ChefLink.svelte';

	$user;

	function sortList(e: CustomEvent) {
		// console.log(e);
		const newList = e.detail;
		const userRef = doc(db, 'rotor', '267rotor');
		setDoc(userRef, { Order: newList }, { merge: true });
	}

	function resetOrder() {
		const originalOrder = $rotor.Order.sort((a, b) => a.defaultPosition - b.defaultPosition);
		const userRef = doc(db, 'rotor', '267rotor');
		setDoc(userRef, { Order: originalOrder }, { merge: true });
	}

	function hardReset() {
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
</script>

<AuthCheck>
	<main class="mx-auto max-w-xl">
		<SortableList list={$rotor.Order} on:sorty={sortList} let:item let:index>
			<div class="group relative">
				<!-- @add image -->
				<ChefLink name={item.name} index={index + 1} />
			</div>
		</SortableList>
		<!-- add reset order functionality -->
		<button class="btn btn-accent" on:click={resetOrder}>Reset rota</button>
	</main>
</AuthCheck>
