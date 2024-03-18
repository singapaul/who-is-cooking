<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.pcss';
	import { user } from '$lib/firebase';
</script>

<div class="flex h-screen flex-col overflow-y-scroll">
	{#if $user}
		<NavBar siteName="Cooking Order" />
	{/if}
	<slot />
</div>
