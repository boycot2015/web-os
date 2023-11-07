<svelte:head>
    <title>新闻动态</title>
</svelte:head>
<style lang="less" scoped>
.container {
    margin-top: 48px;
    background-color: var(--color-fff);
}
</style>
<script>
    import Nav from '$lib/components/Nav.svelte';
    import Action from '$lib/components/Action.svelte';
    /** @type {import('./$types').LayoutData} */
	export let data;
    const { tabs } = data;
</script>
<Nav navs={tabs} route={data.route}></Nav>
<div class="wrap flex-column just-b container">
    <!-- <a href="/">首页</a>
    <a href="/about">关于</a> -->
    <slot></slot>
    <Action icon={'ri-arrow-go-back-line'} />
</div>