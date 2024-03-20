<script lang="ts">
	import { page } from '$app/stores';
	import { doc, deleteDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import AuthCheck from '$lib/components/AuthCheck.svelte';

	const handleDelete = async () => {
		// update
		// batch.delete(doc(db, 'meals', $page.params.dish))
		await deleteDoc(doc(db, 'meals', $page.params.dish));
		// todo I need to delete a photo from the storage database as well here.
		goto('/');
	};

	const handleCancel = () => {
		goto('/feed');
	};
</script>

<AuthCheck>
	<section class="flex h-full w-full max-w-80 flex-col justify-center gap-10 self-center">
		<h1 class="text-center text-2xl font-bold">
			Are you sure you want to delete this delicious dinner?
		</h1>
		<div class="flex justify-center gap-4">
			<button class="btn btn-primary" on:click={handleDelete}> Yes </button>
			<button class="btn btn-secondary" on:click={handleCancel}>No</button>
		</div>
	</section>
</AuthCheck>
