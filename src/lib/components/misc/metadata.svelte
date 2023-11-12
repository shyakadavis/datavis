<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import { site_config } from '$lib/config/site';
</script>

<SvelteSeo
	title={site_config.title}
	description={site_config.description}
	canonical={site_config.url}
	keywords={site_config.keywords}
	openGraph={{
		title: site_config.title,
		description: site_config.description,
		url: site_config.url,
		type: 'website',
		images: [
			{
				url: site_config.og_image,
				width: 800,
				height: 600,
				alt: site_config.title
			},
			{
				url: site_config.og_image,
				width: 900,
				height: 800,
				alt: site_config.title
			},
			{
				url: site_config.og_image,
				alt: site_config.title
			},
			{
				url: site_config.og_image
			}
		],
		site_name: site_config.title
	}}
	twitter={{
		card: 'summary_large_image',
		site: `@${site_config.links.twitter}`,
		title: site_config.title,
		description: site_config.description,
		image: site_config.og_image
	}}
/>
