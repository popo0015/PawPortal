<script>
	export let data;

	function getDateFromDayOfYear(dayOfYear) {
		const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		let month = 0;

		if (dayOfYear > 365) {
			throw new Error('Day of year must be between 1 and 365');
		}

		while (dayOfYear > monthDays[month]) {
			dayOfYear -= monthDays[month];
			month++;
		}

		return `${dayOfYear}/${month + 1}`;
	}
</script>

<section class="text-center">
	<div class="text-center mb-8 relative">
		<p class="text-3xl text-green-400 font-light absolute w-full" style="font-family: 'Satisfy', cursive; top: -25px;">
			View possible
		</p>
		<h1 class="text-4xl md:text-5xl font-bold text-gray-900 relative z-10">Appointments</h1>
	</div>

	<table class="w-full border-collapse">
		<thead>
			<tr>
				<th class="px-4 py-2">Date ID</th>
				<th class="px-4 py-2">Timeslot</th>
				<th class="px-4 py-2">Name</th>
				<th class="px-4 py-2">Breed</th>
				<th class="px-4 py-2">State</th>
			</tr>
		</thead>
		<tbody>
			{#each data.items.data as item, index}
				<tr class={index % 2 === 0 ? 'bg-white' : 'bg-green-100'}>
					<td class="px-4 py-2">{getDateFromDayOfYear(item.theDateId)}</td>
					<td class="px-4 py-2">{item.timeslotId}</td>
					<td class="px-4 py-2">{item.name}</td>
					<td class="px-4 py-2">{item.breed}</td>
					<td class="px-4 py-2">{item.state}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
