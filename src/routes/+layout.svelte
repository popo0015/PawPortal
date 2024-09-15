<script>
	import "../app.css";

    let isNavOpen = false;
</script>

<style>
    :global(body) {
		background-color: #f0f9f4;
		color: #333;
		font-family: 'Open Sans', sans-serif;
	}
</style>

<!-- Main layout -->
<section class="flex 100vh">
	<!-- Sidebar Navigation -->
	<header class={`fixed top-0 left-0 h-full bg-green-950 ${isNavOpen ? 'w-48' : 'w-16'} transition-width duration-300 ease-in-out`}>
		<button class="flex items-center justify-center px-5 py-4 cursor-pointer" on:click={() => isNavOpen = !isNavOpen}>
            <img width="24" height="24" src="https://img.icons8.com/ios-filled/24/menu--v6.png" alt="menu--v6" class="filter invert"/>
        </button>

		<!-- Navigation Links -->
		<nav class="flex flex-col space-y-6 mt-10">
			<a href="#" class="flex items-center justify-center hover:bg-gray-700 text-white px-4 py-2">
                <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/24/home--v1.png" alt="home--v1" class="filter invert"/>
                <span class={`ml-4 ${isNavOpen ? 'block' : 'hidden'}`}>Home</span>
			</a>

			<a href="#" class="flex items-center justify-center hover:bg-gray-700 text-white px-4 py-2">
                <img width="24" height="24" src="https://img.icons8.com/pastel-glyph/24/appointment-time.png" alt="appointment-time" class="filter invert"/>
                <span class={`ml-4 ${isNavOpen ? 'block' : 'hidden'}`}>Appointments</span>
			</a>

			<a href="#" class="flex items-center justify-center hover:bg-gray-700 text-white px-4 py-2">
                <img width="24" height="24" src="https://img.icons8.com/pulsar-line/24/search-client.png" alt="search-client" class="filter invert"/>
                <span class={`ml-4 ${isNavOpen ? 'block' : 'hidden'}`}>Clients</span>
			</a>
		</nav>
	</header>

	<!-- Main content -->
	<main class="ml-16 flex-1 p-8 transition-all duration-300" style={`margin-left: ${isNavOpen ? '12rem' : '4rem'}`}>
    <slot />
    </main>
</section>

<footer class="bg-green-950 py-4 fixed bottom-0 w-full">
    <div class="container mx-auto text-center">
        <p class="text-white text-sm">
            Developed with 💙 by <span class="font-semibold text-white">Silvia Popova</span>
        </p>
    </div>
</footer>
