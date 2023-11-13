<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	const examples = [
		{
			name: 'Students',
			path: '/students',
			description: 'Student hours/marks scatter plot'
		},
		{
			name: 'Comics',
			path: '/comics',
			description: 'Comics grid chart'
		}
	];
</script>

<SvelteSeo title="Datavis | SHYAKA Davis" />

<header class="font-light text-muted-foreground my-8 space-y-4">
	<h1>
		A personal playground to learn data visualization with
		<a href="http://svelte.dev" target="_blank" rel="noopener noreferrer" class="link cursor-alias">
			Svelte
		</a>
		,
		<a href="http://d3js.org" target="_blank" rel="noopener noreferrer" class="link cursor-alias">
			D3.js
		</a>, and other tools and libraries.
	</h1>
</header>

<main class="my-4">
	<ul class="font-light grid grid-cols-1 sm:grid-cols-2 gap-4">
		{#each examples as { name, path, description }}
			<li class="border-b p-4">
				<a href={path} class="link">{name}</a>
				<p class="text-sm text-muted-foreground mt-2">{description}</p>
			</li>
		{/each}
	</ul>
</main>
