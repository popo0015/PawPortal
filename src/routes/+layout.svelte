<script>
	import "../app.css";
</script>

<main class="container mx-auto flex flex-col justify-center items-center">
    <slot />
</main>

<footer class="bg-gray-100 py-4 fixed bottom-0 w-full">
    <div class="container mx-auto text-center">
        <p class="text-gray-600 text-sm">
            Developed with 💙 by <span class="font-semibold text-gray-800">Silvia Popova</span>
        </p>
    </div>
</footer>
