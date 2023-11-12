<script lang="ts">
	import '../app.postcss';
	import { ModeWatcher } from 'mode-watcher';
	import Metadata from '$lib/components/misc/metadata.svelte';
	import Footer from '$lib/components/shared/footer.svelte';
	import MainLayout from '$lib/components/layouts/main-layout.svelte';
</script>

<Metadata />

<MainLayout>
	<slot />
</MainLayout>

<Footer />

<ModeWatcher />
