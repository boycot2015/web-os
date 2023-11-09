<script>
    import { onMount, onDestroy } from 'svelte';
    import { TabBar, Popup } from 'stdf';
    import Swiper from '$lib/components/Swiper.svelte'
    import { fly } from 'svelte/transition';
    import appConfig from './appConfig';
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
    $:initActive = 2;
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
    :global(.tab-bar) {
        width: 100%;
        height: 100%;
    }
</style>
<div class="indicate pb-0 pt-0">
    <Swiper autoplay={false} containerWidth={document.body.clientWidth} indicatePosition="{initActive?'out':'none'}" bind:initActive={initActive} loop={false} duration={500} aspectRatio={[10, initActive?16:17]} triggerSpeed={0.5} data={apps} on:change={(e) => {initActive = e.detail;visible = !initActive}} />
    <!-- <Popup bind:visible={visible} transparent position="left" size={100} radiusPosition="all" radius="xl" px="0" mask={{ opacity: 0, backdropBlur: 'base' }}>
        <svelte:component {...apps[initActive].props || {}} injClass={'bg-transparent'} on:click={() => {visible = false}} this={apps[initActive].component}></svelte:component>
    </Popup> -->
    {#if initActive}
    <div transition:fly="{{ y: 50, duration: 300 }}" class="fixed bottom-3 left-3 right-3 flex justify-around items-center">
        <TabBar labels={docks} tabInjClass="text-extend0 dark:text-extend2" activeTabInjClass="!text-primary dark:!text-dark" injClass="px-2 tab-bar bottom-0 rounded-full shadow dark:shadow-white/10" />
    </div>
    {/if}
</div>