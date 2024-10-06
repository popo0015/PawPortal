<script>
	// data is a prop passed from the server
	export let data;
</script>

<section class="ml-16 mt-24 p-8 transition-all duration-300">
	<h2 class="text-center text-2xl">Appointments</h2>
	<table class="table-auto border-separate text-xs text-center">
		<thead><tr><th>Date</th><th>Timeslot</th><th>Name</th><th>Breed</th><th>State</th></tr></thead>
		<tbody>
			{#each data.appointments as item}
				<tr class="odd:bg-white even:bg-slate-50 hover:bg-teal-50 hover:cursor-pointer">
					<td class="p-5">{item.theDateId}</td>
					<td class="p-5">{item.timeslotId}</td>
					<td class="p-5">{item.name}</td>
					<td class="p-5">{item.breed}</td>
					<td class="p-5">{item.state}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
