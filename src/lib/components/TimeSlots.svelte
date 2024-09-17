<script>
	import { onMount } from 'svelte';
	import TimeSlot from './TimeSlot.svelte';

	let timeslots  = [];

	onMount(async () => {
		const response = await fetch('http://localhost:3010/timeslots/');
		const jsonData = await response.json();
		// only read the data property from the response
		timeslots  = jsonData.timeslots;
	});
</script>

<!-- <div>
    {#await timeslots }
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
</div> -->

<div>
    {#if timeslots.length > 0}
      <section class="grid 2xl:grid-cols-5 xl:lg:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {#each timeslots as timeslot}
          <article>
            <TimeSlot timeslot={timeslot} />
          </article>
        {/each}
      </section>
    {:else}
      <p class="text-center text-gray-600">Fetching timeslots...</p>
    {/if}
  </div>
  
