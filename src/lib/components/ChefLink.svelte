<script lang="ts">
	export let name = 'placeholder';
	export let index: number;
</script>

<a
	class="not-prose stack flex w-full min-w-80 max-w-md items-center justify-center rounded-lg bg-base-300 p-4 text-center no-underline"
>
	<p>{index}</p>
	<p>{name}</p>
</a>
