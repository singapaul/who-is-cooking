<script>
	export let icon = 'default';
	export let url = 'foo';
	export let title = 'some cool title';
</script>

<a
	href={url}
	class="not-prose stack flex w-full max-w-md items-center justify-center rounded-lg bg-base-300 p-4 text-center no-underline"
>
	<img src={`/${icon}.png`} alt={icon} width="32" height="32" class="w-8" />
	<span class="text-lg font-bold text-white">{title}</span>
</a>
