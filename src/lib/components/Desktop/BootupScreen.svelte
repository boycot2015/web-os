<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { onMount } from 'svelte';
  import { quintInOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { elevation } from '$lib/actions';
  import { fadeOut } from '$lib/helpers/fade';
  import { waitFor } from '$lib/helpers/wait-for';
  import { appConfig } from '@/store';
//   import AppleIcon from '~icons/mdi/apple';
  $appConfig.isWin = Math.random() < 0.5
  let hiddenSplashScreen = false;
  let progressVal = tweened(100, { duration: 3000, easing: quintInOut });

  onMount(async () => {
    $progressVal = 0;
    await waitFor(3000);
    hiddenSplashScreen = true;
  });
</script>

{#if !(hiddenSplashScreen)}
  <div out:fadeOut={{ duration: 500 }} class="splash-screen" use:elevation={'bootup-screen'}>
    <!-- <AppleIcon /> -->
    <Icon name="ri-{$appConfig.isWin?'windows':'apple'}-fill" size={100} />
    {#if $appConfig.isWin}
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    {:else}
    <div
      class="progress"
      role="progressbar"
      aria-valuenow={100 - $progressVal}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext="Loading up Web os"
    >
      <div class="indicator" style:transform="translateX(-{$progressVal}%)" />
    </div>
    {/if}
  </div>
{/if}

<style lang="less">
  .splash-screen {
    position: fixed;
    top: 0;
    bottom: 0;

    height: 100vh;
    width: 100vw;

    cursor: none;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    animation-fill-mode: forwards;

    background-color: #000;
    z-index: 9999999 !important;
    :global(svg) {
      font-size: 100px;
      color: white;
    }
  }

  .progress {
    border-radius: 50px;

    height: 4px;
    width: 150px;

    overflow-x: hidden;

    background-color: var(--system-color-grey-800);
  }

  .indicator {
    background-color: var(--system-color-grey-100);

    border-radius: inherit;

    width: 100%;
    height: 100%;

    transform: translateX(-0%);
  }
  .lds-ring {
  /* change color here */
  color: #1c4c5b
}
.lds-ring,
.lds-ring div {
  box-sizing: border-box;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 40px;
  height: 40px;
  margin: 8px;
  border: 4px solid var(--system-color-grey-100);
  border-radius: 50%;
  animation: lds-ring 1.5s ease-in-out infinite;
  border-color: var(--system-color-grey-100) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
