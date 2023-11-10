<svelte:head>
    <title>小程序入口</title>
</svelte:head>
<style lang="less" scoped>
    .layout {
        height: 100%;
    }
</style>
<script>
    // /** @type {import('./$types').LayoutData} */
	// export let data;
</script>
<div class="layout">
    <slot></slot>
</div>