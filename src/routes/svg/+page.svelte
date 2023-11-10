<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { students } from '$lib/data/students';
	import AxisX from './_components/axis-x.svelte';
	import AxisY from './_components/axis-y.svelte';
	import type { Margin } from '$lib/types';

	// set the width and height of the SVG
	let width = 400;
	let height = 400;

	// set the margin for the SVG
	// const margin: Margin = {
	// 	top: 20,
	// 	right: 40,
	// 	bottom: 20,
	// 	left: 0
	// };
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
</script>

<h1 class="font-normal text-foreground text-sm text-center mb-4">
	Students who studied longer scored higher on their final exams
</h1>

<section bind:clientWidth={width} bind:clientHeight={height}>
	<svg
		{width}
		{height}
		class="bg-popover border rounded-md drop-shadow-sm grid place-items-center p-4"
	>
		<AxisX {height} {margin} {x_scale} />
		<AxisY {margin} {max_hours} {width} {y_scale} />
		<g class="circles" transform="translate({margin.left} {margin.top})">
			{#each students as student}
				<circle
					cx={x_scale(student.grade)}
					cy={y_scale(student.hours)}
					r="5"
					fill="purple"
					stroke="hsl(var(--foreground))"
				/>
			{/each}
		</g>
	</svg>
</section>

<!-- <section
	class="w-full bg-popover border rounded-md drop-shadow-sm grid place-items-center p-4 my-4"
>
	<svg {width} {height}>
		<AxisX {height} {margin} {x_scale} />
		<AxisY {margin} {max_hours} {width} {y_scale} />
		<g class="circles" transform="translate({margin.left} {margin.top})">
			{#each students as student}
				<circle
					cx={x_scale(student.grade)}
					cy={y_scale(student.hours)}
					r="5"
					fill="purple"
					stroke="hsl(var(--foreground))"
				/>
			{/each}
		</g>
	</svg>
</section> -->
