<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Grid from '$lib/components/Grid.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Grid>
	{#each data.typed as item}
		<Card
			createdAt={item.createdAt}
			chef={item.chef}
			cost={item.cost}
			dish={item.dish}
			photoURL={item.photoURL}
			link={item.id}
		/>
	{/each}
</Grid>
