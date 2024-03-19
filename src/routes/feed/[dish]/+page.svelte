<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	export let data: PageData;
	$: meal = data.data;
	console.log(data);
	console.log(meal);
</script>

<section class="m-auto flex h-full w-full">
	<div class="card m-auto w-80 bg-base-100 shadow-xl">
		<figure><img src={meal.photoURL} alt={meal.dish} /></figure>
		<div class="card-body">
			<h2 class="card-title">{meal.dish}</h2>
			<p>{meal.recipe}</p>
			<div class="card-actions justify-end">
				<div class="badge badge-outline">{meal.chef}</div>
				<div class="badge badge-outline">£{meal.cost}</div>
			</div>
		</div>
		<div class="m-4 flex justify-evenly gap-4">
			<button class="btn btn-primary w-36">Favourite</button>
			<button
				on:click={() => goto(`/feed/${$page.params.dish}/delete`)}
				class="btn btn-secondary w-36">Delete</button
			>
		</div>
	</div>
</section>
