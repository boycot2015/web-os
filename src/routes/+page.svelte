<svelte:head>
    {#if $appConfig.app && $appConfig.app.name}
        <title>{$appConfig.app.name}</title>
    {/if}
</svelte:head>
<script>
    import { onMount, onDestroy } from 'svelte';
    import { Mask } from 'stdf';
    import { appConfig, setBgColor } from '@/store';
    import Swiper from '$lib/components/Swiper.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { fly, scale } from 'svelte/transition';
    import appsConf from '$lib/appConfig';
    import Bars from '$lib/components/apps/grid.svelte';
    $: visible = false;
    $: modal = $appConfig.modal;
    const { apps = [], docks = [] } = appsConf
    let md = false;
    let lg = false;
    let xl = false;
    const getTime = () => {
        const date = new Date();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return `${hour}:${minute}`;
    }
    $: time = getTime();
    let timer = [];
    let clientWidth = 0;
    let container = {};
    let cols = 4;
    let gap = 4;
    export let data;
    let ssr = data.ssr;
    let appData = [];
    const onChange = (e) => {
        visible = !e.detail
        appConfig.set({ index: e.detail })
    }
    onMount(() => {
        ssr = false
        timer.map(el => el && clearInterval(el))
        timer.push(setInterval(() => {
            time = getTime();
        }, 1000))
        setTimeout(() => {
            clientWidth = container.clientWidth
            md = clientWidth >= 640 && clientWidth < 768
            lg = clientWidth >= 768 && clientWidth < 1200
            xl = clientWidth >= 1200
            cols = xl ? 12 : lg ? 8 : 4
            gap = xl ? 8 : lg ? 2 : 4
            const adapterWindow = (apps) => {
                return apps.map(app => {
                    if (app.props) {
                        if (app.props && app.props.cols >= 12) {
                            app.col = 12
                        }
                        if (app.props && app.props.modal && app.props.modal.props) {
                            app.props.modal.props.cols = cols
                            app.props.modal.props.gap = gap
                            if (app.props.modal.props.apps && app.props.modal.props.apps.length) {
                                app.props.modal.props.apps = adapterWindow(app.props.modal.props.apps)
                            }
                        }
                        if (app.props.apps && app.props.apps.length) {
                            app.props.apps = adapterWindow(app.props.apps)
                        }
                    }
                    return app
                })
            }
            appData = apps.map((el, index) => {
                if (md || lg || xl) {
                    if (el.props) {
                        el.props.apps = el.props.apps.filter(app => !app.component || !index || index === apps.length - 1)
                        el.props.apps = adapterWindow(el.props.apps)
                        el.props.cols = cols
                        el.props.gap = gap
                    }
                    return el
                }
                return el
            })
            $appConfig.md = md
            $appConfig.lg = lg
            $appConfig.xl = lg
            $appConfig.cols = cols
            $appConfig.gap = gap
            // console.log(appData, 'appData');
        }, 100);
        $appConfig.bgUrl && setBgColor($appConfig.bgUrl)
    })
    onDestroy(() => {
        timer.map(el => clearInterval(el))
    })
</script>
<style scoped lang="less">
    .indicate, .container {
        height: 100%;
        max-width: 100% !important;
        // max-width: 750px !important;
    }
    :global(.tab-bar) {
        width: 100%;
        height: 100%;
    }
</style>
<div class="indicate pb-0 pt-0 {$appConfig.bgColor}" style="background: url({$appConfig.bgUrl}) center/cover no-repeat;">
    <!-- <div class="bg fixed h-full w-full" style="z-index: 1;">
        {#if $appConfig.component}
        <svelte:component this={$appConfig.component} {...$appConfig.props || {}} ></svelte:component>
        {:else if $appConfig.bgColor}
        <div class="{$appConfig.bgColor} h-full w-full"></div>
        {:else if $appConfig.bgUrl}
        <div style="background: url({$appConfig.bgUrl}) center/cover no-repeat;" class="bg-gradient-to-tr from-[#7367F0] to-[#CE9FFC] h-full w-full"></div>
        {:else}
        <div class="bg-gradient-to-tr from-[#7367F0] to-[#CE9FFC] h-full w-full"></div>
        {/if}
    </div> -->
    {#if !ssr && (!$appConfig.modal || ($appConfig.modal && !$appConfig.modal.props.visible))}
        <div class="container relative" bind:this={container} transition:scale={{start: 0.8, duration: 500 }} style="z-index: 3;">
            {#if clientWidth}
                <Swiper autoplay={false} innerInjClass={`wrap-content ${md || lg || xl ?'!py-4':''}`} containerWidth={clientWidth} indicatePosition="{$appConfig.index&&$appConfig.index !==apps.length - 1?'inner':'none'}" bind:initActive={$appConfig.index} loop={false} duration={500} aspectRatio={[10, $appConfig.index?16:21.6]} triggerSpeed={0.5} data={appData} on:change={(e) => onChange(e)} height={'100vh'} indicateInjClass={'!bottom-40 !from-black/0 !to-black/0'} />
                {#if $appConfig.index && $appConfig.index !==apps.length - 1}
                    <div transition:fly="{{ y: 100, duration: 300 }}" class="fixed bottom-8 left-5 right-5 flex justify-around items-center">
                        <div class="nav-bar !bg-white/30 backdrop-blur-{$appConfig.backdropBlur === 'none'?'md':$appConfig.backdropBlur} px-2 tab-bar bottom-0 rounded-3xl shadow dark:shadow-white/10" style="max-width: 1200px;">
                            <Bars apps={docks.slice(0, cols)} cols={cols} gap={8} injClass="!px-2"></Bars>
                        </div>
                    </div>
                {/if}
            {/if}
        </div>
    {/if}
    {#if modal}
    <div class="modal" on:pointerdown={(e) => e.stopPropagation()}
        on:pointermove={(e) => e.stopPropagation()}
        on:pointerup={(e) => e.stopPropagation()}>
        <Modal bind:visible={modal.props.visible} title="{modal.props.title}" injTitleClass="text-white !text-left text-2xl" on:close={() => $appConfig.modal.props.visible = false} showBtn={modal.props.showBtn ||false} contentSlot popup={{size: 34, radiusPosition: 'all',radius: 'xl', transparent: true, position: 'center', easeType: 'cubicInOut',duration: 500 ,outDuration: 500,px: 4, py: 0, mask: {opacity: 0.3, backdropBlur: '2xl'}, ...modal.props.popup}}>
            {#if modal.component}
                <svelte:component injClass={modal.props.injClass} cols={modal.props.cols} apps={modal.props.apps} gap={modal.props.gap} mx={modal.props.mx}
                my={modal.props.my} this={modal.component}></svelte:component>
            {:else}
                请传入组件！
            {/if}
        </Modal>
    </div>
    {/if}
    <Mask visible={true} backdropBlur="{(!$appConfig.index || $appConfig.index == apps.length - 1)&&$appConfig.backdropBlur==='none'?'base':($appConfig.backdropBlur || 'base')}" opacity={0.1} zIndex={2} />
</div>