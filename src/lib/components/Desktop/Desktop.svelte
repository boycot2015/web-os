<script lang="ts">
    import { appConfig } from '@/store';
    import Dock from '$lib/components/Dock/index.svelte';
    import TopBar from './TopBar.svelte';
    import BootupScreen from './BootupScreen.svelte';
    import ContentMenu from '$lib/components/contentMenu/index.svelte';
    import WindowsArea from './Window/WindowsArea.svelte';
    import Theme from '$lib/components/apps/theme.svelte';
    // import { onMount } from 'svelte';
    $: isImageLoaded = false;
    $: themeVisible = false;
    export let datas;
    let mainEl: HTMLElement;
    const onMenuClick = (e) => {
        if (e.detail === 'changeTheme') {
            themeVisible = true
        }
        if (e.detail === 'randomWallpaper') {
            let image = new Image();
            isImageLoaded = false;
            image.src = 'https://bing.img.run/rand_uhd.php'+ '?timestamp=' + new Date().getTime()
            image.onload = () => {
                isImageLoaded = true;
                setTimeout(() => {
                    $appConfig.bgUrl = image.src;
                }, 250);
            }
        }
    }
</script>

<div bind:this={mainEl} class="container">
  <main class="pb-0 pt-0 flex justify-around items-center">
        <TopBar />
        <WindowsArea />
        <Dock {datas} />
        <ContentMenu on:menuClick={onMenuClick} />
        <Theme contentSlot component="" bind:visible={themeVisible} />
        <div class="bg pb-0 pt-0 flex justify-around items-center {isImageLoaded?'active':''} {$appConfig.bgColor}" style="background: url({$appConfig.bgUrl}) center/cover no-repeat fixed;">
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
    overflow: hidden;
  }

  main {
    height: 100vh;
    width: 100vw;
    display: flex;
    position: relative;
    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        // will-change: wbackground-image;
        // transition: background-image 0.25s ease-in 0s;
        &.active {
            animation: scale .5s ease-in-out;
            @keyframes scale {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.5;
                    transform: scale(1.2);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        }
    }
  }
</style>
