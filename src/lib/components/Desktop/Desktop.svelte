<script lang="ts">
  import { appConfig } from '@/store';
  import Dock from '$lib/components/Dock/index.svelte';
    //   import TopBar from '$lib/components/TopBar/TopBar.svelte';
    //   import Wallpaper from '../apps/WallpaperApp/Wallpaper.svelte';
  import BootupScreen from './BootupScreen.svelte';
  import WindowsArea from './Window/WindowsArea.svelte';
  import { appsInFullscreen, activeApp } from '@/store/apps.store';
//   const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

//   if (!isMac) {
//     Promise.all([
//       import('@fontsource/inter/latin-ext-300.css'),
//       import('@fontsource/inter/latin-ext-400.css'),
//       import('@fontsource/inter/latin-ext-500.css'),
//       import('@fontsource/inter/latin-ext-600.css'),
//     ]).then(() => {
//       console.log(1);
//     });
//   }
  let mainEl: HTMLElement;
  export let datas;
</script>

<div bind:this={mainEl} class="container">
  <main>
    <div class="indicate pb-0 pt-0 flex justify-around items-center {$appConfig.bgColor}" style="background: url({$appConfig.bgUrl}) center/center no-repeat;">
        <!-- <TopBar /> -->
        <WindowsArea />
        <Dock {datas} />
    </div>
  </main>

  <!-- <Wallpaper /> -->
  <BootupScreen />

</div>

<style lang="less">
  .container {
    height: 100vh;
    width: 100vw;
    max-width: 100vw;
  }

  main {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
</style>
