<svelte:head>
    <title>{title}</title>
</svelte:head>
<script>
    import Action from '$lib/components/Action.svelte';
    import { scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    /** @type {import('./$types').LayoutData} */
    export let data;
    export let title = data.title || '';
    export let back = data.back || '';
    let offsetHeight = 0;
</script>
<div class="w-full h-full bg-gray-100 overflow-hidden" style="padding-top: {offsetHeight}px;" transition:scale="{{ duration: 500, opacity: 0.3, start: 0, easing: quintOut }}">
    <Action path="{back?`/micro/{url}/{title}`: '/'}" bind:offsetHeight={offsetHeight} info={data}  opacity={1} {title} injClass="!bg-white" />
    <slot></slot>
</div>
