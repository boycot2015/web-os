<script lang="ts">
    import type { AppID } from '@/store/apps.store';
    import { openApps } from '@/store/apps.store';
  import { svelte } from '@sveltejs/vite-plugin-svelte';
    // import { onMount } from 'svelte';
    // import { startApp } from 'wujie';

    export let appID: AppID;
    export let isBeingDragged: boolean;
    let container = null;
    let poweredByWuJie = false
    // onMount(() => {
    //     startApp({ name: $openApps[appID]?.text, url: $openApps[appID]?.url, el: container, sync: true }).
    //     then((data) => {
    //         poweredByWuJie = !!container.children.length
    //     }).catch((err) => {
    //         console.log(err);
    //         poweredByWuJie = false
    //     });
    // })
</script>
{#if poweredByWuJie&&$openApps[appID]?.micro}
    <div class="micro-app" bind:this={container}></div>
{:else}
    <section class="container">
        <header class="titlebar app-window-drag-handle" />
        <section class="main-area {isBeingDragged}">
            {#if $openApps[appID]?.url}
                <!-- <iframe src="{$openApps[appID]?.url}" title={$openApps[appID]?.text} frameborder="0" style="width: 100%;height: 100%;"></iframe> -->
                <object data="{$openApps[appID]?.url}" style="width: 100%;height: 100%;" type="text/html"></object>
            {:else if $openApps[appID].component}
            {#await import(`./${$openApps[appID].component}.svelte`) then {default: Component}}
                <svelte:component style="width: 100%;height: 100%;" {...$openApps[appID].props||{}} this={Component}></svelte:component>
            {/await}
            {:else}
                <div>app加载失败，请重试~</div>
            {/if}
        </section>
    </section>
{/if}
<style lang="less">
.container {
    background-color: var(--system-color-light);
    overflow: hidden;
    border-radius: inherit;
    max-width: 100vw;
}

.titlebar {
    padding: 1rem 1rem;

    width: 100%;

    position: absolute;
    top: 0;
    left: 0;
}

.main-area {
    font-size: 1.618rem;
    color: var(--system-color-light-contrast);

    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>