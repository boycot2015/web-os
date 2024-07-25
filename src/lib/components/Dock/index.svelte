<script lang="ts">
import { appConfig } from '@/store';
import { Icon, BottomSheet, GridList, Swiper } from '$lib/components';
import { createAppConfig } from '$lib/helpers/create-app-config';
import { fly, scale } from 'svelte/transition';
import { Grids, Grid } from '$lib/components';
import { spring, tweened } from 'svelte/motion';
import { sineInOut } from 'svelte/easing';
import type { AppID } from '@/store/apps.store';
import {
    activeApp,
    // activeAppZIndex,
    // appsInFullscreen,
    // appZIndices,
    // isAppBeingDragged,
    openApps,
} from '@/store/apps.store';

let appID: AppID;
export let datas;
$: isActive = false;

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
    $openApps[appID] = createAppConfig({
        ...app
    });
    const { shouldOpenWindow, externalAction } = $openApps[appID] || { shouldOpenWindow: true };
    if (!shouldOpenWindow) return externalAction?.(e);
    // For the bounce animation
    const isAppAlreadyOpen = !!$openApps[appID];
    
    $activeApp = appID;
    if (isAppAlreadyOpen) return;
    bounceEffect();
  }
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
        &.active {
            width: 700px !important;
        }
    }
    .grid-wrap {
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
        &.active {
            transform: translateY(-30px) scale(1.5);
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
class="fixed bottom-4 nav-bar-wrap flex justify-around items-center {!!isActive?'active':''}" style="z-index:999!important;width: 560px;">
    <div class="nav-bar !bg-white/30 backdrop-blur-{$appConfig.backdropBlur === 'none'?'md':$appConfig.backdropBlur} px-1 tab-bar bottom-0 rounded-3xl shadow dark:shadow-white/10" style="max-width: 1200px;min-height:4rem;">
        <!-- <GridList apps={$appConfig.docks.slice(0, 8)} cols={8} gap={6} readOnly={true} injClass="!px-1 !py-2"></GridList> -->
        <div class={`grid-wrap ${!!isActive?'active':''}`}>
            <Grids cols={'8'} mx="{'1'}" my="{'2'}" gap="{'6'}">
                {#each datas as app, i}
                <Grid row={app.row || 1} col={app.col || 1}>
                    <div
                    title="{app.text||app.desc}"
                    class="grid-item relative flex flex-col relative justify-between {app.bgColor} {app.color} {app.injClass?app.injClass:'mx-1.5'} dark:bg-black {app.subText?'py-1.5':'p-3'} h-full rounded-2xl text-md text-center shadow dark:shadow-white/10 {!!app.active?'active':''}"
                    on:mouseleave={(e) => {
                        app.active = false;
                    }}
                    on:mouseenter={(e) => {
                        app.active = true;
                    }}
                    on:click={(e) => openApp(e, app)}
                >
                    {#if app.subText}
                        <div class="text-xs">{app.subText}</div>
                    {/if}
                    {#if app.render}
                        <div class="text-3xl">{app.render()}</div>
                    {:else if app.icon}
                        <Icon injClass="{app.injClass?'text-xs':'text-xl'}" size="{app.size || 38}" name="{app.icon}"></Icon>
                    {:else}
                        <svelte:component {...app.props || {}} this={app.component}></svelte:component>
                    {/if}
                    {#if app.closable && !app.readOnly}
                        <div role="none" class="!absolute bg-white/80 rounded-2xl p-0 shadow z-99999 text-gray-500 !top-[-5px] !left-[-5px] text-sm" >
                            <Icon size="{22}" name="ri-close-line"></Icon>
                        </div>
                    {/if}
                </div>
                </Grid>
                {/each}
            </Grids>
        </div>
    </div>
</div>