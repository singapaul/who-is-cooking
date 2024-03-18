<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.pcss';
</script>

<div class="flex h-screen flex-col overflow-y-scroll">
	<NavBar siteName="Cooking Order" />
	<slot />
</div>
