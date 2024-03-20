<script lang="ts">
	import { db } from '$lib/firebase';

	export let name = 'placeholder';
	export let index: number;
	export let handleCheck: any;
	export let checkedStatus: boolean;
	export let id: string; // Add this line to accept the id as a prop
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import Confetti from 'svelte-confetti';


	$: sparkles = checkedStatus

	
	async function handleClick() {
		// You could pass more information if needed
		const documentRef = doc(db, 'rotor', '267rotor');
		const docSnap = await getDoc(documentRef);

		if (docSnap.exists()) {
			const itemsArray = docSnap.data().Order;

			const index = itemsArray.findIndex((item) => item.id === id);

			if (index !== -1) {
				const currentValueCookedStatus = itemsArray[index].cooked;
				const newValueCookedStatus = !currentValueCookedStatus;
				itemsArray[index].cooked = newValueCookedStatus;

				await updateDoc(documentRef, { Order: itemsArray });
			}
		}
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
	class={`not-prose stack flex w-full min-w-80 max-w-md items-center justify-center rounded-lg bg-base-300 p-4 text-center no-underline border ${checkedStatus ? 'border-green-500' : 'border-white' }`}
>
	<p class="text-2xl font-bold">{name}</p>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Cooked/ Unavailable</span>
			<input
				type="checkbox"
				checked={checkedStatus}
				on:click={handleClick}
				class="checkbox-primary checkbox"
			/>
			{#if sparkles}
			<Confetti />
			{/if}
		</label>
	</div>
</a>
