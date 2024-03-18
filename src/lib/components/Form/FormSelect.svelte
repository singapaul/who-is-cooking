<script lang="ts">
	export let fieldName: string = 'fieldName';
	export let handleChange: any = () => console.log('pressed');
	export let errors: string | null | undefined;
	export let bindValue: any;
	export let label: string;
</script>

<label for={fieldName} class="form-control w-full">
	<div class="label">
		<span class="font-bold">{label}</span>

		<span class="label-text">
			{#if errors}
				<small>{errors}</small>
			{/if}</span
		>
	</div>
	<select
		class={`select select-bordered ${errors && `select-error`}`}
		id={fieldName}
		on:change={handleChange}
		bind:value={bindValue}
	>
		<option disabled selected>Pick one</option>
		<option value="Hugo">Hugo</option>
		<option value="James">James</option>
		<option value="Matt">Matt</option>
		<option value="Rob">Rob</option>
		<option value="Henry">Henry</option>
		<option value="Pelayo">Pelayo</option>
		<option value="Paul">Paul</option>
	</select>
</label>
