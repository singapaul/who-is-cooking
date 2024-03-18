<script lang="ts">
    import type { PageData } from './$types';
    import { user, userData } from '$lib/firebase';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
    export let data: PageData;
</script>


<AuthCheck>
    <h1>
        Hi {$user?.displayName}
    </h1>
</AuthCheck>
