<script lang="ts">
	import { page } from '$app/stores';
	import AnimatedRoute from '$lib/components/AnimatedRoute.svelte';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { navProgress } from '$lib/store/nav';
</script>

<div class="flex min-h-screen flex-col">
	<!-- <ProgressBar label="Progress Bar" value={$navProgress} max={99} /> -->
	<progress class="progress w-full" value={$navProgress} max="99"></progress>
	<AnimatedRoute>
		<main class="card mx-auto w-4/6 bg-neutral text-neutral-content">
			<div class="card-body items-center text-center">
				<slot />
			</div>
		</main>
	</AnimatedRoute>
</div>
