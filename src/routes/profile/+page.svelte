<script lang="ts">
	import type { PageData } from './$types';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	export let data: PageData;
</script>

<AuthCheck>
	<main class="flex h-full flex-col justify-center self-center">
		<a href="/login/photo" class="btn btn-accent max-w-56">Update profile picture</a>
	</main>
</AuthCheck>
