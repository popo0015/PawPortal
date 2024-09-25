<script>
	import { getContext, onMount } from 'svelte';
	import TimeSlot from './TimeSlot.svelte';

	let timeslots = [];
	let appointments = [];
	let loading = true;
	let error = null;

	let selectedDate = new Date();
	let selectedDateId = calculateDateId(selectedDate);

	// Store API reference context outside of onMount
	const apiReference = getContext('apiReference');

	// Function to calculate the Date ID
	function calculateDateId(date) {
		const start = new Date(date.getFullYear(), 0, 0);
		const diff = date - start;
		const oneDay = 1000 * 60 * 60 * 24;
		return Math.floor(diff / oneDay);
	}

	// Update the Date ID when the user selects a new date
	function handleDateChange(event) {
		selectedDate = new Date(event.target.value);
		selectedDateId = calculateDateId(selectedDate);
	}

	// Fetch timeslots and appointments
	onMount(async () => {
		try {
			const response = await fetch(`${apiReference.mainUrl}/timeslots`);
			if (!response.ok) throw new Error('Failed to fetch timeslot URLs');

			const { data: timeslotUrls } = await response.json();

			timeslots = await Promise.all(
				timeslotUrls.map(async (url) => {
					const res = await fetch(`${getContext('apiReference').mainUrl}${url}`);
					return await res.json();
				})
			);

			const appointmentResponse = await fetch(`${apiReference.mainUrl}/appointments`);
			if (!appointmentResponse.ok) throw new Error('Failed to fetch appointments');

			const { data: appointmentUrls } = await appointmentResponse.json();

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

<!-- Date picker input for selecting a date -->
<div class="mb-4">
	<label for="date">Select a Date:</label>
	<input
		type="date"
		id="date"
		on:change={handleDateChange}
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
