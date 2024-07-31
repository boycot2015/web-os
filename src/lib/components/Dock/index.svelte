<script lang="ts">
import { appConfig } from '@/store';
import { Icon, BottomSheet, GridList, Swiper } from '$lib/components';
import { createAppConfig } from '$lib/helpers/create-app-config';
import { fly, scale } from 'svelte/transition';
import { afterUpdate } from 'svelte';
import { spring, tweened } from 'svelte/motion';
import { sineInOut } from 'svelte/easing';
import type { AppID } from '@/store/apps.store';
import {
    activeApp,
    activeAppZIndex,
    // appsInFullscreen,
    appZIndices,
    // isAppBeingDragged,
    openApps,
} from '@/store/apps.store';
let appID: AppID;
let datas = $appConfig.docks;
$: isActive = false;
$: $activeApp === appID && ($appZIndices[appID] = $activeAppZIndex);
  // Spring animation for the click animation
  const appOpenIconBounceTransform = tweened(0, {
    duration: 400,
    easing: sineInOut,
  });

  async function bounceEffect() {
    // Animate the icon
    await appOpenIconBounceTransform.set(-40);

    // Now animate it back to its place
    appOpenIconBounceTransform.set(0);
  }

  async function openApp(e, app) {
    appID = app.id || app.text || 'micro'
    if ($openApps[appID]) {
        if ($activeApp !== appID) {
            $openApps[appID].shouldOpenWindow = true
            $activeApp = appID
            return
        }
        $openApps[appID].shouldOpenWindow = !$openApps[appID].shouldOpenWindow
        return
    }
    $openApps[appID] = createAppConfig({
        ...app,
        isMaximized: false
    });
    const { shouldOpenWindow, externalAction } = $openApps[appID] || { shouldOpenWindow: true };
    if (!shouldOpenWindow) return externalAction?.(e);
    // For the bounce animation
    const isAppAlreadyOpen = !!$openApps[appID];
    
    $activeApp = appID;
    if (isAppAlreadyOpen) return;
    bounceEffect();
  }
  afterUpdate(() => {
    datas = $appConfig.docks;
  })
</script>
<style lang="less" scoped>
    .indicate, .container {
        height: 100%;
        user-select: none;
        min-height: 100vh;
        max-width: 100% !important;
        // max-width: 750px !important;
    }
    .nav-bar-wrap {
        transition: all .3s;
        // &.active {
        //     width: 700px !important;
        // }
    }
    .grid-wrap {
        transition: all .3s;
        &.active .grid-item {
            margin: 0 10px !important;
            // &:first-child {
            //     margin-left: 0 !important;
            // }
            // &:last-child {
            //     margin-right: 0 !important;
            // }
        }
    }
    .grid-item {
        transition: all .3s;
        position: relative;
        width: 58px;
        margin: 0 6px;
        &.active {
            transform: translateY(-30px) scale(1.5);
        }
        &.opened::after {
            content: '';
            width: 6px;
            height: 6px;
            background-color: var(--primary-color);
            border-radius: 50%;
            position: absolute;
            bottom: -10px;
            left: 50%;
            margin-left: -3px;
        }
    }
</style>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div transition:fly="{{ y: 100, duration: 300 }}"
on:mouseleave={(e) => {
    isActive = false;
}}
on:mouseover={(e) => {
    isActive = true;
}}
class="fixed bottom-4 nav-bar-wrap flex justify-around items-center {!!isActive?'active':''}" style="z-index:999!important;min-width: 60px;" on:dblclick|stopPropagation>
    <div class="nav-bar !bg-white/30 backdrop-blur-{$appConfig.backdropBlur === 'none'?'md':$appConfig.backdropBlur} p-2 tab-bar bottom-0 rounded-3xl shadow dark:shadow-white/10" style="max-width: 1200px;min-height:4rem;">
        <div class={`grid-wrap py-1.5 flex justify-around items-center ${!!isActive?'active':''}`}>
            {#each datas as app}
            <div
            title="{app.text}"
            class="grid-item relative flex flex-col relative justify-between {app.bgColor} {app.color} {app.injClass?app.injClass:'mx-1.5'} dark:bg-black h-full rounded-2xl text-md text-center shadow dark:shadow-white/10 {!!app.active?'active':''} {$openApps[app.text] && $openApps[app.text].shouldOpenWindow ? 'opened':''}"
            on:mouseleave={(e) => {
                app.active = false;
            }}
            on:mouseenter={(e) => {
                app.active = true;
            }}
            on:click={(e) => openApp(e, app)}
        >
            {#if app.icon}
                <Icon injClass="{app.injClass?'text-xs':'text-xl'}" size="{app.size || 38}" name="{app.icon}"></Icon>
            {/if}
            </div>
            {/each}
        </div>
    </div>
</div>