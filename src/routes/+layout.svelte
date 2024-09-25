<script>
	import "../app.css";

    let isNavOpen = false;
</script>

<style>
    :global(body) {
		color: #333;
		font-family: 'Open Sans', sans-serif;
	}
</style>

<!-- Main layout -->
<section class="flex">
	<!-- Sidebar Navigation -->
	<header class="fixed top-0 left-0 h-full border-r-2">
		<button class="flex items-center justify-center px-5 py-4 cursor-pointer">
            <img width="24" height="24" src="https://img.icons8.com/ios-filled/24/menu--v6.png" alt="menu--v6"/>
        </button>

		<!-- Navigation Links -->
		<nav class="flex flex-col space-y-6 mt-10">
			<a href="/" class="flex items-center justify-center hover:bg-gray-700 text-white px-4 py-2">
                <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/24/home--v1.png" alt="home--v1"/>
                <span class={`ml-4 ${isNavOpen ? 'block' : 'hidden'}`}>Home</span>
			</a>

			<a href="/appointments" class="flex items-center justify-center hover:bg-gray-700 text-white px-4 py-2">
                <img width="24" height="24" src="https://img.icons8.com/pastel-glyph/24/appointment-time.png" alt="appointment-time"/>
                <span class={`ml-4 ${isNavOpen ? 'block' : 'hidden'}`}>Appointments</span>
			</a>

			<a href="#" class="flex items-center justify-center hover:bg-gray-700 text-white px-4 py-2">
                <img width="24" height="24" src="https://img.icons8.com/pulsar-line/24/search-client.png" alt="search-client"/>
                <span class={`ml-4 ${isNavOpen ? 'block' : 'hidden'}`}>Clients</span>
			</a>
		</nav>
	</header>

	<!-- Main content -->
	<main class="ml-16 mt-24 flex-1 p-8 transition-all duration-300" style={`margin-left: ${isNavOpen ? '12rem' : '4rem'}`}>
    <slot />
    </main>
</section>

<footer class="py-4 fixed bottom-0 w-full">
    <div class="container mx-auto text-center">
        <p class="text-sm">
            Developed with 💙 by <span class="font-semibold">Silvia Popova</span>
        </p>
    </div>
</footer>
