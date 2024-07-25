<script lang="js">
  import { appConfig } from '@/store';
  import Loading from '$lib/components/Loading.svelte'
  import { activeApp, activeAppZIndex, appZIndices, openApps } from '@/store/apps.store';

  $: $activeApp, ($activeAppZIndex += 2);

  // Keeps all the app z indices under 50 so they don't go above the UI elements
  function normalizeAppZIndices() {
    if (!Object.values($appZIndices).some((zIndex) => zIndex > 50)) return;

    // Get the lowest non-zero z-index
    const lowestZIndex = Math.min(
      ...[...new Set(Object.values($appZIndices))].filter((val) => val !== 0),
    );

    $activeAppZIndex -= lowestZIndex;

    const keys = Object.keys($appZIndices);

    for (const app of keys) {
      if ($appZIndices[app] >= lowestZIndex) {
        $appZIndices[app] -= lowestZIndex;
      }
    }
  }

  $: $appZIndices, normalizeAppZIndices();
</script>

<div id="windows-area">
  {#each Object.keys($openApps) as appID}
    {#if $openApps[appID] && $openApps[appID].shouldOpenWindow}
    {#await import('./Window.svelte')}
    <Loading text={'加载中...'} />
    {:then { default: Window }}
        <Window {appID} />
      {/await}
    {/if}
  {/each}
</div>

<style lang="less">
  #windows-area {
    display: block;

    // 1.7 rem is the heigh of the header
    // 5.25 rem is the height of dock
    // top: 1.75rem;
    height: 100vw;
    width: 100vw;
    justify-self: center;
  }
</style>
