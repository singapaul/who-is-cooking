<script lang="ts">
	import { user, userData, auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';
	import { page } from '$app/stores';
	export let siteName: string = 'placeholder';

	$: homeNav = $page.route.id === '/';
	$: feedNav = $page.route.id === '/feed';
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href={feedNav ? '/new-meal' : '/feed'} class="btn btn-secondary"
			>{feedNav ? 'Post new meal' : 'Feed'}</a
		>
	</div>

	<div class="flex flex-row gap-4">
		<a href={homeNav ? '/new-meal' : '/'} class="btn btn-primary"
			>{homeNav ? 'Post New Meal' : 'Cooking Rota'}</a
		>
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
				<div class="w-10 rounded-full">
					<img alt="Tailwind CSS Navbar component" src={$userData?.photoURL} />
				</div>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
			>
				<li>
					<!-- svelte-ignore a11y-missing-attribute -->
					<a class="justify-between"> Profile </a>
				</li>
				<!-- svelte-ignore a11y-missing-attribute -->
				<li><button on:click={() => signOut(auth)}>Logout</button></li>
			</ul>
		</div>
	</div>
</div>
