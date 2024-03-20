<script lang="ts">
	import { page } from '$app/stores';
	import { doc, writeBatch, arrayRemove } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { user, storage } from '$lib/firebase';
	import { ref, deleteObject } from 'firebase/storage';
	import { goto } from '$app/navigation';
	import AuthCheck from '$lib/components/AuthCheck.svelte';

	const handleDelete = async () => {
		const imageRef = ref(storage, `meals/${$page.params.dish}.png`);

		const batch = writeBatch(db);
		batch.update(doc(db, 'users', $user!.uid), { likedMeals: arrayRemove($page.params.dish) });
		batch.delete(doc(db, 'meals', $page.params.dish));
		await batch.commit();
		await deleteObject(imageRef);
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
		<div class="flex flex-col justify-center gap-4">
			<button class="btn btn-primary" on:click={handleDelete}> Yes </button>
			<button class="btn btn-secondary" on:click={handleCancel}>No</button>
		</div>
	</section>
</AuthCheck>
