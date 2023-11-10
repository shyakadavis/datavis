<script>
	import '../app.postcss';
	import { ModeWatcher } from 'mode-watcher';
</script>

<main class="mx-auto max-w-7xl py-8">
	<slot />
</main>

<ModeWatcher />
