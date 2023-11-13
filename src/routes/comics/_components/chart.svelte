<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import type { ComicCharacter } from '$lib/types';
	import { AxisX, AxisY, Character, Tooltip } from '.';

	export let all_characters: ComicCharacter[] = [];
	export let metric_x: string;
	export let metric_y: string;
	export let universe_characters: ComicCharacter[] = [];

	let height = 500;
	$: width = height;
	let radius = 28;

	/*
	 * grab the value from the powerstats property of the character object by using the metric_x value as the key
	 * e.g if metric_x is 'intelligence', then the key is 'intelligence' and the value is the number
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
</script>

<section
	id="grid_chart"
	class="relative flex flex-col h-[80dvh] mx-auto bg-popover border drop-shadow rounded-xl"
	bind:clientHeight={height}
	bind:clientWidth={width}
	on:mouseleave={() => (hovered_character = undefined)}
	on:mousemove={(e) => {
		// track the nearest character to the mouse, and render that
		const rect = e.currentTarget.getBoundingClientRect();
		// think of this as the x and y coordinates of the mouse relative to the chart
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
	}}
	role="presentation"
>
	{#each universe_characters as character}
		<Character
			{character}
			on:mouseenter={() => (hovered_character = character)}
			{radius}
			{x_accessor}
			{y_accessor}
			{x_scale}
			{y_scale}
		/>
	{/each}

	<AxisX {metric_x} />
	<AxisY {metric_y} />

	{#if hovered_character}
		<Tooltip {hovered_character} />
	{/if}
</section>
