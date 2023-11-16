<svelte:head>
    {#if $theme.app && $theme.app.name}
        <title>{$theme.app.name}</title>
    {/if}
</svelte:head>
<script>
    import { onMount, onDestroy } from 'svelte';
    import { Mask } from 'stdf';
    import { theme, setBgColor } from '@/store';
    import Swiper from '$lib/components/Swiper.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { fly, scale } from 'svelte/transition';
    import appConfig from '$lib/appConfig';
    import Bars from '$lib/components/apps/grid.svelte';
    $: visible = false;
    $: modal = $theme.modal;
    const { apps = [], docks = [] } = appConfig
    const getTime = () => {
        const date = new Date();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return `${hour}:${minute}`;
    }
    $: time = getTime();
    let timer = [];
    let clientWidth = 0;
    export let data;
    let ssr = data.ssr
    const onChange = (e) => {
        visible = !e.detail
        theme.set({ index: e.detail })
    }
    onMount(() => {
        timer.map(el => el && clearInterval(el))
        timer.push(setInterval(() => {
            time = getTime();
        }, 1000))
        clientWidth = document.body.clientWidth
        ssr = false
        $theme.bgUrl && setBgColor($theme.bgUrl)
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
<div class="indicate pb-0 pt-0 {$theme.bgColor}" style="background: url({$theme.bgUrl}) center/cover no-repeat;">
    <!-- <div class="bg fixed h-full w-full" style="z-index: 1;">
        {#if $theme.component}
        <svelte:component this={$theme.component} {...$theme.props || {}} ></svelte:component>
        {:else if $theme.bgColor}
        <div class="{$theme.bgColor} h-full w-full"></div>
        {:else if $theme.bgUrl}
        <div style="background: url({$theme.bgUrl}) center/cover no-repeat;" class="bg-gradient-to-tr from-[#7367F0] to-[#CE9FFC] h-full w-full"></div>
        {:else}
        <div class="bg-gradient-to-tr from-[#7367F0] to-[#CE9FFC] h-full w-full"></div>
        {/if}
    </div> -->
    {#if !ssr &&(!$theme.modal || ($theme.modal && !$theme.modal.props.visible))}
        <div class="container relative" transition:scale={{start: 0.8, duration: 500 }} style="z-index: 3;">
            <Swiper autoplay={false} containerWidth={clientWidth} indicatePosition="{$theme.index&&$theme.index !==apps.length - 1?'inner':'none'}" bind:initActive={$theme.index} loop={false} duration={500} aspectRatio={[10, $theme.index?16:21.6]} triggerSpeed={0.5} data={apps} on:change={(e) => onChange(e)} height={'100vh'} indicateInjClass={'!bottom-40 !from-black/0 !to-black/0'} />
            {#if $theme.index && $theme.index !==apps.length - 1}
            <div transition:fly="{{ y: 100, duration: 300 }}" class="fixed bottom-8 left-5 right-5 flex justify-around items-center">
                <div class="nav-bar !bg-white/30 backdrop-blur-{$theme.backdropBlur === 'none'?'md':$theme.backdropBlur} px-2 tab-bar bottom-0 rounded-3xl shadow dark:shadow-white/10">
                    <Bars apps={docks} cols={4} gap={8} injClass="!px-2"></Bars>
                </div>
            </div>
            {/if}
        </div>
    {/if}
    {#if modal}
    <div class="modal" on:pointerdown={(e) => e.stopPropagation()}
        on:pointermove={(e) => e.stopPropagation()}
        on:pointerup={(e) => e.stopPropagation()}>
        <Modal bind:visible={modal.props.visible} title="{modal.props.title}" injTitleClass="text-white !text-left text-2xl" on:close={() => $theme.modal.props.visible = false} showBtn={modal.props.showBtn ||false} contentSlot popup={{size: 34, radiusPosition: 'all',radius: 'xl', transparent: true, position: 'center', easeType: 'cubicInOut',duration: 500 ,outDuration: 500,px: 4, py: 0, mask: {opacity: 0.3, backdropBlur: '2xl'}, ...modal.props.popup}}>
            {#if modal.component}
                <svelte:component injClass={modal.props.injClass} apps={modal.props.apps} gap={modal.props.gap} mx={modal.props.mx}
                my={modal.props.my} this={modal.component}></svelte:component>
            {:else}
                请传入组件！
            {/if}
        </Modal>
    </div>
    {/if}
    <Mask visible={true} backdropBlur="{(!$theme.index || $theme.index == apps.length - 1)&&$theme.backdropBlur==='none'?'base':($theme.backdropBlur || 'base')}" opacity={0.1} zIndex={2} />
</div>