<script lang="ts">
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { user } from '$lib/firebase';

	import { navProgress } from '$lib/store/nav';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		console.log(user);
	}
	navProgress.set(33);
</script>

<a href="/login/username">USERNAME</a>

<h2>Login</h2>

{#if $user}
	<h2 class="card-title">Welcome, {$user.displayName}</h2>
	<p class="text-center text-success">You are logged in</p>
	<a href="/login/username">Setup username</a>
	<button class="btn btn-warning" on:click={() => signOut(auth)}>Sign out</button>
{:else}
	<button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
