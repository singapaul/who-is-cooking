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

	async function handleStatus(event, id) {
		console.log(event, id); // Destructure the id from event.detail
		// console.log("Clicked ID:", id);
		console.log(id);
		// You can now use this id for further processing
	}
</script>

<AuthCheck>
	<main class="m-auto mx-auto flex max-w-xl flex-col items-center gap-6 py-9">
		<h1 class="text-2xl font-bold">Cooking Rota</h1>
		<SortableList list={$rotor.Order} on:sorty={sortList} let:item let:index>
			<div class="group relative">
				<!-- @add image -->
				<ChefLink
					id={item.id}
					name={item.name}
					index={index + 1}
					checkedStatus={item.cooked}
					handleCheck={handleStatus}
				/>
			</div>
		</SortableList>
		<!-- add reset order functionality -->
		<button class="btn btn-accent w-full" on:click={resetOrder}>Re-order rota</button>
	</main>
</AuthCheck>
