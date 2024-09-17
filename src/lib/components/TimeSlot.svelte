<script>
	export let timeslot;
</script>

<div
  class="flex flex-col w-full border-l-4 p-2 rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out
  {timeslot.appointment ? 'bg-gray-200 border-gray-400' : 'bg-white border-green-200 hover:border-green-500 hover:bg-green-50'}"
  style="{timeslot.appointment ? 'background-image: repeating-linear-gradient(45deg, rgba(150, 150, 150, 0.1) 0%, rgba(150, 150, 150, 0.1) 15%, transparent 15%, transparent 50%); background-size: 10px 10px;' : ''}">
  <div class="flex items-center justify-center {timeslot.appointment ? 'text-gray-700' : 'text-green-700'}">
    <p>{timeslot.starttime ? timeslot.starttime : 'No Time'}</p>
  </div>
  <div class="flex items-center justify-center">
    {#if timeslot.appointment}
      <p class="overflow-hidden whitespace-nowrap text-ellipsis">{timeslot.appointment.name}</p>
    {:else}
      <p>Free</p>
    {/if}
  </div>
</div>
