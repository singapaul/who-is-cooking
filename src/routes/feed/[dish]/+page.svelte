<script lang="ts">
	import { doc, arrayUnion, arrayRemove, writeBatch } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { user } from '$lib/firebase';
	import { page } from '$app/stores';
	import { Confetti } from "svelte-confetti"
	export let data: PageData;
	$: meal = data;
	const subscribeToLikes = writable([]);
	$: if (data && data.likedBy) {
		subscribeToLikes.set(data.likedBy);
	}
	let userLikesMeal = false;
	$: userLikesMeal = $subscribeToLikes.includes($user?.uid);

	const handleLike = async () => {
		const batch = writeBatch(db);
		batch.update(doc(db, 'users', $user!.uid), { likedMeals: arrayUnion($page.params.dish) });
		batch.update(doc(db, 'meals', $page.params.dish), { likedBy: arrayUnion($user!.uid) });
		await batch.commit();
		subscribeToLikes.update((currentLikes) => [...currentLikes, $user!.uid]);
	};

	const handleDislike = async () => {
		const batch = writeBatch(db);
		batch.update(doc(db, 'users', $user!.uid), { likedMeals: arrayRemove($page.params.dish) });
		batch.update(doc(db, 'meals', $page.params.dish), { likedBy: arrayRemove($user!.uid) });
		await batch.commit();
		subscribeToLikes.update((currentLikes) => currentLikes.filter((uid) => uid !== $user!.uid));
	};
</script>

<section class="m-auto flex h-full w-full">
	<div class="card m-auto w-80 border-4 border-indigo-600 bg-base-100 shadow-xl">
		<figure><img src={meal.photoURL} alt={meal.dish} /></figure>
	
		<div class="card-body">
			<div class="flex flex-col justify-between">
				<h2 class="card-title">{meal.dish}</h2>
			</div>
			<p>{meal.recipe}</p>
			<div class="card-actions justify-between">
				{#if userLikesMeal}
				<div class="badge">❤️</div>
				<Confetti />
				<Confetti />
				<Confetti />
			{/if}
			<div class="ml-auto">
				<div class="badge badge-outline">{meal.chef}</div>
				<div class="badge badge-outline">£{meal.cost}</div>
			</div>
			</div>
		</div>
		<div class="m-4 flex justify-evenly gap-4">
			<button class="btn btn-primary w-36" on:click={userLikesMeal ? handleDislike : handleLike}
				>{userLikesMeal ? 'Un-favourite' : 'Favourite'}</button
			>
			<button
				on:click={() => goto(`/feed/${$page.params.dish}/delete`)}
				class="btn btn-secondary w-36">Delete</button
			>
		</div>
	</div>
</section>
