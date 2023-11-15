<svelte:head>
    <title>新闻动态</title>
</svelte:head>
<style lang="less" scoped>
.container {
    background-color: var(--color-fff);
    :global(>.list) {
        padding: var(--padding-gap) !important;
        flex-wrap: wrap;
    }
}
</style>
<script>
    import Nav from '$lib/components/Nav.svelte';
    import Action from '$lib/components/Action.svelte';
    import { scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    /** @type {import('./$types').LayoutData} */
	export let data;
    const { tabs } = data;
    let offsetHeight = 0;
    let navHeight = 0;
</script>
<div transition:scale="{{ duration: 800, opacity: 0.3, start: 0, easing: quintOut }}" class="wrap w-full h-full bg-gray-100 flex-column pt-14 just-b container" style="padding-top: {offsetHeight+navHeight}px;">
    <Nav navs={tabs} route={data.route||[]} style="top:{offsetHeight}px" bind:offsetHeight={navHeight}></Nav>
    <Action bind:offsetHeight={offsetHeight} title="新闻动态" opacity={1} path="/" />
    <slot></slot>
</div>