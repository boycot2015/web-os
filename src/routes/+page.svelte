<script>
    import { onMount, onDestroy } from 'svelte';
    import { TabBar, Popup, Mask } from 'stdf';
    import { theme } from '@/store';
    import Swiper from '$lib/components/Swiper.svelte'
    import { fly } from 'svelte/transition';
    import appConfig from '$lib/appConfig';
    $: visible = false;
    const { apps = [], docks = [] } = appConfig
    const getTime = () => {
        const date = new Date();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return `${hour}:${minute}`;
    }
    $: time = getTime();
    let timer = [];
    $:initActive = ($theme.initActive > apps.length - 1 ? 1 : $theme.initActive) || 0;
    const onChange = (e) => {
        initActive = e.detail
        visible = !initActive
        theme.set({initActive: e.detail})
    }
    onMount(() => {
        timer.map(el => el && clearInterval(el))
        timer.push(setInterval(() => {
            time = getTime();
        }, 1000))
    })
    onDestroy(() => {
        timer.map(el => clearInterval(el))
    })
</script>
<style scoped lang="less">
    .indicate, .container {
        height: 100%;
    }
    :global(.tab-bar) {
        width: 100%;
        height: 100%;
    }
</style>
<div class="indicate pb-0 pt-0 {$theme.bgColor}">
    <div class="bg fixed h-full w-full" style="z-index: 1;">
        {#if $theme.component}
        <svelte:component this={$theme.component} {...$theme.props || {}} ></svelte:component>
        {:else if $theme.bgColor}
        <div class="{$theme.bgColor} h-full w-full"></div>
        {:else if $theme.bgUrl}
        <div style="background: url({$theme.bgUrl}) center/cover no-repeat;" class="bg-gradient-to-tr from-[#7367F0] to-[#CE9FFC] h-full w-full"></div>
        {:else}
        <div class="bg-gradient-to-tr from-[#7367F0] to-[#CE9FFC] h-full w-full"></div>
        {/if}
    </div>
    <div class="container relative" style="z-index: 3;">
        <Swiper autoplay={false} containerWidth={document.body.clientWidth} indicatePosition="{initActive?'out':'none'}" bind:initActive={initActive} loop={false} duration={500} aspectRatio={[10, initActive?16:21.6]} triggerSpeed={0.5} data={apps} on:change={(e) => onChange(e)} />
        <!-- <Popup bind:visible={visible} transparent position="left" size={100} radiusPosition="all" radius="xl" px="0" mask={{ opacity: 0, backdropBlur: 'base' }}>
            <svelte:component {...apps[initActive].props || {}} injClass={'bg-transparent'} on:click={() => {visible = false}} this={apps[initActive].component}></svelte:component>
        </Popup> -->
        {#if initActive}
        <div transition:fly="{{ y: 100, duration: 300 }}" class="fixed bottom-8 left-5 right-5 flex justify-around items-center">
            <TabBar labels={docks} tabInjClass="text-extend0 dark:text-extend2" activeTabInjClass="!text-primary dark:!text-dark" injClass="!bg-white/30 backdrop-blur-{$theme.backdropBlur === 'none'?'md':$theme.backdropBlur} px-2 tab-bar bottom-0 rounded-3xl shadow dark:shadow-white/10" />
        </div>
        {/if}
    </div>
    <Mask visible={true} backdropBlur="{$theme.backdropBlur || 'base'}" opacity={0.1} zIndex={2} />
</div>