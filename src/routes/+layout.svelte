<svelte:head>
    <title>小程序入口</title>
</svelte:head>
<style lang="less" scoped>
    .layout {
        height: 100%;
    }
</style>
<script>
    import { onMount } from 'svelte';
    import { debounce } from 'stdf/components/utils';
    import { theme } from '@/store';
    onMount(() => {
        window.addEventListener('resize', debounce(() => {
            window.location.reload()
        }, 10))
    })
</script>
<div class="layout {$theme.bgColor} h-full w-full">
    <slot></slot>
</div>