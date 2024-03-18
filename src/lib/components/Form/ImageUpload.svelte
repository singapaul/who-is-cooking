<script lang="ts">
	import { user, userData, storage, db } from '$lib/firebase';
	import { doc, updateDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	let previewURL: string;
	let uploading = false;
	$: href = `/${$userData?.username}/edit`;

	async function upload(e: any, id: string) {
		uploading = true;
		const file = e.target.files[0];
		previewURL = URL.createObjectURL(file);
		const storageRef = ref(storage, `meals/${id}/meal.png`);
		const result = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(result.ref);
		await updateDoc(doc(db, 'meals', id), { photoURL: url });
		uploading = false;
	}
</script>

<form class="w-full max-w-screen-md">
	<div class="form-control mx-auto my-10 w-full max-w-xs text-center">
		<img src={previewURL ?? '/user.png'} alt="photoURL" width="256" height="256" class="mx-auto" />
		<label for="photoURL" class="label">
			<span class="label-text">Pick a file</span>
		</label>
		<input
			on:change={upload}
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
</form>

<a {href} class="btn btn-primary"> Finish </a>
