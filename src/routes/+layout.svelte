<style lang="less" scoped>
    .layout {
        height: 100%;
    }
</style>
<script>
    import { appConfig } from '@/store';
</script>
<div class="layout {$appConfig.bgColor} h-full w-full"  style="background: url({$appConfig.bgUrl}) center/cover no-repeat fixed;">
    <slot></slot>
</div>