<svelte:head>
    <title>{title}</title>
</svelte:head>
<style lang="less" scoped>
// .container {
//     margin-top: 48px;
// }
</style>
<script>
    // /** @type {import('./$types').LayoutData} */
	// export let data;
    import Action from '$lib/components/Action.svelte';
    let title = '品牌分类'
</script>
<slot></slot>
<Action path="/mall" {title} />