<script lang="ts">
	import type { ScaleLinear } from 'd3-scale';
	import type { Margin } from '$lib/types';
	import { generate_ticks } from '$lib/utils';

	export let height: number;
	export let margin: Margin;
	export let x_scale: ScaleLinear<number, number, never>;

	const interval = 25;
	const max = 100;
	const array_length = Math.floor(max / interval) + 1;

	let x_ticks = generate_ticks({ array_length, interval });
</script>

<g>
	{#each x_ticks as tick}
		<g>
			<text
				x={x_scale(tick)}
				y={height - margin.bottom}
				dy="6"
				dominant-baseline="hanging"
				text-anchor="right"
				class="fill-muted-foreground text-sm font-light"
			>
				{tick}%
			</text>
		</g>
	{/each}
</g>
