<script lang="ts">
	import { page } from '$app/stores';
	import UserLink from '$lib/components/UserLink.svelte';
	import SortableList from '$lib/components/SortableList.svelte';
	import { db, userData, user } from '$lib/firebase';
	import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
	import { writable } from 'svelte/store';
	const icons = ['Twitter', 'YouTube', 'TikTok', 'LinkedIn', 'GitHub', 'Custom'];
	$user;
	const formDefaults = {
		icon: 'custom',
		title: '',
		url: 'https://'
	};

	const formData = writable(formDefaults);

	let showForm = false;

	$: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
	$: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
	$: formIsValid = urlIsValid && titleIsValid;

	async function addLink(e: SubmitEvent) {
		const userRef = doc(db, 'users', $user!.uid);

		await updateDoc(userRef, {
			links: arrayUnion({
				...$formData,
				id: Date.now().toString()
			})
		});

		formData.set({
			icon: '',
			title: '',
			url: ''
		});

		showForm = false;
	}

	function cancelLink() {
		formData.set(formDefaults);
		showForm = false;
	}

	function sortList(e: CustomEvent) {
		console.log(e);
		const newList = e.detail;
		const userRef = doc(db, 'users', $user!.uid);
		setDoc(userRef, { links: newList }, { merge: true });
	}

	async function deleteLink(item: any) {
		const userRef = doc(db, 'users', $user!.uid);
		await updateDoc(userRef, {
			links: arrayRemove(item)
		});
	}
</script>

<main class="mx-auto max-w-xl">
	{#if $userData?.username == $page.params.username}
		<h1 class="mx-2 mb-4 mt-8 text-center text-2xl font-bold">Edit your Profile</h1>

		<SortableList list={$userData?.links} on:sorty={sortList} let:item let:index>
			<div class="group relative">
				<UserLink {...item} />
				<button
					on:click={() => deleteLink(item)}
					class="btn btn-error btn-xs invisible absolute -right-6 bottom-10 transition-all group-hover:visible"
					>Delete</button
				>
			</div>
		</SortableList>

		{#if showForm}
			<form on:submit|preventDefault={addLink} class="mx-auto w-full rounded-xl bg-base-200 p-6">
				<select name="icon" class="select select-sm" bind:value={$formData.icon}>
					{#each icons as icon}
						<option value={icon.toLowerCase()}>{icon}</option>
					{/each}
				</select>
				<input
					name="title"
					type="text"
					placeholder="Title"
					class="input input-sm"
					bind:value={$formData.title}
				/>
				<input
					name="url"
					type="text"
					placeholder="URL"
					class="input input-sm"
					bind:value={$formData.url}
				/>
				<div class="my-4">
					{#if !titleIsValid}
						<p class="text-xs text-error">Must have valid title</p>
					{/if}
					{#if !urlIsValid}
						<p class="text-xs text-error">Must have a valid URL</p>
					{/if}
					{#if formIsValid}
						<p class="text-xs text-success">Looks good!</p>
					{/if}
				</div>

				<button disabled={!formIsValid} type="submit" class="btn btn-success block">Add Link</button
				>

				<button type="button" class="btn btn-xs my-4" on:click={cancelLink}>Cancel</button>
			</form>
		{:else}
			<button
				on:click={() => (showForm = true)}
				class="btn btn-outline btn-info mx-auto my-4 block"
			>
				Add a Link
			</button>
		{/if}
	{/if}
</main>
