<script lang="ts">
	import type { ScaleLinear } from 'd3-scale';
	import type { StudentData } from '$lib/types';
	import { cn } from '$lib/utils';

	export let hovered_datum: StudentData;
	export let width: number;
	export let x_scale: ScaleLinear<number, number, never>;
	export let y_scale: ScaleLinear<number, number, never>;

	$: x = x_scale(hovered_datum.grade);
	$: y = y_scale(hovered_datum.hours);

	let tooltip_width: number;

	const x_nudge = 15;
	const y_nudge = 30;

	$: x_position = x + tooltip_width > width ? x - tooltip_width - x_nudge : x + x_nudge;
	$: y_position = y + y_nudge;
</script>

<div
	class="absolute bg-popover p-2 shadow-md rounded-md border pointer-events-none transition-all ease-linear flex flex-wrap gap-2 items-center justify-center text-sm"
	style="top: {y_position}px; left: {x_position}px;"
	bind:clientWidth={tooltip_width}
>
	<p>{hovered_datum.name}</p>
	<p>
		| <span
			class={cn(
				{
					'text-emerald-900 bg-emerald-100': hovered_datum.hours >= 40,
					'text-amber-900 bg-amber-100': hovered_datum.hours >= 20 && hovered_datum.hours < 40,
					'text-pink-900 bg-pink-100': hovered_datum.hours < 20
				},
				'rounded p-1'
			)}
		>
			{hovered_datum.hours}
		</span>
		<span class="text-xs text-muted-foreground">hrs</span>
	</p>
	<p>
		| <span
			class={cn(
				{
					'text-emerald-900 bg-emerald-100': hovered_datum.grade >= 80,
					'text-amber-900 bg-amber-100': hovered_datum.grade >= 60 && hovered_datum.grade < 80,
					'text-pink-900 bg-pink-100': hovered_datum.grade < 60
				},
				'rounded p-1'
			)}
		>
			{hovered_datum.grade}
		</span>
		<span class="text-xs text-muted-foreground">%</span>
	</p>
</div>
