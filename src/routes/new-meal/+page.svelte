<script lang="ts">
	import FormInput from '$lib/components/Form/FormInput.svelte';
	import { createForm } from 'svelte-forms-lib';
	import { goto } from '$app/navigation';
	import FormSelect from '$lib/components/Form/FormSelect.svelte';
	import TextAreaInput from '$lib/components/Form/TextAreaInput.svelte';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { user, userData, storage, db } from '$lib/firebase';
	import { addDoc, collection, setDoc, serverTimestamp } from 'firebase/firestore';
	import { doc, updateDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import CurrencyInput from '@canutin/svelte-currency-input';

	console.log($user?.email);

	type FormData = {
		chef: string;
		dish: string;
		cost: number;
		recipe: string;
		photoURL: string | null | undefined | any;
	};

	let previewURL: string;
	let uploading = false;
	$: href = `/${$userData?.username}/edit`;
	let fileToUpload: Blob | Uint8Array | ArrayBuffer;

	async function photoInput(e: any) {
		handleChange(e);
		previewImage(e);
	}

	async function previewImage(e: any) {
		handleChange(e);
		const file = e.target.files[0];
		previewURL = URL.createObjectURL(file);
		fileToUpload = file;
	}
	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			dish: '',
			// I don't need to
			// select
			chef: '',
			// currency input
			cost: 0,
			// text area
			recipe: '',
			// file input
			photoURL: null
		},
		validate: (values) => {
			let errs = {};
			if (values.dish === '') {
				errs['dish'] = 'dish is required';
			}
			if (values.chef === '') {
				errs['chef'] = 'chef is required';
			}
			if (values.recipe === '') {
				errs['recipe'] = 'Please enter a recipe or link';
			}
			if (values.cost <= 9 || values.cost >= 99) {
				errs['cost'] = 'Please enter a valid price';
			}
			if (!values.photoURL) {
				errs['photoURL'] = 'Please attach a photo';
			}
			return errs;
		},
		onSubmit: (values) => {
			postRecipeToFirebase($form);
		}
	});

	async function postRecipeToFirebase(data: FormData) {
		const { chef, cost, dish, photoURL, recipe } = data;
		try {
			const docRef = await addDoc(collection(db, 'meals'), {
				chef,
				cost,
				dish,
				photoURL,
				recipe,
				postedById: $user?.uid,
				createdAt: serverTimestamp()
			});
			uploadImage({ docRef: docRef.id }).then(() => goto('/'));
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}

	async function uploadImage({ docRef }: { docRef: string }) {
		uploading = true;
		const storageRef = ref(storage, `meals/${docRef}/meal.png`);
		const result = await uploadBytes(storageRef, fileToUpload);
		const url = await getDownloadURL(result.ref);
		await updateDoc(doc(db, 'meals', docRef), { photoURL: url });
		uploading = false;
	}
</script>

<AuthCheck>
	<form on:submit|preventDefault={handleSubmit} class="m-auto flex max-w-96 flex-col">
		<FormInput
			fieldName={'dish'}
			label={'Dish name'}
			bindValue={$form.dish}
			{handleChange}
			errors={$errors.dish}
		/>
		<FormSelect
			fieldName="chef"
			label="Chef"
			bindValue={$form.chef}
			{handleChange}
			errors={$errors.chef}
		/>
		<TextAreaInput
			fieldName="recipe"
			label="Recipe"
			bindValue={$form.recipe}
			{handleChange}
			errors={$errors.recipe}
		/>
		<!-- currency -->
		<label class="form-control" for={'cost'}>
			<div class="label">
				<span class="font-bold">{'Meal cost (£)'}</span>
				<span class="label-text">
					{#if $errors.cost}
						<small>{$errors.cost}</small>
					{/if}</span
				>
			</div>
			<div class={`my-currency-input ${$errors.cost && 'my-currency-input-error'}`}>
				<CurrencyInput
					on:change={handleChange}
					bind:value={$form.cost}
					currency="GBP"
					name="cost"
				/>
			</div>
		</label>

		<!-- currency -->

		<div class="form-control mx-auto my-10 w-full max-w-xs text-center">
			<img
				src={previewURL ?? '/default-meal.webp'}
				alt="photoURL"
				width="256"
				height="256"
				class="mx-auto max-h-52 object-scale-down"
			/>
			<span class="label-text">
				{#if $errors.photoURL}
					<small>{$errors.photoURL}</small>
				{/if}</span
			>
			<label for="photoURL" class="label">
				<span class="label-text">Pick a file</span>
			</label>
			<input
				on:change={photoInput}
				bind:value={$form.photoURL}
				name="photoURL"
				type="file"
				class="file-input file-input-bordered w-full max-w-xs"
				accept="image/png, image/jpeg, image/gif, image/webp"
			/>
			{#if uploading}
				<p>Uploading...</p>
				<progress class="progress progress-info mt-6 w-56" />
			{/if}
		</div>

		<button type="submit" class="btn btn-primary">submit</button>
	</form>
</AuthCheck>

<style>
	/* Formatted input */
	div.my-currency-input :global(input.currencyInput__formatted) {
		width: 100%;
		background: transparent;
		border-radius: 0.5rem;
	}

	/* Error state for CurrencyInput */
	div.my-currency-input-error :global(input.currencyInput__formatted) {
		border: 1px solid red;
		color: red;
	}
</style>
