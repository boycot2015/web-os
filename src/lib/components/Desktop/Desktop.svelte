<script lang="ts">
    import { appConfig } from '@/store';
    import { openApps } from '@/store/apps.store';
    import Dock from '$lib/components/Dock/index.svelte';
    import TopBar from './TopBar.svelte';
    import BootupScreen from './BootupScreen.svelte';
    import ContentMenu from '$lib/components/contentMenu/index.svelte';
    import WindowsArea from './Window/WindowsArea.svelte';
    import Theme from '$lib/components/apps/theme.svelte';
    import AppDialog from '$lib/components/apps/AppDialog.svelte';
    
    // import { onMount } from 'svelte';
    $: isImageLoaded = false;
    $: themeVisible = false;
    $: appVisible = false;
    $: app = {};
    $: showLayout = true;
    let mainEl: HTMLElement;
    openApps.set({})
    const onMenuClick = (e) => {
        if (e.detail.event === 'changeTheme') {
            themeVisible = true
        }
        if (e.detail.event === 'addApp' || e.detail.event === 'editApp') {
            app = e.detail.app || {}
            appVisible = true
        }
        if (e.detail.event === 'removeApp') {
            $appConfig.winApps = $appConfig.winApps.filter(el => el.text !== e.detail.app?.text)
            $appConfig.docks = $appConfig.docks.filter(el => el.text !== e.detail.app?.text)
            $openApps[e.detail.app?.text] && ($openApps[e.detail.app?.text] = false)
        }
        if (e.detail.event === 'randomWallpaper') {
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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={mainEl} class="container" on:dblclick|preventDefault={() => showLayout = !showLayout}>
  <main class="pb-0 pt-0 flex justify-around items-center">
        <div class="content flex justify-around items-center" style="display: {showLayout?'flex':'none'};">
            <TopBar />
            <WindowsArea />
            <Dock />
            <ContentMenu on:menuClick={onMenuClick} />
            <Theme contentSlot component="" bind:visible={themeVisible} />
            <AppDialog bind:visible={appVisible} app={app} />
        </div>
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
