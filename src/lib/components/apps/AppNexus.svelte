<script lang="ts">
  import type { AppID } from '@/store/apps.store';
  import { openApps } from '@/store/apps.store';
  export let appID: AppID;
  export let isBeingDragged: boolean;
  
</script>
<section class="container">
    <header class="titlebar app-window-drag-handle" />
    <section class="main-area">
        {#if $openApps[appID]?.url}
        <iframe src="{$openApps[appID]?.url}" title={$openApps[appID]?.text} frameborder="0" style="width: 100%;height: 100%;"></iframe>
        {:else}
        <div>app加载失败，请重试~</div>
        {/if}
    </section>
  </section>
<style lang="less">
.container {
    background-color: var(--system-color-light);
    overflow: hidden;
    border-radius: inherit;
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

img {
    max-width: 8rem;
    aspect-ratio: 1 / 1;
}
</style>