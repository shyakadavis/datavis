<script lang="ts">
	import type { OnChangeFn } from 'bits-ui/dist/internal';
	import * as Select from '$lib/components/ui/select';

	type SelectOption<T> = {
		value: T;
		label?: string;
		disabled?: boolean;
	};

	export let placeholder: string;
	export let options: string[];
	export let on_selected_change: OnChangeFn<SelectOption<any> | undefined> | undefined;
	export let selected: SelectOption<any>;
</script>

<Select.Root {selected} onSelectedChange={on_selected_change}>
	<Select.Trigger class="w-[180px]">
		<Select.Value {placeholder} />
	</Select.Trigger>
	<Select.Content>
		{#each options as option}
			<Select.Item value={option}>{option}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
