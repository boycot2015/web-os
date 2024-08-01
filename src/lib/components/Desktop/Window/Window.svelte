<script lang="ts">
  import { draggable } from '@neodrag/svelte';
  import { onMount } from 'svelte';
  import { sineInOut } from 'svelte/easing';
  import { fly, scale } from 'svelte/transition';
  import { elevation } from '$lib/actions';
  import { randint } from '$lib/helpers/random';
  import {
    activeApp,
    activeAppZIndex,
    appsInFullscreen,
    appZIndices,
    isAppBeingDragged,
    openApps,
  } from '@/store/apps.store';
  import type { AppID } from '@/store/apps.store';
  import { appConfig } from '@/store';
  import AppNexus from '@/lib/components/apps/AppNexus.svelte';
  import TrafficLights from './TrafficLights.svelte';

  export let appID: AppID;

  let draggingEnabled = true;

  let isMaximized = false;
  let minimizedTransform: string;

  let windowEl: HTMLElement;

  const { height, width, left, top } = $openApps[appID];

  const remModifier = +height * 1.2 >= window.innerHeight ? 24 : 16;

  const randX = randint(-600, 100);
  const randY = randint(-100, 100);

  let defaultPosition = {
    x: left || (document.body.clientWidth / 2 + randX) / 2,
    y: top || (100 + randY) / 2 + 32,
  };

  $: $activeApp === appID && ($appZIndices[appID] = $activeAppZIndex);

  function focusApp() {
    $activeApp = appID;
  }

  function windowCloseTransition(
    el: HTMLElement,
    { duration = 300 }: SvelteTransitionConfig = {},
  ): SvelteTransitionReturnType {
    const existingTransform = getComputedStyle(el).transform;

    return {
      duration,
      easing: sineInOut,
      css: (t) => `opacity: ${t}; transform: ${existingTransform} scale(${t})`,
    };
  }

  async function maximizeApp() {

    if (!isMaximized) {
        draggingEnabled = false;
        minimizedTransform = windowEl.style.transform;
        windowEl.style.transform = `translate(0px, 0px)`;
        windowEl.style.width = `100vw`;
        windowEl.style.height = 'calc(100vh - 9rem)';
        windowEl.style.top = '34px';
    } else {
        draggingEnabled = true;
        windowEl.style.transform = minimizedTransform;
        windowEl.style.width = `${+width / remModifier}rem`;
        windowEl.style.height = `${+height / remModifier}rem`;
    }

    isMaximized = !isMaximized;
    $openApps[appID].isMaximized = isMaximized;
    $appsInFullscreen[appID] = isMaximized;
    console.log($openApps[appID].miniPosition, '$openApps[appID].miniPosition');
  }

  function closeApp() {
      let exist = $appConfig.docks.find(el => el.text === appID)
      if (exist) {
        if (exist && !exist.affix) $appConfig.docks = $appConfig.docks.filter(el => el.affix ||(!el.affix && el.text !== appID))
      }
    $openApps[appID] = false;
    $appsInFullscreen[appID] = false;
  }
  function minimizeApp() {
    $openApps[appID].shouldOpenWindow = !$openApps[appID].shouldOpenWindow;
  }
  function onAppDragStart() {
    focusApp();
    $isAppBeingDragged = true;
  }

  function onAppDragEnd(e) {
    $isAppBeingDragged = false;
    $openApps[appID].left = parseInt(e.offsetX)
    $openApps[appID].top = parseInt(e.offsetY)
  }
  onMount(() => {
    windowEl?.focus();
    isMaximized = !!$openApps[appID].isMaximized
    if (!$openApps[appID].isMaximized) {
        $openApps[appID].left = parseInt(defaultPosition.x)
        $openApps[appID].top = parseInt(defaultPosition.y)
    } else {
        draggingEnabled = false;
        minimizedTransform = windowEl.style.transform;
        windowEl.style.transform = `translate(0px, 0px)`;
        windowEl.style.width = `100vw`;
        windowEl.style.height = 'calc(100vh - 9rem)';
        windowEl.style.top = '34px';
    }
    const resizeObserver = new ResizeObserver((entries) => {
        // console.log(entries[0].target, 'entries');
        entries.map(el => {
            if (!$appsInFullscreen[appID] && $openApps[appID]) {
                $openApps[appID].width = el.target.clientWidth || $openApps[appID].width
                $openApps[appID].height = el.target.clientHeight ||  $openApps[appID].height
            }
        })
    });
    resizeObserver.observe(windowEl);
});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="container"
  style:resize="{$appsInFullscreen[appID]?'none':'both'}"
  class:active={$activeApp === appID}
  style:width="{+width / remModifier}rem"
  style:height="{+height / remModifier}rem"
  style:z-index={$appZIndices[appID]}
  tabindex="-1"
  bind:this={windowEl}
  use:draggable={{
    defaultPosition,
    handle: '.app-window-drag-handle',
    // bounds: { bottom: 0, top: 27.2, left: 0, right: 0 },
    bounds: { bottom: -height + 34, top: 34, left: 0, right: 0 },
    disabled: !draggingEnabled,
    gpuAcceleration: false,

    onDragStart: onAppDragStart,
    onDragEnd: onAppDragEnd,
  }}
  on:click={focusApp}
  on:keydown={() => {}}
  transition:scale="{{ start: 0.5, duration: 100, opacity: 0.6 }}"
  >
  <!-- out:fly="{{ y: defaultPosition.y, duration: 100, opacity: 0.6 }}" -->
  <div class="tl-container {appID}" use:elevation={'window-traffic-lights'}>
    <TrafficLights {appID} on:maximize-click={maximizeApp} on:close-app={closeApp} on:minimize-app={minimizeApp} />
  </div>
  <!-- <h3 class="title">{$openApps[appID].text}</h3> -->
  <AppNexus {appID} isBeingDragged={$isAppBeingDragged} />
</div>

<style lang="less">
  .container {
    --elevated-shadow: 0px 8.5px 10px rgba(0, 0, 0, 0.115), 0px 68px 80px rgba(0, 0, 0, 0.23);
    overflow: auto;
    resize: both;
    width: 100%;
    height: 100%;
    max-width: 100vw;
    display: grid;
    grid-template-rows: 1fr;

    position: absolute;
    will-change: width, height;
    z-index: 1;
    border-radius: 0.75rem;
    box-shadow: var(--elevated-shadow);
    background-color: rgba(255, 255, 255, 0.56);
    cursor: var(--system-cursor-default), auto;
    // // transition: all .3s ease-in-out;
    &.active {
      // --elevated-shadow: 0px 6.7px 12px rgba(0, 0, 0, 0.218), 0px 22.3px 40.2px rgba(0, 0, 0, 0.322),
      //   0px 100px 180px rgba(0, 0, 0, 0.54);
      --elevated-shadow: 0px 8.5px 10px rgba(0, 0, 0, 0.28), 0px 0 30px rgba(255, 255, 255, 0.26);
    }

    &.dark {
      & > :global(section),
      & > :global(div) {
        border-radius: inherit;
        box-shadow: inset 0 0 0 0.9px hsla(var(--system-color-dark-hsl), 0.3),
          0 0 0 1px hsla(var(--system-color-light-hsl), 0.5), var(--elevated-shadow);
      }
    }
  }

  .tl-container {
    position: absolute;
    top: 1rem;
    left: 1rem;
    // Necessary, as `.container` tries to apply shadow on it
    box-shadow: none !important;
  }
  .title {
    position: absolute;
    left: 46%;
    top: 12px;
  }
</style>
