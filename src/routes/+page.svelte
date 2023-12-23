<svelte:head>
    {#if $appConfig.app && $appConfig.app.name}
        <title>{$appConfig.app.name}</title>
    {/if}
</svelte:head>
<script>
    import { onMount, onDestroy, afterUpdate } from 'svelte';
    import { Mask, Input, Dialog } from 'stdf';
    import * as stdfComs from 'stdf';
    import * as appConf from '$lib/appConfig';
    import { appConfig, setBgColor } from '@/store';
    import Modal from '$lib/components/Modal.svelte';
    import { fly, scale } from 'svelte/transition';
    import { Icon, BottomSheet, GridList, Swiper } from '$lib/components';
    import { Cell, CellGroup } from '$lib/components';
    import ContentMenu from '$lib/components/contentMenu/index.svelte';
    import Theme from '$lib/components/apps/theme.svelte'
    import * as coms from '$lib/components/apps';
    import { goto } from '$app/navigation';
    import { register } from 'swiper/element/bundle';
    let md = false;
    let ssr = false;
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
    let pressTime = 0;
    let pressInterval = null;
    let keyword = '';
    let componentApps = appConf.default.components?.props?.apps || [];
    let componentsData = appConf.default.components || {}
    const onEditApps = (props = { closable: true, refresh: false }) => {
        clearInterval(pressInterval);
        if (((pressTime < 5 && props.closable) || !$appConfig.editable) && !props.refresh) {
            return
        }
        ssr = true
        $appConfig.apps = $appConfig.apps.map((el, index) => {
            if (el.props) {
                el.props.apps = sortAppData(el.props.apps, { ...props, index })
                el.totalCount = el.props.apps.reduce((prev, cur) => (cur.row ? cur.row * (cur.col || 2) : 1) + prev, 0)
                el.totalRows = el.props.apps.reduce((prev, cur) => (cur.row ? cur.col / cur.row : 1/4) + prev, 0)
            }
            return el
        })
        $appConfig.docks =  $appConfig.docks.map((el, index) => ({...el, ...props, index}))
        $appConfig.editable = props.closable;
        ssr = true
        setTimeout(() => {
            ssr = false
        }, 600);
        // console.log($appConfig.apps, '$appConfig.apps');
    }
    const sortAppData = (apps, props) => {
        return apps.map((app, index) => {
            app.componentName = typeof app.component === 'string' ? app.component : app.componentName
            app.componentName && (app.component = coms.default[app.componentName]||stdfComs[app.componentName]||GridList)
            if (app.props) {
                // for (const key in props) {
                //     if (Object.hasOwnProperty.call(app.props, key)) {
                //         app.props[key] = app.props[key] === 3 ? 3 : props[key]
                //     }
                // }
                if (app.full) {
                    app.col = (md || lg || xl) ? 12 : 4
                }
                if (app.props && app.props.modal && app.props.modal.props) {
                    app.props.modal.props.cols = props.cols || app.props.modal.props.cols
                    app.props.modal.props.gap = props.gap || app.props.modal.props.gap
                    if (app.props.modal.props.apps && app.props.modal.props.apps.length) {
                        app.props.modal.props.apps = sortAppData(app.props.modal.props.apps, {...props, index: (props.index||0) + '' + index})
                    }
                    app.props.cols&&(app.props.cols === 3 ? 3 : 4)
                    app.props.gap = md || lg || xl ? 2:1
                    app.props.modal.componentName = typeof app.props.modal.component === 'string' ? app.props.modal.component : app.props.modal.componentName
                    app.props.modal.componentName && (app.props.modal.component = coms.default[app.props.modal.componentName] ||stdfComs[app.props.modal.componentName]|| GridList)
                }
                if (app.props.apps && app.props.apps.length) {
                    app.props.apps = sortAppData(app.props.apps, {...props, index: (props.index||0) + '' + index, closable: props.closable && !app.props.modal, cols: app.props.modal ? app.props.cols: props.cols })
                }
            }
            return { ...app, ...props, index: (props.index||0) + '' + index }
        })
    }
    onMount(() => {
        ssr = false
        timer.map(el => el && clearInterval(el))
        timer.push(setInterval(() => {
            time = getTime()
        }, 1000))
        clientWidth = container?.clientWidth || $appConfig.clientWidth
        md = clientWidth >= 640 && clientWidth < 768
        lg = clientWidth >= 768 && clientWidth < 1200
        xl = clientWidth >= 1200 || window.innerWidth >= 1200
        cols = xl ? 12 : lg ? 8 : 4
        gap = xl ? 8 : lg ? 6 : md ? 4 : 4
        $appConfig.md = md
        $appConfig.lg = lg
        $appConfig.xl = xl
        $appConfig.cols = cols
        $appConfig.gap = gap
        $appConfig.clientWidth = clientWidth
        $appConfig.apps = $appConfig.apps.map((el, index) => {
            el.componentName = typeof el.component === 'string' ? el.component : el.componentName
            el.componentName && (el.component = coms.default[el.componentName] ||stdfComs[el.componentName]|| GridList)
            if (el.props) {
                // el.props.apps = el.props.apps.map(app => ({...app, hidden: (md || lg || xl) && (app.type==='component'&&index && index !== $appConfig.apps.length - 1)}))
                el.props.cols = cols
                el.props.gap = gap
                el.props.apps = sortAppData(el.props.apps, { cols, gap, index, closable: false })
                el.totalCount = el.props.apps?.reduce((prev, cur) => (cur.row ? cur.row * (cur.col || 2) : 1) + prev, 0)
                el.totalRows = el.props.apps.reduce((prev, cur) => (cur.row ? cur.col / cur.row : 1/4) + prev, 0)
            }
            return el
        })
        $appConfig.docks = $appConfig.docks.map(el => ({...el, componentName: typeof el.component === 'string' ? el.component : el.componentName, component: (el.component||el.componentName)?coms.default[app.component||el.componentName] ||stdfComs[app.component||el.componentName]|| GridList:null, closable: false }));
        componentsData = {...appConf.default.components, component: GridList, props: {...appConf.default.components.props, apps: sortAppData(appConf.default.components.props.apps, { cols, gap }), cols, totalCount: 100}}
        $appConfig.bgUrl && setBgColor($appConfig.bgUrl)
        $appConfig.mask = '';
        $appConfig.modal = '';
        $appConfig.dialog = '';
        $appConfig.editable = false
        $appConfig.componentVisible = false
    })
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
    afterUpdate (() => {
        // console.log($appConfig.apps[$appConfig.index].props.apps, "Updated");
        // ssr = false
    })
    onDestroy(() => {
        timer.map(el => clearInterval(el))
    })
    $: if (pressTime >= 5) {
        $appConfig.editable = true;
        onEditApps({ closable: true })
    }
    $: themeVisible = false;
    $: modal = $appConfig.modal;
    $: dialog = $appConfig.dialog;
    $: mask = $appConfig.mask;
    $: if($appConfig.refresh) {
        setTimeout(() => {
            onComponentClose()
        }, 300);
    };
    const onSearch = (e) => {
        componentApps = e.detail ? appConf.default.components.props.apps.filter(el => (el.text || el.title).includes(e.detail)) : appConf.default.components.props.apps
    }
    const onComponentClose = (e) => {
        $appConfig.mask = '';
        $appConfig.modal = '';
        $appConfig.dialog = '';
        onEditApps({ closable: true, refresh: $appConfig.refresh })
        $appConfig.refresh = false
    }
    const onCellClick = (e, item, i) => {
        if (item.url) {
            if (item.url.includes('http')) goto(`/micro/${item.url}/${item.title||item.text}/${item.icon}`);
            else goto(`${item.url}`);
            $appConfig.app = item
            return
        }
        if (item.action === 'edit') {
            $appConfig.modal = '';
            pressTime = 5
            $appConfig.editable = true;
            onEditApps({ closable: true })
        } else {
            item.action instanceof Function &&  item.action(e)
        }
    }
    const onMenuClick = (e) => {
        if (e.detail === 'edit') {
            pressTime = 5
            $appConfig.editable = true;
            onEditApps({ closable: true })
        }
        if (e.detail === 'changeTheme') {
            themeVisible = true
        }
    }
</script>
<style scoped lang="less">
    .indicate, .container {
        height: 100%;
        user-select: none;
        min-height: 100vh;
        max-width: 100% !important;
        // max-width: 750px !important;
    }
    :global(.tab-bar) {
        width: 100%;
        height: 100%;
    }
</style>
<!-- style="background: url({$appConfig.bgUrl}) center/cover no-repeat;" -->
<div class="indicate pb-0 pt-0 {$appConfig.bgColor}" style="background: url({$appConfig.bgUrl}) center/cover no-repeat;">
    {#if $appConfig.editable}
        {#if $appConfig.index !==$appConfig.apps.length - 1}
            <div class="fixed text-lg bg-white/30 text-black rounded-2xl px-3 left-3 top-1.5"
            role="none"
            on:click={(e) => {
                if ($appConfig.index === 0) componentApps = componentsData.props.apps.filter(el => el.componentName)
                else componentApps = componentsData.props.apps
                setTimeout(() => {
                    $appConfig.componentVisible = true;
                    mask = true;
                }, 50);
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
            onEditApps({ closable: false });
            $appConfig.editable = false;
        }} style="z-index:4;">完 成</div>
    {/if}
    {#if !ssr && (!$appConfig.modal || ($appConfig.modal && !$appConfig.modal.props.visible) && (!$appConfig.dialog || ($appConfig.dialog && !$appConfig.dialog.props.visible)))}
        <div transition:scale={{opacity: 0.3, start: 0.8, duration: 500 }} class="container relative" bind:this={container} style="z-index: 3;" role="none"
            on:click={(e) => {
                pressTime = 0;
                e.preventDefault();
                clearInterval(pressInterval);
                onEditApps({ closable: false });
                $appConfig.editable = false;
            }}
            on:mousedown={onPointerdown}
            on:pointermove={(e) => {
                pressTime = 0;
                clearInterval(pressInterval);
            }}
            on:mouseup={(e) => {
                pressTime = 0;
                clearInterval(pressInterval);
            }}
            on:pointerup={(e) => {
                pressTime = 0;
                clearInterval(pressInterval);
            }}
            on:pointerdown={onPointerdown}>
            {#if clientWidth}
                <!-- Slider main container -->
                <Swiper pagination={$appConfig.index && $appConfig.index < $appConfig.apps.length - 1} swiperRef={'topSwiperRef'} data={$appConfig.apps} initialSlide={$appConfig.index} on:swiperslidechange={(e) => {
                    const [swiper] = e.detail
                    $appConfig.index = swiper.activeIndex
                }} />
                <!-- <Swiper autoplay={false} innerInjClass={`wrap-content md:!py-4 2xl:px-[20rem] xl:px-[8rem] md:px-[2rem]`} containerWidth={clientWidth} indicatePosition="{$appConfig.index&&$appConfig.index !==$appConfig.apps.length - 1?'inner':'none'}" bind:initActive={$appConfig.index} loop={false} duration={500} aspectRatio={[10, $appConfig.index?21.6:21.6]} triggerSpeed={0.5} data={$appConfig.apps} on:change={(e) => onChange(e)} height={'100vh'} indicateInjClass={'!bottom-[7.5rem] !from-black/0 !to-black/0'} /> -->
                {#if $appConfig.index && $appConfig.index !==$appConfig.apps.length - 1}
                    <div transition:fly="{{ y: 100, duration: 300 }}" class="fixed bottom-4 left-5 right-5 flex justify-around items-center">
                        <div class="nav-bar !bg-white/30 backdrop-blur-{$appConfig.backdropBlur === 'none'?'md':$appConfig.backdropBlur} px-2 tab-bar bottom-0 rounded-3xl shadow dark:shadow-white/10" style="max-width: 1200px;min-height:6rem;">
                            <GridList apps={$appConfig.docks.slice(0, cols)} cols={cols} gap={8} injClass="!px-2 !py-4"></GridList>
                        </div>
                    </div>
                {/if}
            {/if}
        </div>
        <BottomSheet closeContent="" injClass="!bg-transparent backdrop-blur-2xl" closeHeight={50} showDivider={false} title="slot" stayHeightList={[50, 90]}  maskClosable={true} on:close={() => onComponentClose()} on:clickMask={() => onComponentClose()} radius="full" bind:visible={$appConfig.componentVisible}>
            <div slot="title" class="search-box px-4">
                <Input radius="2xl" label4={{ name: 'ri-search-line', size: 16, alpha: 0.5, injClass: 'text-white' }} value={keyword} on:change={onSearch} placeholder="搜索小组件"></Input>
            </div>
            {#if componentApps.length}
            <svelte:component this={componentsData.component} {...componentsData.props} apps={componentApps} injClass='!px-6 !pt-3 !pb-[6rem] rounded-2xl'></svelte:component>
            {:else}
            <p class="p-4 text-center text-white text-xl">暂无筛选结果~</p>
            {/if}
        </BottomSheet>
    {/if}
    {#if modal && modal.props.visible}
    <Modal bind:visible={modal.props.visible} title="{modal.props.title}" on:close={() => {$appConfig.modal.props.visible = false;$appConfig.modal.actions = '';modal.onConfirm && modal.onConfirm()}} injTitleClass="text-white text-2xl {modal.props.injTitleClass}" injClass="{modal.props.injClass}" showBtn={modal.props.showBtn || false} titleAlign={modal.props.titleAlign||'left'} content={modal.props.content} contentSlot={!!modal.component} btnText={modal.props.btnText} popup={{size: modal.type == 'swiper' ? 55 : 0, radiusPosition: 'all',radius: 'xl', transparent: true, position: 'center', easeType: 'cubicInOut',duration: 500 ,outDuration: 500,px: modal.type == 'swiper'? 10 : 8, py: 0, mask: {opacity: 0.3, backdropBlur: '2xl'}, ...modal.props.popup}}>
        {#if modal.component}
            <svelte:component cols={modal.props.cols} apps={modal.props.apps} gap={$appConfig.gap || modal.props.gap} mx={modal.props.mx}
            my={modal.props.my} this={modal.component} {...(modal.type == 'swiper'? modal.props : {})} injClass={modal.props.injClass + `${modal.type == 'swiper' ? ' md:mx-[auto] md:!h-[25rem] backdrop-blur-xl rounded-3xl bg-white/30 !p-0': ''}`}></svelte:component>
        {/if}
        {#if modal.actions}
        <div class="mt-4 w-60">
            <CellGroup injClass="!bg-transparent" mx="{modal.mx || 0}" my="{modal.my || 0}" radius="{modal.radius || '2xl'}">
                {#each modal.actions as cell, i}
                    {#if cell.component}
                        <svelte:component {...cell.props} this={cell.component}></svelte:component>
                    {:else}
                        <Cell right="{cell.icon}" title="{cell.title}" injClass="{cell.injClass || 'text-lg !bg-black/50 text-white'}" mx="{cell.mx || '0'}" my="{cell.my || '0'}" shadow="{cell.shadow || 'none'}" detail="{cell.detailSlot ? 'slot': ''}" line={i < modal.actions.length - 1} radius="{cell.radius || 'none'}" on:click={(e) => onCellClick(e, cell, i)}>
                            <span slot="detail">
                                {#if cell.detail && cell.detail.component}
                                <svelte:component {...cell.detail.props} this={cell.detail.component}></svelte:component>
                                {:else}
                                <div class="text-black text-xl">请传入组件！</div>
                                {/if}
                            </span>
                        </Cell>
                    {/if}
                {/each}
            </CellGroup>
        </div>
        {/if}
    </Modal>
    {/if}
    {#if dialog && dialog.props.visible}
    <Dialog bind:visible={dialog.props.visible} title="{dialog.props.title}" on:close={() => {$appConfig.dialog.props.visible = false;dialog.onCancel && dialog.onCancel()}} on:primary={() => {dialog.onConfirm && dialog.onConfirm()}} on:secondary={() => {$appConfig.dialog.props.visible = false;dialog.onCancel && dialog.onCancel()}} {...dialog.props} popup={{radiusPosition: 'all',radius: 'xl', transparent: true, position: 'center', easeType: 'backOut',duration: 300 ,outDuration: 300,px: 8, py: 0, mask: {opacity: 0.3, backdropBlur: '2xl'}, ...dialog.props.popup}}>
        <div class="content" slot="content">
            {#if dialog.component}
                <svelte:component injClass={dialog.props.injClass} cols={dialog.props.cols} apps={dialog.props.apps} gap={dialog.props.gap} mx={dialog.props.mx}
                my={dialog.props.my} this={dialog.component}></svelte:component>
            {/if}
        </div>
        <div class="content" slot="primary">
            {#if dialog.props.primarySlot }
                <svelte:component injClass={dialog.props.injClass} cols={dialog.props.cols} apps={dialog.props.apps} gap={dialog.props.gap} mx={dialog.props.mx}
                my={dialog.props.my} this={dialog.primarySlot}></svelte:component>
            {/if}
        </div>
    </Dialog>
    {/if}
    <Mask visible={true} backdropBlur="{(!$appConfig.index || $appConfig.index == $appConfig.apps.length - 1)&&$appConfig.backdropBlur==='none'?'base':($appConfig.backdropBlur || 'base')}" opacity={0.1} zIndex={mask ? 3 : 2} />
    {#if $appConfig.xl}
    <ContentMenu on:menuClick={onMenuClick} />
    {/if}
    {#if !ssr}
        <Theme contentSlot component="" bind:visible={themeVisible} />
    {/if}
</div>