<script lang="ts">
	import { scaleLinear, type ScaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { students } from '$lib/data/students';

	// set the width and height of the SVG
	let width = 400;
	let height = 400;

	// create a scale for the x axis
	const x_scale = scaleLinear()
		.domain([0, 100]) // for this example, we know the domain of an exam score is 0-100
		.range([0, width]);

	// create a scale for the y axis
	let y_scale: ScaleLinear<number, number, never>;

	// this is very handy because we don't have to know the max value ahead of time and `max` will help us find it
	const max_hours = max(students, (s) => s.hours);

	if (typeof max_hours === 'number') {
		// something to remember is that the y axis is inverted in SVG.
		// this means that if you want to start at the bottom and go up, you need to use `range([height, 0])`
		// if you scale from [0, height], your graph will be upside down/inverted
		y_scale = scaleLinear().domain([0, max_hours]).range([height, 0]);
	} else {
		console.error('max_hours is not a number');
	}
</script>

<section class="w-full bg-popover border rounded-md drop-shadow-sm grid place-items-center p-4">
	<svg {width} {height}>
		{#each students as student}
			<circle
				cx={x_scale(student.grade)}
				cy={y_scale(student.hours)}
				r="8"
				fill="indigo"
				stroke="hsl(var(--foreground))"
			/>
		{/each}
	</svg>
</section>
