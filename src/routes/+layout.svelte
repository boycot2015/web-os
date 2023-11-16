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
<div class="layout {$theme.bgColor} h-full w-full"  style="background: url({$theme.bgUrl}) center/cover no-repeat;">
    <slot></slot>
</div>