<style lang="less" scoped>
    .layout {
        height: 100%;
    }
</style>
<script>
    import { onMount } from 'svelte';
    import { debounce } from 'stdf/components/utils';
    import { appConfig } from '@/store';
    onMount(() => {
        window.addEventListener('resize', debounce(() => {
            window.location.reload()
        }, 500))
    })
</script>
<div class="layout {$appConfig.bgColor} h-full w-full"  style="background: url({$appConfig.bgUrl}) center/cover no-repeat fixed;">
    <slot></slot>
</div>