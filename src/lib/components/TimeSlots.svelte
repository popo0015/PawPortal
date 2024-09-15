<script>
	import { onMount } from 'svelte';
	import TimeSlot from './TimeSlot.svelte';

	let genericData = [];

	onMount(async () => {
		const response = await fetch('https://appointments-fe6c.onrender.com/api/v1/timeslots/');
		const jsonData = await response.json();
		// only read the data property from the response
		genericData = jsonData.data;
	});
</script>

<div>
    {#await genericData}
        <p class="text-center text-gray-600">Fetching timeslots...</p>
    {:then timeslotEntries}
        <section class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {#each timeslotEntries as timeslotEntry}
                <article>
                    <TimeSlot timeslotUrl={timeslotEntry} />
                </article>
            {/each}
        </section>
    {/await}
</div>

