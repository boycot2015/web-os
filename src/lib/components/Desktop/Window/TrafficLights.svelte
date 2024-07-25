<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import {
    activeAppZIndex,
    appsInFullscreen,
    appZIndices,
    isAppBeingDragged,
    openApps,
  } from '@/store/apps.store';
  import type { AppID } from '@/store/apps.store';
  import { activeApp } from '@/store/apps.store';
  import { Icon } from '$lib/components';
  export let appID: AppID;
  let maximize = false
  const dispatch = createEventDispatcher();

  function closeApp() {
    dispatch('close-app');
  }

  function greenLightAction() {
    maximize = true
    dispatch('maximize-click');
  }
</script>

<div class="container" class:unfocused={$activeApp !== appID}>
  <button class="close-light" on:click={closeApp}>
    <Icon injClass="operate-icon" size="{12}" name="{'ri-close-fill'}"></Icon>
</button>
  <button class="minimize-light" on:click={closeApp}>
    <Icon injClass="operate-icon" size="{12}" name="{'ri-subtract-line'}"></Icon>
</button>
  <button class="stretch-light" on:click={greenLightAction}>
    <Icon injClass="operate-icon" size="{12}" name="{!$appsInFullscreen[appID]?'ri-expand-diagonal-line':'ri-collapse-diagonal-line'}"></Icon>
  </button>
</div>

<style lang="less">
  .container {
    --button-size: 0.8rem;

    // pointer-events: none;

    display: grid;
    grid-template-columns: repeat(3, var(--button-size));
    align-items: center;
    gap: 0.6rem;

    height: 100%;

    &.unfocused button {
      --bgcolor: #b6b6b7;
      --border-color: hsla(var(--system-color-dark-hsl), 0.5);
    }

    :global(svg) {
      opacity: 0;
    }

    &:hover {
      button {
        transform: scale(1.2);
      }

      :global(svg) {
        opacity: 1;
      }
    }
  }

  button {
    height: var(--button-size);
    width: var(--button-size);
    // pointer-events: initial;
    
    border-radius: 50%;
    
    background-color: var(--bgcolor);
    box-shadow: 0 0 0 0.5px var(--border-color);
    
    transition: transform 100ms ease-in;
    color: #fff;
    :global(.operate-icon) {
        // left: -1px !important;
        top: -6px !important;
    }
  }

  .close-light {
    --bgcolor: #ff5f56;
    --border-color: #e0443e;
  }

  .stretch-light {
    --bgcolor: #27c93f;
    --border-color: #1aab29;

    :global(svg) {
      transform: rotate(180deg);
    }
  }

  .minimize-light {
    --bgcolor: #ffbd2e;
    --border-color: #dea123;
  }
</style>
