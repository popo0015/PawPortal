<script>
	import { getContext, onMount } from 'svelte';
	import TimeSlot from './TimeSlot.svelte';

	let scheduleToDay = [];

	// The routes we are going to use; with a hardcoded day
	const timeSlotsApiRoute = `${getContext('apiReference').mainUrl}timeslots/`;
	const allAppointmentsOnOneDay = `${getContext('apiReference').mainUrl}appointments?day=246`;

	/**
	 * This function fetches the data from the API
	 * @param url
	 */
	const getData = async (url) => {
		try {
			const response = await fetch(url);
			const items = await response.json();
			return items;
		} catch (error) {
			return error;
		}
	};

	/**
	 * This function handles multiple request
	 * @param urls
	 */
	const getPromisesData = async (urls) => {
		try {
			const response = await Promise.all(urls);
			return response;
		} catch (error) {
			return error;
		}
	};

	/**
	 * This function checks if the appointment is on an a specific time slot
	 * @param timeSlotId
	 * @param data
	 */
	const inAppointment = (timeSlotId, data) => {
		const appointment = data.find((appointment) => appointment.timeslotId === timeSlotId);
		return appointment;
	};

	// Fetching data on component mount
	onMount(async () => {
		// Fetch all the time slots and appointments
		const allTheTimeSlots = await getData(timeSlotsApiRoute);
		const allTheAppointmentsOnOneDay = await getData(allAppointmentsOnOneDay);

		// extract all the urls from the response
		const allTheUrlsOfTheTimeSlots = allTheTimeSlots.data;
		const allTheUrlsOfTheAppointmentsOnOneDay = allTheAppointmentsOnOneDay.data;

		// we have to execute multiple requests and wait for all te response to come back, so promisify the requests
		const timeSlotPromises = allTheUrlsOfTheTimeSlots.map((url) =>
			getData(`https://appointments-fe6c.onrender.com/api/v1${url}`)
		);
		const appointmentPromises = allTheUrlsOfTheAppointmentsOnOneDay.map((url) =>
			getData(`https://appointments-fe6c.onrender.com/api/v1${url}`)
		);

		// get the response data from the promises
		const timeSlotData = await getPromisesData(timeSlotPromises);
		const appointmentData = await getPromisesData(appointmentPromises);

		// fill the schedule with appointments
		// map function returns a new array with the same length as the original array
		scheduleToDay = timeSlotData.map((timeslot) => {
			if (inAppointment(timeslot.id, appointmentData)) {
				return {
					...timeslot,
					appointment: inAppointment(timeslot.id, appointmentData)
				};
			} else {
				return {
					...timeslot,
					appointment: undefined
				};
			}
		});
		console.log(scheduleToDay);
	});
	
</script>

<!-- Render data when available -->
 <div></div>
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
	{#each scheduleToDay as item}
		<TimeSlot contents={item} />
	{/each}
</div>