<script>
	import { getContext, onMount } from 'svelte';

	export let timeslot;
	export let appointments;
	export let selectedDateId;

	let data = {};
	let loading = true;
	let error = null;

	const apiUrl = `${getContext('apiReference').mainUrl}/timeslots/${timeslot.id}`;

	// Fetching data on component mount
	onMount(async () => {
		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error('Failed to fetch timeslot data');
			}
			data = await response.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	// Reactive declaration to check for appointment when selectedDateId changes
	$: appointmentForTimeslot = appointments.find(
		(appointment) =>
			appointment.theDateId === selectedDateId && appointment.timeslotId === timeslot.id
	);
</script>

<!-- Loading state -->
{#if loading}
	<p>Loading...</p>
{/if}

<!-- Error state -->
{#if error}
	<p>Error: {error}</p>
{/if}

<!-- Render timeslot as a block -->
{#if !loading && !error}
	<div 
		class="mt-3 appointment cursor-pointer bg-opacity-80 transition-all absolute"
		style="
		top: calc(({parseInt(data.starttime.split('.')[0])} - 9) * 11rem + ({parseInt(
			data.starttime.split('.')[1]
		)} / 15 * 2.75rem));
		height: 40px; /* Fixed height for the timeslot */
		left: 0; 
		right: 0; 
		overflow: hidden;"
	>
		<div class="flex flex-col justify-between h-full">
			{#if appointmentForTimeslot}
				<div class="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
					Booked
					<div class="text-white font-medium">
						{appointmentForTimeslot.name}
					</div>
				</div>
			{:else}
				<div class="bg-gray-200 text-gray-500 text-xs font-semibold px-2 py-1 rounded-md">
					Available
					<div class="text-gray-400">---</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
