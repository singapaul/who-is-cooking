<script lang="ts">
	export let dish: string;
	export let chef: string;
	export let photoURL: string;
	export let cost: number;
	export let createdAt: any;
	export let link: string;
	import { goto } from '$app/navigation';
	$: formattedDate = new Date(createdAt.seconds * 1000).toDateString();

	function handleClick() {
		goto(`/feed/${link}`);
	}
</script>

<div class="card h-96 w-96 bg-base-100 shadow-xl">
	<figure class="">
		<img src={photoURL} alt={dish} class="object-fill" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{dish}</h2>
		<p>{formattedDate}</p>
		<div class="card-actions flex items-center justify-between">
			<div>
				<div class="badge badge-outline">{chef}</div>
				<div class="badge badge-outline">£{cost}</div>
			</div>
			<button on:click={handleClick} class="btn btn-primary">See dish</button>
		</div>
	</div>
</div>
