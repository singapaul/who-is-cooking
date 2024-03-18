<script lang="ts">
	import CurrencyInput from '@canutin/svelte-currency-input';
	export let fieldName: string = 'fieldName';
	export let handleChange: any = () => console.log('pressed');
	export let errors: string | null | undefined;
	export let label: string = 'Form label';
	export let bindValue: number;
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
	<div class={`my-currency-input ${errors && 'my-currency-input-error'}`}>
		<CurrencyInput on:change={handleChange} bind:value={bindValue} currency="GBP" name="cost" />
	</div>
</label>

<style>
	/* Container */
	div.my-currency-input :global(div.currencyInput) {
	}

	/* Formatted input */
	div.my-currency-input :global(input.currencyInput__formatted) {
		width: 100%;
		background: transparent;
		border-radius: 0.5rem;
	}

	/* Formatted input when the it's disabled */
	div.my-currency-input :global(input.currencyInput__formatted:disabled) {
		/* ... */
	}

	/* Formatted input when the value is zero */
	div.my-currency-input :global(input.currencyInput__formatted--zero) {
		/* ... */
	}

	/* Formatted input when the value is positive */
	div.my-currency-input :global(input.currencyInput__formatted--positive) {
		/* ... */
	}

	/* Error state for CurrencyInput */
	div.my-currency-input-error :global(input.currencyInput__formatted) {
		border: 1px solid red;
	}
</style>
