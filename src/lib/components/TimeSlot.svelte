<script>
	import { appointment } from "$lib/stores/appointmentsStore";
	export let contents;

	/**
	 * This function displays the appointment details and sets the appointment store
	 * @param selectedAppointment
	 */
	const displayAppointmentDetails = (selectedAppointment) => {
		console.log(selectedAppointment);
		$appointment.name = selectedAppointment.appointment.name;
		$appointment.breed = selectedAppointment.appointment.breed;
		$appointment.starttime = selectedAppointment.starttime;
		$appointment.state = selectedAppointment.appointment.state;

	};
</script>

<div class="appointment" id={contents.id}>
	{#if contents.appointment}
		<ul class="bg-teal-100 flex flex-wrap justify-between rounded-lg p-2">
			<li class="rounded-l-lg p-1">{contents.starttime}</li>
			<li class="p-1">{contents.appointment.name}</li>
			<li class=""><button class="p-1 cursor-pointer hover:text-red-400 hover:rotate-45" on:click={() => displayAppointmentDetails(contents)}>⎋</button></li>
		</ul>
	{:else}
		<ul class="flex flex-wrap justify-between bg-slate-100 rounded-lg">
			<li class="bg-slate-100 mr-2 p-2 rounded-l-lg">{contents.starttime}</li>
			<li class="bg-slate-100 mr-2 p-2">-</li>
		</ul>
	{/if}
</div>

<!-- <div 
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
	</div> -->