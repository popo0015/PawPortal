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
<div class="flex items-center justify-center mb-6">
	<label for="date" class="mr-4 font-medium text-gray-700">Select a Date:</label>
	<input
		type="date"
		id="date"
		on:change={handleDateChange}
		class="border-2 border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
	/>
</div>

{#if loading}
	<div class="flex justify-center items-center py-10">
		<p class="text-blue-500 text-lg font-semibold">Loading...</p>
	</div>
{/if}

{#if error}
	<div class="flex justify-center items-center py-10">
		<p class="text-red-500 text-lg font-semibold">Error: {error}</p>
	</div>
{/if}

<!-- Time slot container styled like a calendar/schedule -->
{#if !loading && !error}
	<div class="relative h-full flex">
		<div class="w-24 flex flex-col items-end pr-4">
			<div class="h-11 text-gray-500 text-sm">9:00</div>
			<div class="h-11 text-gray-500 text-sm">9:15</div>
			<div class="h-11 text-gray-500 text-sm">9:30</div>
			<div class="h-11 text-gray-500 text-sm">9:45</div>
			<div class="h-11 text-gray-500 text-sm">10:00</div>
			<div class="h-11 text-gray-500 text-sm">10:15</div>
			<div class="h-11 text-gray-500 text-sm">10:30</div>
			<div class="h-11 text-gray-500 text-sm">10:45</div>
			<div class="h-11 text-gray-500 text-sm">11:00</div>
			<div class="h-11 text-gray-500 text-sm">11:15</div>
			<div class="h-11 text-gray-500 text-sm">11:30</div>
			<div class="h-11 text-gray-500 text-sm">11:45</div>
			<div class="h-11 text-gray-500 text-sm">12:00</div>
			<div class="h-11 text-gray-500 text-sm">12:15</div>
			<div class="h-11 text-gray-500 text-sm">12:30</div>
			<div class="h-11 text-gray-500 text-sm">12:45</div>
			<div class="h-11 text-gray-500 text-sm">13:00</div>
		</div>

		<div class="relative flex-1">
			{#each Array(16) as _, i}
				<div class="absolute left-0 right-0 h-10 border-b border-gray-200" style="top: {i * 40}px;"></div>
			{/each}

			{#each timeslots as timeslot}
				<TimeSlot {timeslot} {appointments} selectedDateId={selectedDateId} />
			{/each}
		</div>
	</div>
{/if}

