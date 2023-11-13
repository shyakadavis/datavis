<script lang="ts">
	import all_characters from '$lib/data/comics.json';
	import { Chart, Select } from '.';

	const universes = [
		'Avengers',
		'Hulk',
		'Captain America',
		'Spider-man',
		'X-men',
		'Star Wars',
		'Batman',
		'Thor',
		'Deadpool',
		'Daredevil',
		'Fantastic Four',
		'Justice League',
		'Wonder Woman',
		'Superman',
		'Teenage Mutant Ninja Turtles'
	];

	let universe = universes[0];
	$: universe_characters = all_characters.filter(
		(d) =>
			d.biography.firstAppearance.toLowerCase().includes(universe.toLowerCase()) ||
			d.biography.publisher?.toLowerCase().includes(universe.toLowerCase()) ||
			d.connections.groupAffiliation.toLowerCase().includes(universe.toLowerCase()) ||
			d.name.toLowerCase().includes(universe.toLowerCase())
	);

	const metrics = Object.keys(all_characters[0].powerstats);
	let metric_x = metrics[0];
	let metric_y = metrics[1];
</script>

<section
	id="select_menus"
	class="grid grid-cols-2 sm:grid-cols-3 gap-8 drop-shadow rounded-lg my-8"
>
	<!-- Snippets would have been awesome here. No need for a new file component. Perhaps when you upgrade to Svelte 5. -->
	<Select
		placeholder={universe}
		options={universes}
		selected={{ value: universe }}
		on_selected_change={(e) => {
			if (e) {
				universe = e.value;
			}
		}}
	/>

	<Select
		placeholder={metric_x}
		options={metrics}
		selected={{ value: metric_x }}
		on_selected_change={(e) => {
			if (e) {
				metric_x = e.value;
			}
		}}
	/>

	<Select
		placeholder={metric_y}
		options={metrics}
		selected={{ value: metric_y }}
		on_selected_change={(e) => {
			if (e) {
				metric_y = e.value;
			}
		}}
	/>
</section>

<Chart {metric_x} {metric_y} {universe_characters} />
