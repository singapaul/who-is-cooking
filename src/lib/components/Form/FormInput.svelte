<script lang="ts">
	export let fieldName: string = 'fieldName';
	export let handleChange: any = () => console.log('pressed');
	export let errors: string | null | undefined;
	export let bindValue: any;
	export let label: string;
</script>

<label class="form-control" for={fieldName}>
	<div class="label">
		<span class="font-bold">{label}</span>
		<span class="label-text">
			{#if errors}
				<small>{errors}</small>
			{/if}</span
		>
	</div>

	<input
		type="text"
		placeholder="Dish name..."
		class="input input-bordered w-full"
		id={fieldName}
		on:change={handleChange}
		bind:value={bindValue}
	/>
</label>
