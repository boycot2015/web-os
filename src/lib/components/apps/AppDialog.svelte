<script>
    import { onMount, onDestroy } from 'svelte';
    import { Grid, Grids, Button, CellGroup, Cell, Toast, Input } from 'stdf';
    import Modal from '$lib/components/Modal.svelte';
    import Slider from '$lib/components/Slider.svelte';
    import Wallpaper from '@/routes/cates/wallpaper/[id]/+page.svelte';
    import { weather } from '@/store';
    import { appConfig } from '@/store';
    import { baseApiUrl } from '$lib';
    import { Icon } from '$lib/components';
    export let visible = false;
    export let app = {};
    let toastVisible = false;
    $: wallpaperData = {
        id: 83,
        cates: []
    };
    let steps = {
        'none': [0, 10],
        'base': [10, 30],
        'md': [30, 50],
        'lg': [50, 70],
        'xl': [70, 100],
    }
    $: visible = false;
    let blurValue = Number(Math.min(...steps[$appConfig.backdropBlur || 'none']))
    let timer = [];
    const changeBlur = (e) => {
        blurValue = e.detail;
        for (const key in steps) {
            if (blurValue >= steps[key][0] && blurValue < steps[key][1]) {
                $appConfig.backdropBlur = key;
                break;
            }
        }
    }
    const changeIndex = (e) => {
        // if (e.detail) $appConfig.index-=1
        // else $appConfig.index+=1
        $appConfig.showPanel = e.detail
    }
    const clickActionFunc = e => {
		let index = e.detail.index;
		let item = e.detail.item;
        visible = true
	};
    async function load (params = {}) {
        const res = await fetch(`${baseApiUrl}/wallpaper?id=${params.id || 83}`);
        const { data: item } = await res.json();
        wallpaperData = {
            ...item,
            id: 83,
            cates: [...item.catetoryData.imgList, ...item.catetoryData.list]
        };
    }
    onMount(() => {
        timer.map(el => el && clearInterval(el))
        timer.push(setInterval(() => {
            weather.refresh()
        }, 60000))
        load()
    })
    onDestroy(() => {
        timer.map(el => clearInterval(el))
    })
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal" on:dblclick|stopPropagation>
    <Modal bind:visible={visible} title="设置app" injTitleClass="text-gray-800 text-xl" showBtn={false} contentSlot popup={{size: 54, radiusPosition: 'all',radius: 'xl', transparent: false, position: 'center', hideScrollbar: true, easeType: 'none', px: 20, py: 0, mask: {opacity: 0.2, backdropBlur: 'sm'}}}>
        <div class="px-2">
            <div class="form">
                <Input lineTransition="center" state="{!app.text?'error':'success'}" bind:value={app.text} tip="{!app.text?'app名称不能为空':''}" inputStyle="line" label2="app名称：" placeholder="请输入App名称" radius={'xl'} on:change={(e) => { app.text = e.detail }}></Input>
                <Input lineTransition="center" state="{!app.url?'error':'success'}" bind:value={app.url} tip="{!app.url?'app地址不能为空':''}" inputStyle="line" maxlength={30} label2="app地址：" placeholder="请输入App地址：https://xxx" radius={'xl'} on:change={(e) => { app.url = e.detail }}></Input>
                <Input lineTransition="center" state="{!app.icon?'error':'success'}" inputStyle="line" bind:value={app.icon} label2="app图标：" tip="{!app.url?'app图标不能为空':''}" placeholder="请输入app图标， Remix Icon 如:ri-movie-line" radius={'xl'} on:change={(e) => { app.icon = e.detail }}></Input>
            </div>
            <div class="submit flex justify-center">
                <div class="fl">
                    <Button injClass="px-10" state="info" on:click={() => visible = false}>取消</Button>
                </div>
                <div class="fl">
                    <Button injClass="px-10" on:click={() => {
                        if (app.text && app.url && app.icon) {
                            let existIndex = $appConfig.winApps?.findIndex(el => (el.text === app.text||el.url === app.url))
                            if (existIndex && existIndex > -1) {
                                $appConfig.winApps[existIndex] = {
                                    ...$appConfig.winApps[existIndex],
                                    ...app
                                }
                            } else {
                                $appConfig.winApps = [...$appConfig.winApps, { ...app, bgColor: 'bg-white' }]
                            }
                            visible = false
                        }
                    }}>提交</Button>
                </div>
            </div>
        </div>
    </Modal>
    <Toast message="设置成功！" bind:visible={toastVisible}></Toast>
</div>