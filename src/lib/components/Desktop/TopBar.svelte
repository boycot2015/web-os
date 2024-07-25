<script lang="ts">
      import { appConfig } from '@/store';
    import Icon from '$lib/components/Icon.svelte';
    import { onMount } from 'svelte';
    import { sineInOut } from 'svelte/easing';
    import { tweened } from 'svelte/motion';
    import { elevation } from '$lib/actions';
    import { fadeIn } from '$lib/helpers/fade';
    import { settings } from '$lib/appConfig';
    import type { AppID } from '@/store/apps.store';
    import { createAppConfig } from '$lib/helpers/create-app-config';
    import {
        activeApp,
        // activeAppZIndex,
        // appsInFullscreen,
        // appZIndices,
        // isAppBeingDragged,
        openApps,
    } from '@/store/apps.store';

    let appID: AppID;

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
    onMount(async () => {});
  </script>
  
  <div in:fadeIn={{ duration: 500 }} class="top-bar" use:elevation={'bootup-screen'}>
    <div class="menu">
        <Icon name="ri-{$appConfig.isWin?'windows':'apple'}-fill" size={22} on:click={(e) => openApp(e, settings)} />
    </div>
    <div class="info">
        <Icon name="ri-information-fill" size={22} on:click={(e) => openApp(e, settings)} />
    </div>
  </div>
  
  <style lang="less">
    .top-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 34px;
        width: 100vw;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--color-fff);
        background-color: rgba(0, 0, 0, 0.6);
    }
  </style>
  