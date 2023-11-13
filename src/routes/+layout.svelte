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
    import { onMount } from 'svelte';
    import { debounce } from 'stdf/components/utils';
    onMount(() => {
        window.addEventListener('resize', debounce(() => {
            window.location.reload()
        }, 10))
    })
</script>
<div class="layout">
    <slot></slot>
</div>