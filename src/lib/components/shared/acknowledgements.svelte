<script lang="ts">
	export let name: string;
	export let website: string;
</script>

<section id="acknowledgements" class="my-4">
	<p class="text-sm text-muted-foreground">Acknowledgements</p>

	<a href={website} class="link cursor-alias" target="_blank" rel="noopener">
		{name}
	</a>
</section>
