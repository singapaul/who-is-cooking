<script lang="ts">
	import { user } from '$lib/firebase';
</script>

{#if $user}
	<slot />
{:else}
	<p>You must be signed in to view this page</p>
	<a href="/login">Sign in </a>
{/if}
