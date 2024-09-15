<script>
	export let timeslotUrl;
	let starttime;

	// Fetch the timeslot data when the component mounts
	async function fetchTimeslot() {
		try {
			const response = await fetch(`https://appointments-fe6c.onrender.com/api/v1${timeslotUrl}`);
			const data = await response.json();

			starttime = data.starttime;
		} catch (error) {
			console.error('Error fetching timeslot:', error);
		}
	}

	fetchTimeslot();
</script>

<div class="flex w-full pl-4 pr-4 border-l-4 border-green-100 hover:border-green-400 rounded-lg shadow-sm overflow-hidden bg-white hover:bg-green-50 transition-all duration-300 ease-in-out">
    <div class="w-1/2 flex items-center justify-center p-4 text-green-700">
        <p>{starttime ? starttime : 'Loading...'}</p>
    </div>
    <div class="w-1/2 flex items-center justify-center pl-4">
        <p>-</p>
    </div>
</div>