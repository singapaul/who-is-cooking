<script lang="ts">
	import { page } from '$app/stores';
    import { doc, deleteDoc } from 'firebase/firestore';
    import {db} from '$lib/firebase'
    import { goto } from '$app/navigation';
	console.log($page.params.dish);

    const handleDelete = async () => {
       await deleteDoc(doc(db, "meals", $page.params.dish));
       goto('/')
    }

    const handleCancel = () => {
        goto('/feed')
    }
</script>

<section class="flex flex-col max-w-80 w-full h-full self-center justify-center gap-10">
	<h1 class="text-center text-2xl font-bold">Are you sure you want to delete this delicious dinner?</h1>
    <div class='flex gap-4 justify-center'>
	<button class='btn btn-primary' on:click={handleDelete}> Yes </button>
	<button class="btn btn-secondary" on:click={handleCancel}>No</button>
</div>
</section>
