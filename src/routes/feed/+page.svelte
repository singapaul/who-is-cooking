<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data);
</script>

<main
	class="mx-auto mb-5 mt-10 grid w-fit grid-cols-1 justify-center justify-items-center gap-x-14 gap-y-20 md:grid-cols-2 lg:grid-cols-3"
>
	{#each data.data as item}
		<Card
			createdAt={item.createdAt}
			chef={item.chef}
			cost={item.cost}
			dish={item.dish}
			photoURL={item.photoURL}
			link={item.id}
		/>
	{/each}
</main>
