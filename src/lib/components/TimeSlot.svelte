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
	$: appointmentForTimeslot = appointments.find(appointment => 
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

<!-- Render data when available -->
{#if !loading && !error}
	<div class="appointment cursor-pointer" id={timeslot.id}>
		<ul class="flex flex-wrap justify-between rounded-lg {appointmentForTimeslot ? 'border-2 bg-slate-100 border-slate-300' : 'bg-green-100'}">
			<li class="mr-2 p-2 rounded-l-lg">{data.starttime}</li>
			<li class="mr-2 p-2">
				{#if appointmentForTimeslot}
					<span>
						{appointmentForTimeslot.name}
					</span>
				{:else}
					<span class="text-gray-500">---</span>
				{/if}
			</li>
		</ul>
	</div>
{/if}