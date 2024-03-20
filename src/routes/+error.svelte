<script lang="ts">
    import { page } from '$app/stores';
 
</script>

<main class='w-screen h-screen flex flex-col items-center justify-center gap-4' >
    <h1 class="text-2xl">BOSH YOU'VE HIT A {$page.status}: {$page.error?.message}</h1>
 <img class="max-w-48" src={'/bosh-big-john.gif'} />
</main>
