<script lang="ts">
	import type { PageData } from './$types';
	import { user, userData } from '$lib/firebase';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	export let data: PageData;

	console.log($user);
	console.log($userData);
</script>

<AuthCheck></AuthCheck>
