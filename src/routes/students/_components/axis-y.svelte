<script lang="ts">
	import type { ScaleLinear } from 'd3-scale';
	import { generate_ticks } from '$lib/utils';
	import type { Margin } from '$lib/types';

	export let margin: Margin;
	export let max_hours: number;
	export let width: number;
	export let y_scale: ScaleLinear<number, number, never>;

	const interval = 10;
	const max = max_hours;
	const array_length = Math.ceil(max / interval) + 1;

	let y_ticks = generate_ticks({ array_length, interval });
</script>

<g transform="translate({margin.left} {margin.top})">
	{#each y_ticks as tick}
		<g>
			<text x="0" y={y_scale(tick)} dy="-6" class="fill-muted-foreground text-sm font-light">
				{tick}
				{tick === max_hours ? ' hours studied' : ''}
			</text>
			<!-- <line x1="0" y1={y_scale(tick)} x2="100%" y2={y_scale(tick)} stroke="hsl(var(--muted))" /> -->
			<line
				x1="0"
				y1={y_scale(tick)}
				x2={width}
				y2={y_scale(tick)}
				stroke={tick === 0 ? 'hsl(var(--foreground))' : 'hsl(var(--muted))'}
			/>
		</g>
	{/each}
</g>
