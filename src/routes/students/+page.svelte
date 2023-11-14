<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import Students from './_components/students.svelte';
	import { Acknowledgements } from '$lib/components/shared';
</script>

<SvelteSeo title="Students | Scatter Plot" />

<h1 class="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl text-center my-4">
	Students who studied longer scored higher on their final exams
</h1>

<Students />

<p class="text-center font-light text-xs my-2">press "tab" to navigate the chart</p>

<Acknowledgements name="Connor Rothschild" website="https://www.connorrothschild.com/" />
