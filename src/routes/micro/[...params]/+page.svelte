<svelte:head>
    <title>{$appConfig.app?.text}</title>
</svelte:head>
<script>
    // export let data;
    import { appConfig } from '@/store';
    // import { startApp } from 'wujie';
    let container = null;
    let poweredByWuJie = false
    // startApp({ name: $appConfig.app?.text, url: $appConfig.app?.url, el: container, sync: true }).
    // then((data) => {
    //     poweredByWuJie = !!container.children.length
    // }).catch((err) => {
    //     console.log(err);
    //     poweredByWuJie = false
    // });
</script>
{#if poweredByWuJie}
    <div class="micro-app" bind:this={container}></div>
{:else}
    <iframe src="{$appConfig.app?.url}" title={$appConfig.app?.text} frameborder="0" style="width: 100%;height: 100%;"></iframe>
{/if}