<svelte:head>
    <title>{$appConfig.app?.text}</title>
</svelte:head>
<script>
    import Action from '$lib/components/Action.svelte';
    import { scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { appConfig } from '@/store';
    let offsetHeight = 0;
</script>
<div class="flex-col items-center justify-center h-screen bg-gray-100 overflow-hidden" style="max-width: 1200px;margin: auto;padding-top: {$appConfig.app?.opacity < 1 ? 0 : offsetHeight}px;" transition:scale="{{ duration: 500, opacity: 0.3, start: 0, easing: quintOut }}">
    <Action path="{$appConfig.app?.back || '/'}" bind:offsetHeight={offsetHeight} info={$appConfig.app}  opacity={$appConfig.app?.opacity < 1 ? $appConfig.app?.opacity : 1} title={$appConfig.app?.text} injClass="{$appConfig.app.opacity < 1 ?'!bg-transparent':'!bg-white'} {$appConfig.app?.injTitleClass}" />
    <slot></slot>
</div>
