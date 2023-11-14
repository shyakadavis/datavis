<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { students } from '$lib/data/students';
	import AxisX from './axis-x.svelte';
	import AxisY from './axis-y.svelte';
	import Tooltip from './tooltip.svelte';
	import type { Margin, StudentData } from '$lib/types';

	// set the width and height of the SVG
	let width = 400;
	let height = 400;

	// set the margin for the SVG
	const margin: Margin = {
		top: 20,
		right: 100,
		bottom: 60,
		left: 0
	};

	// create a scale for the x axis
	$: x_scale = scaleLinear()
		.domain([0, 100]) // for this example, we know the domain of an exam score is 0-100
		.range([0, width - margin.left - margin.right]);

	// create a scale for the y axis

	// this is very handy because we don't have to know the max value ahead of time and `max` will help us find it
	const max_hours = max(students, (s) => s.hours) as number;

	// something to remember is that the y axis is inverted in SVG.
	// this means that if you want to start at the bottom and go up, you need to use `range([height, 0])`
	// if you scale from [0, height], your graph will be upside down/inverted
	const y_scale = scaleLinear()
		.domain([0, max_hours])
		.range([height - margin.top - margin.bottom, 0]);

	let hovered_datum: StudentData | undefined = undefined;
</script>

<section
	bind:clientWidth={width}
	on:mouseleave={() => (hovered_datum = undefined)}
	aria-label={hovered_datum
		? `Grade: ${hovered_datum.grade}, Hours: ${hovered_datum.hours}`
		: undefined}
	class="relative w-full"
>
	<svg
		{width}
		{height}
		class="bg-popover border rounded-xl drop-shadow grid place-items-center p-4 w-full"
	>
		<AxisX {height} {margin} {x_scale} />
		<AxisY {margin} {max_hours} {width} {y_scale} />
		<g class="circles" transform="translate({margin.left} {margin.top})">
			<!-- sorting here helps, for example, tabbing in order with the keyboard -->
			{#each students.sort((a, b) => a.grade - b.grade) as student}
				<circle
					cx={x_scale(student.grade)}
					cy={y_scale(student.hours)}
					r={hovered_datum && hovered_datum === student ? '14' : '7'}
					opacity={hovered_datum ? (hovered_datum === student ? '1' : '0.3') : '1'}
					class="fill-muted-foreground transition-all ease-linear cursor-pointer focus:outline-none"
					stroke="hsl(var(--foreground))"
					on:mouseenter={() => (hovered_datum = student)}
					on:focus={() => (hovered_datum = student)}
					tabindex="0"
					aria-label={`Grade: ${student.grade}, Hours: ${student.hours}`}
					role="tab"
				/>
			{/each}
		</g>
	</svg>
	{#if hovered_datum}
		<Tooltip {hovered_datum} {width} {x_scale} {y_scale} />
	{/if}
</section>
