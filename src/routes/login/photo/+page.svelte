<script lang="ts">
	import { navProgress } from '$lib/store/nav';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { user, userData, storage, db } from '$lib/firebase';
	import { doc, updateDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	navProgress.set(99);
	let previewURL: string;
	let uploading = false;
	$: href = `/`;

	async function upload(e: any) {
		uploading = true;
		const file = e.target.files[0];
		previewURL = URL.createObjectURL(file);
		const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
		const result = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(result.ref);

		await updateDoc(doc(db, 'users', $user!.uid), { photoURL: url });
		uploading = false;
	}
</script>

<AuthCheck>
	<h2 class="card-title">Upload a Profile Photo</h2>

	<form class="w-full max-w-screen-md">
		<div class="form-control mx-auto my-10 w-full max-w-xs text-center">
			<img
				src={previewURL ?? $userData?.photoURL ?? '/user.png'}
				alt="photoURL"
				width="256"
				height="256"
				class="mx-auto"
			/>
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
</AuthCheck>
