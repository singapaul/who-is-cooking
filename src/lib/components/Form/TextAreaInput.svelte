<script lang="ts">
	export let fieldName: string = 'fieldName';
	export let handleChange: any = () => console.log('pressed');
	export let errors: string | null | undefined;
	export let bindValue: any;
	export let label: string;
</script>

<label class="form-control">
	<div class="label">
		<span class="font-bold">{label}</span>
		<span class="label-text">
			{#if errors}
				<small>{errors}</small>
			{/if}</span
		>
	</div>
	<textarea
		class="textarea textarea-bordered h-24"
		placeholder="Please enter a short description of the recipe or a link to the recipe used"
		id={fieldName}
		on:change={handleChange}
		bind:value={bindValue}
	></textarea>
</label>
