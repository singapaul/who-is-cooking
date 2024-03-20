<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.pcss';
	import { user } from '$lib/firebase';
	import Toast from '$lib/components/Toast.svelte';
</script>

<div class="flex h-screen flex-col overflow-y-scroll">
	{#if $user}
		<NavBar siteName="Cooking Order" />
	{/if}
	<slot />
	<Toast />
</div>
