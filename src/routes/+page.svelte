<script>
	import Client from '$lib/components/Client.svelte';
	import Clients from '$lib/components/Clients.svelte';
	import TimeSlots from '$lib/components/TimeSlots.svelte';
	import { setContext } from 'svelte';

	let timeslots = [];
	let appointments = [];
	let todayAppointments = [];

	setContext('apiReference', {
		mainUrl: 'https://appointments-fe6c.onrender.com/api/v1'
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte PawPortal" />

	<link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Main container -->
<main class="mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="text-center mb-8 relative">
		<p class="text-3xl text-green-400 font-light absolute w-full" style="font-family: 'Satisfy', cursive; top: -25px;">
			View possible
		</p>
		<h1 class="text-4xl md:text-5xl font-bold text-gray-900 relative z-10">Appointments</h1>
	</div>

	<section class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
		<!-- TimeSlots Card -->
		<div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-8">
			<h2 class="text-2xl font-semibold text-gray-800 mb-4">Available Time Slots</h2>
			<TimeSlots />
		</div>

		<!-- Client Card -->
		<div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-8">
			<h2 class="text-2xl font-semibold text-gray-800 mb-4">Client Information</h2>
			<Client />
		</div>
	</section>

	<!-- Clients Section -->
	<div class="text-center mb-8 relative">
		<p class="text-3xl text-green-400 font-light absolute w-full" style="font-family: 'Satisfy', cursive; top: -25px;">
			View your
		</p>
		<h1 class="text-4xl md:text-5xl font-bold text-gray-900 relative z-10">Clients</h1>
	</div>
	<section class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-8">
		<Clients />
	</section>
</main>
