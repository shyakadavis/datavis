<script>
	import '../app.postcss';
	import { ModeWatcher } from 'mode-watcher';
</script>

<main class="mx-auto max-w-7xl p-8">
	<slot />
</main>

<ModeWatcher />
