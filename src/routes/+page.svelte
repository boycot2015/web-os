<svelte:head>
    {#if $appConfig.app && $appConfig.app.name}
        <title>{$appConfig.app.name}</title>
    {/if}
</svelte:head>
<script>
    import { onMount, onDestroy } from 'svelte';
    import { Mask, Input } from 'stdf';
    import { appConfig, setBgColor } from '@/store';
    import Swiper from '$lib/components/Swiper.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { fly, scale } from 'svelte/transition';
    import appsConf from '$lib/appConfig';
    import Bars from '$lib/components/apps/grid.svelte';
    import { Icon, BottomSheet } from '$lib/components';
    $: visible = false;
    $: modal = $appConfig.modal;
    $: mask = $appConfig.mask;
    const { apps = [], docks = [], components = [] } = appsConf
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
    let container = {
        clientWidth: $appConfig.clientWidth
    };
    let cols = 4;
    let gap = 4;
    export let data;
    let ssr = data.ssr;
    let appData = [];
    let docksData = [];
    let pressTime = 0;
    let pressInterval = null;
    let componentsVisible = false;
    let keyword = '';
    const onChange = (e) => {
        visible = !e.detail
        appConfig.set({ index: e.detail })
    }
    const sortAppData = (apps, props) => {
        return apps.map(app => {
            if (app.props) {
                if (md || lg || xl) {
                    if (app.props && app.props.cols >= 12) {
                        app.col = 12
                    }
                    if (app.props && app.props.modal && app.props.modal.props) {
                        app.props.modal.props.cols = props.cols || app.props.modal.props.cols
                        app.props.modal.props.gap = props.gap || app.props.modal.props.gap
                        if (app.props.modal.props.apps && app.props.modal.props.apps.length) {
                            app.props.modal.props.apps = sortAppData(app.props.modal.props.apps, props)
                        }
                    }
                } else {
                    if (app.props && app.props.modal && app.props.modal.props) {
                        if (app.props.modal.props.apps && app.props.modal.props.apps.length) {
                            app.props.modal.props.apps = sortAppData(app.props.modal.props.apps, props)
                        }
                    }
                }
                if (app.props.apps && app.props.apps.length) {
                    app.props.apps = sortAppData(app.props.apps, {...props, closeable: props.closeable && !app.props.modal })
                }
                for (const key in props) {
                    if (Object.hasOwnProperty.call(app.props, key)) {
                        app.props[key] = props[key]
                    }
                }
            }
            return { ...app, ...props }
        })
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
            appData = apps.map((el, index) => {
                if (md || lg || xl) {
                    if (el.props) {
                        el.props.apps = el.props.apps.filter(app => !app.component || !index || index === apps.length - 1)
                        el.props.apps = sortAppData(el.props.apps, { cols, gap })
                        el.props.cols = cols
                        el.props.gap = gap
                    }
                    return el
                }
                return el
            })
            docksData = docks.slice(0, cols);
            $appConfig.md = md
            $appConfig.lg = lg
            $appConfig.xl = lg
            $appConfig.cols = cols
            $appConfig.gap = gap
            $appConfig.clientWidth = clientWidth
        }, 100);
        $appConfig.bgUrl && setBgColor($appConfig.bgUrl)
        $appConfig.modal = ''
        $appConfig.editable = false
    })
    const onEditApps = (props = { closeable: true }) => {
        clearInterval(pressInterval);
        if ((pressTime < 5 && props.closeable) || !$appConfig.editable) {
            return
        }
        appData = apps.map((el, index) => {
            if (el.props) {
                el.props.apps = sortAppData(el.props.apps, props)
            }
            return el
        })
        docksData = docksData.map(el => ({...el, ...props}))
        // console.log(appData, 'appData');
        $appConfig.editable = props.closeable;
        ssr = true
        setTimeout(() => {
            ssr = false
        }, 600);
    }
    const onPointerdown = (e) => {
        pressTime = 0;
        e.preventDefault();
        e.stopPropagation();
        if ($appConfig.editable) return
        clearInterval(pressInterval);
        pressInterval = setInterval(() => {
            pressTime++;
        }, 200)
    }
    $: if (pressTime >= 5) {
        $appConfig.editable = true;
        onEditApps({ closeable: true })
    }
    onDestroy(() => {
        timer.map(el => clearInterval(el))
    })
</script>
<style scoped lang="less">
    .indicate, .container {
        height: 100%;
        user-select: none;
        max-width: 100% !important;
        // max-width: 750px !important;
    }
    :global(.tab-bar) {
        width: 100%;
        height: 100%;
    }
</style>
<!-- style="background: url({$appConfig.bgUrl}) center/cover no-repeat;" -->
<div class="indicate pb-0 pt-0 {$appConfig.bgColor}">
    {#if $appConfig.editable}
        {#if $appConfig.index !==apps.length - 1}
            <div class="fixed text-lg bg-white/30 text-black rounded-2xl px-3 left-3 top-1.5"
            role="none"
            on:click={(e) => {
                componentsVisible = true;
                mask = true;
            }} style="z-index:4;">
                <Icon name="ri-add-fill" size="20"></Icon>
            </div>
        {/if}
        <div class="fixed text-lg bg-white/30 text-black rounded-2xl px-3 right-3 top-1.5"
        role="none"
        on:click={(e) => {
            pressTime = 0;
            e.preventDefault();
            clearInterval(pressInterval);
            onEditApps({ closeable: false });
            $appConfig.editable = false;
        }} style="z-index:4;">完成</div>
    {/if}
    {#if !ssr && (!$appConfig.modal || ($appConfig.modal && !$appConfig.modal.props.visible))}
        <div class="container relative" bind:this={container} transition:scale={{start: 0.8, duration: 500 }} style="z-index: 3;" role="none"
            on:click={(e) => {
                pressTime = 0;
                e.preventDefault();
                clearInterval(pressInterval);
                onEditApps({ closeable: false });
                $appConfig.editable = false;
            }}
            on:pointermove={(e) => {
                pressTime = 0;
                clearInterval(pressInterval);
            }}
            on:pointerup={(e) => {
                pressTime = 0;
                clearInterval(pressInterval);
            }}
            on:pointerdown={onPointerdown}>
            {#if clientWidth}
                <Swiper autoplay={false} innerInjClass={`wrap-content ${md || lg || xl ?'!py-4':''}`} containerWidth={clientWidth} indicatePosition="{$appConfig.index&&$appConfig.index !==apps.length - 1?'inner':'none'}" bind:initActive={$appConfig.index} loop={false} duration={500} aspectRatio={[10, $appConfig.index?16:21.6]} triggerSpeed={0.5} data={appData} on:change={(e) => onChange(e)} height={'100vh'} indicateInjClass={'!bottom-40 !from-black/0 !to-black/0'} />
                {#if $appConfig.index && $appConfig.index !==apps.length - 1}
                    <div transition:fly="{{ y: 100, duration: 300 }}" class="fixed bottom-8 left-5 right-5 flex justify-around items-center">
                        <div class="nav-bar !bg-white/30 backdrop-blur-{$appConfig.backdropBlur === 'none'?'md':$appConfig.backdropBlur} px-2 tab-bar bottom-0 rounded-3xl shadow dark:shadow-white/10" style="max-width: 1200px;">
                            <Bars apps={docksData} cols={cols} gap={8} injClass="!px-2"></Bars>
                        </div>
                    </div>
                {/if}
            {/if}
        </div>
        <BottomSheet closeContent="" injClass="!bg-transparent backdrop-blur-2xl" closeHeight={50} showDivider={false} title="slot" stayHeightList={[50, 90]}  maskClosable on:close={() => mask = ''} on:clickMask={() => mask = ''} radius="full" bind:visible={componentsVisible}>
            <div slot="title" class="search-box px-4">
                <Input radius="2xl" value={keyword} placeholder="搜索小组件"></Input>
            </div>
            <svelte:component this={components.component} {...components.props} injClass='!px-6 !pt-3 !pb-[6rem] rounded-2xl'></svelte:component>
        </BottomSheet>
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
    <Mask visible={true} backdropBlur="{(!$appConfig.index || $appConfig.index == apps.length - 1)&&$appConfig.backdropBlur==='none'?'base':($appConfig.backdropBlur || 'base')}" opacity={0.1} zIndex={mask ? 3 : 2} />
</div>