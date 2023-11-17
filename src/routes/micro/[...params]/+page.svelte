<svelte:head>
    <title>{$appConfig.app?.text}</title>
</svelte:head>
<script>
    // export let data;
    import { appConfig } from '@/store';
</script>
<iframe src="{$appConfig.app?.url}" title={$appConfig.app?.text} frameborder="0" style="width: 100%;height: 100%;"></iframe>