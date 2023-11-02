<svelte:head>
    <title>my_notice</title>
</svelte:head>
<style lang="less" scoped>
// .container {
//     margin-top: 48px;
// }
</style>
<script>
    import Nav from '$lib/components/Nav.svelte';
    /** @type {import('./$types').LayoutData} */
	export let data;
    const { tabs } = data;
</script>
<Nav navs={tabs} route={data.route}></Nav>
<div class="wrap flex-column just-b container">
    <!-- <a href="/">首页</a>
    <a href="/about">关于</a> -->
    <slot></slot>
</div>