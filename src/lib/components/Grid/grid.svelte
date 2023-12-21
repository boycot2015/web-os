<script>
	import { goto } from '$app/navigation';
    // import { Grids, Grid, Mask } from 'stdf';
    import { createEventDispatcher, onMount, afterUpdate } from 'svelte'
    import { appConfig } from '@/store';
    import { cubicInOut, quintOut } from 'svelte/easing';
    import { slide, scale } from 'svelte/transition';
    import { Icon, GridList, Grids, Grid } from '$lib/components'
    // import Sortable from 'sortablejs';
    export let apps = [];
    export let injClass = '';
    export let gap = 4;
    export let cols = 4;
    export let mx = 0;
    export let my = 0;
    export let path = '';
    export let title = '';
    export let visible = '';
    export let modal = '';
    export let readOnly = false;
    export let totalCount = 18;
    let GridsDom = null;
    let current = '';
    let dx = -100;
    let dy = 150;
    let pressTime = 0;
    let pressInterval = null;
    let dragEls = [];
    const dispatch = createEventDispatcher();
    let maxCount = $appConfig.index ? ($appConfig.md || $appConfig.lg || $appConfig.xl) ? 56 : 24 : ($appConfig.md || $appConfig.lg || $appConfig.xl) ? 80 : 32
    maxCount = $appConfig.index === $appConfig.apps.length - 1 ? 100 : maxCount
    let datas = apps.slice(0, totalCount < 100 ? maxCount : totalCount)
    const onClick = (e) => {
        e.preventDefault();
        if (path) {
            goto(path)
            return
        }
        dispatch('click', e)
    }
    const clearTimer = () => {
        pressTime = 0;
        clearInterval(pressInterval);
    }
    const slideAndScale = (node, params) => {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');
		return {
			delay: params.delay || 0,
			duration: params.duration || 300,
			easing: params.easing || cubicInOut,
			css: (t, u) => `transform: ${existingTransform} translate(${u * dx}px, ${u * dy}px) scale(${1-t});`
		};
	}
    const onEditApps = (props = { closable: true }) => {
        clearInterval(pressInterval);
        if (pressTime < 3 || ($appConfig.modal && $appConfig.modal.props?.visible) || current.fixed || current.props?.modal) {
            pressTime = 0
            clearInterval(pressInterval);
            return
        }
        let cols = ($appConfig.md || $appConfig.lg || $appConfig.xl) ? 8 :(current.type==='component' && current.col > 1 ? $appConfig.cols / current.col : ($appConfig.md || $appConfig.lg || $appConfig.xl) ? 8 : 4)
        // console.log(current,cols, 'current');
        $appConfig.modal = {
            component: GridList,
            props: {
                title: '',
                popup: {
                    size: 0,
                },
                visible: true,
                gap: 0,
                mx: 0,
                my: 0,
                cols,
                injClass: '!p-0',
                apps: [
                    { ...current, cols, row: 1, col: 1, size: 40, injTitleClass: 'text-white text-sm', injClass: '!p-0 !py-3.5 mx-1 !shadow-none'},
                ],
            },
            actions: [...current.actions?.map(el => ({title: el.text, url: el.url, icon: {name: el.icon, type: 'icon', injClass: 'text-white' }})) || [], { title: '编辑主屏幕', action: 'edit', icon: {type: 'icon', name: 'ri-edit-fill', injClass: 'text-white'} }, !current.readOnly && { title: `移除${current.type=='component'?'小组件':'App'}`, action: (e) => onRemove(e, current), icon: {type: 'icon', name: 'ri-close-fill', injClass: 'bg-black/20 rounded-3xl text-white px-0.5'} }].filter(_ => _)
        }
        pressTime = 0
    }
    const touchmoveFun = (e, app) => {
        // $appConfig.editable && !app.isComponent && e.stopPropagation()
        clearTimer()
    }
    const onPointerdown = (e, app) => {
        clearTimer()
        // e.preventDefault()
        pressInterval = setInterval(() => {
            pressTime++;
        }, 200)
        current = app
    }
    const onRemove = (e, app) => {
        clearTimer()
        e.preventDefault();
        e.stopPropagation();
        $appConfig.dialog = {
            onConfirm: () => {
                app.hidden = true;
                $appConfig.apps[$appConfig.index].totalCount -= (app.row ? app.row + (app.col || 2) : 1)
                const findChild = (apps, app) => {
                    return apps.map(el => {
                        if (el.props && el.props.apps) {
                            el.props.apps = findChild(el.props.apps, app)
                        } else {
                            if (app.index === el.index) {
                                el.hidden = true
                            }
                        }
                        return el
                    }).filter(el => !el.hidden)
                }
                $appConfig.apps = findChild($appConfig.apps, app).filter(el => el.props.apps?.length)
                $appConfig.dialog.props.visible = false;
                $appConfig.modal = '';
            },
            onCancel: () => {
                // $appConfig.dialog = ''
            },
            props: {
                title: '温馨提示',
                content: '确定移除？',
                btnGap: 4,
                // primaryButton: {size: 'md'},
                // secondaryButton: {size: 'md'},
                popup: {
                    px: 16,
                    transparent: false
                },
                visible: true
            }
        }
    }
    const onExced = () => {
        clearTimer()
        $appConfig.modal = {
            onConfirm: () => {
                $appConfig.modal.props.visible = false;
            },
            props: {
                title: '温馨提示',
                content: '没有多余的空间了！',
                titleAlign: 'center',
                injTitleClass: '!text-lg !text-gray-800 font-normal',
                showBtn: true,
                btnText: '确定',
                popup: {
                    px: 12,
                    size: 0,
                    transparent: false,
                    zIndex: 999,
                    mask: {
                        zIndex: 998,
                        backdropBlur: 'base'
                    },
                },
                visible: true
            }
        }
    }
    const onAddComponent = (app) => {
        let current = $appConfig.apps[$appConfig.index]
        let appSize = app.row ? app.row * (app.col || 1) : 1;
        let nextMaxCount = ($appConfig.md || $appConfig.lg || $appConfig.xl) ? 56 : 24;
        appSize = current.totalRows % 5 === 0 ? appSize * 2 : appSize;
        let nextIndex = $appConfig.apps.findIndex(el => el.totalCount + appSize < 24);
        nextIndex = nextIndex > -1 ? nextIndex : 0;
        if ((current.totalCount + appSize) <= maxCount) {
            $appConfig.apps[$appConfig.index].props.apps = [...$appConfig.apps[$appConfig.index].props.apps, {...app, isComponent: false, closable: true, text: $appConfig.index ? app.text : ''}]
        } else if ($appConfig.apps[nextIndex].totalRows * 4 + (appSize) <= nextMaxCount) {
            $appConfig.apps[nextIndex].props.apps = [...$appConfig.apps[nextIndex].props.apps, {...app, isComponent: false, closable: true, text: $appConfig.index ? app.text : ''}]
            $appConfig.index = nextIndex
        } else {
            // onExced()
            $appConfig.apps = [...$appConfig.apps.slice(0, $appConfig.apps.length - 1), {
                index: $appConfig.apps.length - 1,
                name: '自定义页面',
                type: 'component',
                component: GridList,
                componentName: 'GridList',
                props: {
                    apps: [{ ...app, isComponent: false, closable: true, text: $appConfig.index ? app.text : '' }]
                }
            }, { ...$appConfig.apps.slice(-1)[0], index: $appConfig.apps.length }];
            $appConfig.index = $appConfig.apps.length - 2
        }
        $appConfig.componentVisible = false
        $appConfig.refresh = true
        // dispatch('click', e)
        return false
    }
    onMount(() => {
        // if($appConfig.editable && datas.findIndex(curr => curr.isComponent) === -1) {
        //     Sortable.create(GridsDom, {
        //         delayOnTouchOnly: true,
        //         easing: "cubic-bezier(1, 0, 0, 1)",
        //         onEnd: (e) => {
        //             console.log(e.newIndex, e.oldIndex,'e');
        //             // datas.splice(datas[e.oldIndex], 1, datas[e.newIndex]);
        //             // $appConfig.apps[$appConfig.index].props.apps = datas;
        //             let newItems = [...datas];
        //             // 删除之前DOM节点
        //             newItems.splice(e.oldIndex, 1);
        //             // 在拖拽结束目标位置增加新的DOM节点
        //             newItems.splice(e.newIndex, 0, datas[e.oldIndex]);
        //             // 每次拖拽结束后，将拖拽处理完成的数据，赋值原数组，使DOM视图更新，页面显示拖拽动画
        //             datas = newItems;
        //             // 每次拖拽结束后调用接口时时保存数据
        //             // saveApi(this.dragArray).then((res) => {})
        //             $appConfig.apps[$appConfig.index].props.apps = datas
        //         }
        //     });
        // }
    })
    afterUpdate(() => {
        datas = apps.map((el, index) => {
            !index && (el.totalCount = el.row ? el.row * (el.col || 2) : 1)
            index && (el.totalCount = (el.row ? el.row * (el.col || 2) : 1) + apps[index - 1].totalCount)
            return el
        })
        datas = datas.filter(el => el.totalCount <= maxCount)
    });
    $: pressTime >=3 && onEditApps();
</script>
<!-- <style lang="less" scoped>
    :global(.wrap-content > div) {
        height: 100% !important;
    }
</style> -->
<div class="pb-0 pt-0 {visible} {readOnly}" role="none" style="max-height: calc(100vh - 6rem);" on:click={(e) => onClick(e)}>
    <div class={` px-8 py-4 pt-10 transition-all duration-500 ${injClass}`}>
        <Grids cols={cols} mx="{mx}" my="{my}" gap="{gap}" bind:GridsDom={GridsDom}>
            {#each datas as app, i}
                {#if (app.type === 'app' || !app.type) && !app.hidden}
                <Grid
                row={app.row || 1} col={app.col || 1}
                >
                <!-- transition:scale={{ duration: 400, easing: quintOut, start: 0.3 }} -->
                    <div
                    class="{app.closable ? 'animate-shake': ''} flex flex-col justify-center text-center" 
                    data-index={i}
                    bind:this={dragEls[i]}
                    on:pointerdown={(e) => onPointerdown(e, app)}
                    on:pointermove={(e) => touchmoveFun(e, app)}
                    on:click={(e) => {
                        if (app.isComponent) return onAddComponent(app);
                        if (app.reload) return window.location.reload();
                        pressTime = 0;
                        clearInterval(pressInterval);
                        !modal && e.stopPropagation();
                        e.preventDefault();
                        if (modal) return
                        if (!app.url) return
                        modal = '';
                        app.url && ($appConfig.app = app)
                        if (app.url && app.url.includes('http')) goto(`/micro/${app.url}/${app.title||app.text}/${app.icon}`);
                        else if (app.url) goto(`${app.url}`); }}  role="none">
                        <div
                            class="relative flex flex-col relative justify-between {app.bgColor} {app.color} {app.injClass?app.injClass:'mx-1.5'} dark:bg-black {app.subText?'py-1.5':'p-3'} h-full rounded-xl text-md text-center shadow dark:shadow-white/10"
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
                                <div role="none" on:click={(e) => onRemove(e, app)} class="!absolute bg-white/80 rounded-2xl p-0 shadow z-99999 text-gray-500 !top-[-5px] !left-[-5px] text-sm" >
                                    <Icon size="22" name="ri-close-line"></Icon>
                                </div>
                            {/if}
                        </div>
                        {#if app.text && !app.hideTitle}
                            <div class="font-bold text-xs text-white {app.injTitleClass} mt-2">{app.text}</div>
                        {/if}
                    </div>
                </Grid>
                {:else if app.type === 'component' && app.component && !app.hidden}
                <Grid row={app.row || 1} col={app.col || 1}>
                    <div bind:this={dragEls[i]} class="wrap-content h-full relative {(app.closable && !app.props?.apps && !app.fixed) || (app.closable && app.componentName === 'Group') || (app.closable && app.props?.modal) ? 'animate-shake':''}" role="none"
                    on:pointerdown={(e) => onPointerdown(e, app)}
                    on:pointermove={(e) => touchmoveFun(e, app)}
                    on:click={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        pressTime = 0;
                        clearInterval(pressInterval);
                        if (app.isComponent) return onAddComponent(app);
                        var event = event || window.event;  //标准化事件对象
                        dx = (event.pageX > window.screen.width / 2 ? window.screen.width / 2 - event.pageX : event.pageX) || -100;
                        dy = (event.pageY > window.screen.height / 2 ? window.screen.height / 2 - event.pageY : event.pageY) || 150;
                        $appConfig.modal = ''
                        modal = ''
                        if (app.props && app.props.modal) {
                            modal = app.props.modal
                            modal.props.visible = true
                            $appConfig.modal = modal
                        }
                        if (app.url && app.url.includes('http')) goto(`/micro/${app.url}/${app.title||app.text}/${app.icon}`);
                        else if (app.url) goto(`${app.url}`);
                        app.url && ($appConfig.app = app)
                    }}>
                        {#if (app.closable && !app.props?.apps && !app.readOnly) || (app.closable && app.componentName === 'Group')}
                            <div role="none" on:click={(e) => onRemove(e, app)} class="!absolute bg-white/80 rounded-2xl p-0 shadow z-[99999] text-gray-500 !top-[-5px] !left-[-5px] text-sm" >
                                <Icon size="22" name="ri-close-line"></Icon>
                            </div>
                        {/if}
                        <svelte:component {...app.props || {}} this={app.component}></svelte:component>
                        {#if (app.title || app.text) && !app.hideTitle}
                        <div class="text-sm text-white text-center mt-2 {app.injTitleClass}">{app.title||app.text || title}</div>
                        {/if}
                    </div>
                </Grid>
                {/if}
            {/each}
        </Grids>
    </div>
</div>