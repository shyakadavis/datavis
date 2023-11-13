<script lang="ts">
	import type { ComicCharacter } from '$lib/types';

	export let hovered_character: ComicCharacter;
	$: ({ name, images, appearance } = hovered_character);
</script>

<div
	class="absolute top-2 left-2 bg-popover p-4 shadow-md rounded-lg border pointer-events-none transition-all ease-linear grid grid-cols-2 gap-4 items-center text-sm font-light"
>
	<img src={images.md} alt={name} class="h-40 w-40 object-cover rounded-md" />
	<dl
		class="grid grid-cols-2 gap-y-2 [&>dt]:text-muted-foreground [&>dt]:text-xs [&>dt]:border-b [&>dd]:border-b"
	>
		<dt>NAME:</dt>
		<dd>{name}</dd>
		{#each Object.entries(appearance) as [key, value]}
			<dt>{key.toUpperCase()}:</dt>
			<dd>
				{#if typeof value === 'object'}
					{#if value !== null && value !== undefined}
						{value[1]}
					{/if}
				{:else}
					{value}
				{/if}
			</dd>
		{/each}
	</dl>
</div>
