<script lang="js">
  import { appConfig } from '@/store';
  import Loading from '$lib/components/Loading.svelte'
  import { activeApp, activeAppZIndex, appZIndices, openApps } from '@/store/apps.store';
  import { Icon, GridList } from '$lib/components';
  import Calendar from '$lib/components/apps/Calendar.svelte';
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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="windows-area">
  {#each Object.keys($openApps) as appID}
    {#if $openApps[appID] && $openApps[appID].shouldOpenWindow}
        {#await import('./Window.svelte') then { default: Window }}
            <Window {appID} />
        {/await}
    {/if}
  {/each}
  <div class="custom-grid">
      <GridList isWindow apps={$appConfig.winApps||[]} cols={8} gap={8} injClass="!px-2 !py-4"></GridList>
  </div>
  <!-- <div class="calendar-fixed" on:dblclick|stopPropagation>
    <Calendar
    theme={{
        calendar: {
            width: '240px',
            legend: {
                height: '34px' 
            },
            background: {
                primary: "transparent",
                highlight: "#5829d6",
                hover: "#222"
            },
            "font": {
                regular: "1.2em",
                large: "12em"
            },
        }
    }} inline />
  </div> -->
</div>

<style lang="less">
  #windows-area {
    display: block;
    position: relative;
    z-index: 10;
    // 1.7 rem is the heigh of the header
    // 5.25 rem is the height of dock
    // top: 1.75rem;
    height:100vh;
    width: 100vw;
    justify-self: center;
  }
  .custom-grid {
    position: absolute;
    top: 20%;
    left: 50%;
    overflow-y: auto;
    display: flex;
    align-items: center;
    z-index: -1;
    max-height: calc(100vh - 260px);
    margin-left: -400px;
  }
  :global(.calendar-fixed) {
    position: absolute;
    right: 10px;
    top: 44px;
    z-index: 1;
    border-radius: var(--border-radius);
    overflow: hidden;
  }
</style>
