<script lang="ts">
	import { user, userData } from '$lib/firebase';
	export let siteName: string = 'placeholder';
	import { page } from '$app/stores';

	$: homeNav = $page.route.id === '/';
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/feed" class="btn btn-secondary">View Feed</a>
	</div>
	<div class="flex-1">
		<a class="btn btn-ghost text-xl">{siteName}</a>
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
				<li><a>Logout</a></li>
			</ul>
		</div>
	</div>
</div>
