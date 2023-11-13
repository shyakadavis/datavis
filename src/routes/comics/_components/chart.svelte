<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { Delaunay } from 'd3-delaunay';
	import type { ComicCharacter } from '$lib/types';
	import { AxisX, AxisY, Character, Tooltip } from '.';

	// export let all_characters: ComicCharacter[] = [];
	export let metric_x: string;
	export let metric_y: string;
	export let universe_characters: ComicCharacter[] = [];

	let height = 500;
	$: width = height;
	let radius = 28;

	/**
	 * grab the value from the powerstats property of the character object by using the metric_x value as the key
	 *
	 * e.g if metric_x is 'intelligence', then the key is 'intelligence' and the value is the number
	 *
	 * The keyof typeof c.powerstats is a type assertion that tells TypeScript to treat metric_x as a valid key for indexing into c.powerstats
	 */
	$: x_accessor = (c: ComicCharacter) => {
		return c.powerstats[metric_x as keyof typeof c.powerstats];
	};

	$: y_accessor = (c: ComicCharacter) => {
		return c.powerstats[metric_y as keyof typeof c.powerstats];
	};

	$: x_scale = scaleLinear().domain([0, 100]).range([0, width]);

	$: y_scale = scaleLinear().domain([0, 100]).range([height, 0]);

	let hovered_character: ComicCharacter | undefined = undefined;

	/**
	 * use Delaunay triangulation to create a Voronoi diagram.
	 *
	 * This is a way to create a polygon around each point on the chart in order to find the nearest point/node
	 */
	type Point = [number, number];
	$: points = universe_characters.reduce((acc: Point[], c) => {
		acc.push([x_scale(x_accessor(c)), y_scale(y_accessor(c))]);
		return acc;
	}, []);

	$: delaunay = Delaunay.from(points);
</script>

<section
	id="grid_chart"
	class="wrapper relative flex flex-col h-[80dvh] mx-auto bg-popover border drop-shadow rounded-xl"
	bind:clientHeight={height}
	bind:clientWidth={width}
	on:mouseleave={() => (hovered_character = undefined)}
	on:mousemove={(e) => {
		/**
		 *  track the nearest character to the mouse, and render that
		 * */
		const rect = e.currentTarget.closest('.wrapper')?.getBoundingClientRect();
		if (!rect) return;
		// think of this as the x and y coordinates of the mouse relative to the chart
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// find the nearest point to the mouse
		const index = delaunay.find(x, y);

		hovered_character = universe_characters[index];
	}}
	role="presentation"
>
	{#each universe_characters as character}
		<Character {character} {radius} {x_accessor} {y_accessor} {x_scale} {y_scale} />
	{/each}

	<AxisX {metric_x} />
	<AxisY {metric_y} />

	{#if hovered_character}
		<Tooltip {hovered_character} />
	{/if}
</section>
