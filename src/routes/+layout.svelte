<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import Metadata from '$lib/components/misc/metadata.svelte';
	import MainLayout from '$lib/components/layouts/main-layout.svelte';
	import { Footer, Header } from '$lib/components/shared';

	$: is_home = $page.url.pathname === '/';
</script>

<Metadata />

{#if !is_home}
	<Header />
{/if}

<MainLayout>
	<slot />
</MainLayout>

<Footer />

<ModeWatcher />
