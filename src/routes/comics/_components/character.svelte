<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ComicCharacter } from '$lib/types';

	export let character: ComicCharacter;
	export let radius: number;
	export let x_accessor: (character: ComicCharacter) => number;
	export let y_accessor: (character: ComicCharacter) => number;
	export let x_scale: (value: number) => number;
	export let y_scale: (value: number) => number;
</script>

<img
	src={character.images.sm}
	alt={character.name}
	height={radius * 2}
	width={radius * 2}
	style="
            transform: translate({x_scale(x_accessor(character))}px, {y_scale(
		y_accessor(character)
	)}px) translate(-50%, -50%);
            height: {radius * 2}px;
            width: {radius * 2}px;
            "
	class={cn(
		'absolute object-cover rounded-full drop-shadow border-2 overflow-hidden transition-transform ease-linear duration-300',
		{
			'border-emerald-500': character.biography.alignment === 'good',
			'border-pink-500': character.biography.alignment === 'bad',
			'border-amber-500': character.biography.alignment === 'neutral'
		}
	)}
	on:mouseenter
/>
