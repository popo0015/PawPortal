<script>
	import { getContext, onMount } from 'svelte';
	import TimeSlot from './TimeSlot.svelte';

	let timeslots = [];
	let appointments = [];
	let loading = true;
	let error = null;

	let selectedDateId = 246;

	// Fetch timeslots and appointments
	onMount(async () => {
		try {
			// Fetch timeslot URLs
			const response = await fetch(`https://appointments-fe6c.onrender.com/api/v1/timeslots/`);
			if (!response.ok) throw new Error('Failed to fetch timeslot URLs');

			const { data: timeslotUrls } = await response.json();

			// Fetch timeslot details
			timeslots = await Promise.all(
				timeslotUrls.map(async (url) => {
					const res = await fetch(`${getContext('apiReference').mainUrl}${url}`);
					return await res.json();
				})
			);

			const appointmentResponse = await fetch(`${getContext('apiReference').mainUrl}/appointments`);
			if (!appointmentResponse.ok) throw new Error('Failed to fetch appointments');

			const { data: appointmentUrls } = await appointmentResponse.json();

			// Fetch appointment details
			appointments = await Promise.all(
				appointmentUrls.map(async (url) => {
					const res = await fetch(`${getContext('apiReference').mainUrl}${url}`);
					return await res.json();
				})
			);
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});
</script>

<!-- Input field to allow the user to select a day -->
<div class="mb-4">
	<label for="dateId" class="mr-2">Select a Date ID (1-365):</label>
	<input
		type="number"
		id="dateId"
		bind:value={selectedDateId}
		min="1"
		max="365"
		class="border px-2 py-1"
	/>
</div>

{#if loading}
	<p>Loading...</p>
{/if}

{#if error}
	<p>Error: {error}</p>
{/if}

<!-- Pass the selectedDateId to each TimeSlot -->
{#if !loading && !error}
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each timeslots as timeslot}
			<TimeSlot {timeslot} {appointments} selectedDateId={selectedDateId} />
		{/each}
	</div>
{/if}
