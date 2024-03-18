<script lang="ts">
	import { user } from '$lib/firebase';
</script>

{#if $user}
	<slot />
{:else}
	<main class="flex h-screen w-full flex-col items-center justify-center gap-4 self-center">
		<h1>You must be signed in to view this page</h1>
		<a class="btn btn-primary" href="/login">Sign in </a>
	</main>
{/if}
