<script>
    import { onMount, onDestroy } from 'svelte';
    import { Grid, Grids, Switch, CellGroup, Cell, Toast } from 'stdf';
    import Modal from '$lib/components/Modal.svelte';
    import Slider from '$lib/components/Slider.svelte';
    import Wallpaper from '@/routes/cates/wallpaper/[id]/+page.svelte';
    import { weather } from '@/store';
    import { appConfig } from '@/store';
    import { baseApiUrl } from '$lib';
    import { Icon } from '$lib/components';
    export let col = 1;
    export let row = 4;
    export let injClass = '';
    export let visible = false;
    export let component = 'Cell';
    let settingVisible = false;
    export let contentSlot = false;
    let toastVisible = false;
    $: wallpaperData = {};
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
{#if !contentSlot}
<Grid {row} {col}>
    <div
    role="none"
    on:click={(e) => {e.preventDefault();settingVisible = !$appConfig.editable}}
        class="relative h-[10rem]  {injClass} dark:bg-black rounded-xl text-xs text-center flex flex-col justify-around items-center shadow dark:shadow-white/10"
    >
        <div class="location text-xl">主题设置</div>
        <Icon name="ri-paint-brush-line" size={60} injClass="py-3" />
    </div>
</Grid>
{:else if component === 'Cell'}
<Cell left={{ name: 'ri-plant-line', theme: true, size: 24, injClass: 'bg-blue-400 px-1 py-0.5 mr-3 text-white rounded-lg' }} injClass='text-lg' mx="0" my="0" on:click={() => visible = true} title="墙纸"></Cell>
{/if}
<div class="modal" on:pointerdown={(e) => e.stopPropagation()}
    on:pointermove={(e) => e.stopPropagation()}
    on:pointerup={(e) => e.stopPropagation()}>
    <Modal bind:visible={settingVisible} title="主题设置" injTitleClass="text-white text-xl" showBtn={false} contentSlot popup={{size: 40, radiusPosition: 'all',radius: 'xl', transparent: true, position: 'center', easeType: 'backOut', px: $appConfig.cols === 12 ? 20 : 6, py: 0, mask: {opacity: 0.2, backdropBlur: 'sm'}}}>
        <Grids cols={4} mx="0" my="0" gap="4">
            <Grid row={1} col={4}>
                <div class="flex flex-col justify-between dark:bg-black py-0 h-full text-gray-800 text-lg text-center">
                    <CellGroup shadow="xl" radius="2xl">
                        <Cell title="背景墙纸" detail="slot" right="none" mx="0" my="0" shadow="none" line radius="none">
                            <div slot="detail" class="w-40">
                                <Icon size={30} name={'ri-landscape-fill'} on:click={() => visible = true}></Icon>
                            </div>
                        </Cell>
                        <Cell title="模糊程度" detail="slot" right="none" mx="0" my="0" shadow="none" line radius="none">
                            <div class="w-40" slot="detail" role="none" on:click={(e) => e.stopPropagation()}>
                                <Slider showTip="never" minRange={0} on:change={changeBlur} step={20} value={blurValue}  />
                            </div>
                        </Cell>
                        {#if $appConfig.index}
                        <Cell title="负一屏" detail="slot" right="none" mx="0" my="0" shadow="none" line radius="none">
                            <Switch slot="detail" inside="slot" radius="full" check={$appConfig.showPanel} on:change={changeIndex}>
                            </Switch>
                        </Cell>
                        {/if}
                    </CellGroup>
                </div>
            </Grid>
        </Grids>
    </Modal>
    <Modal bind:visible={visible} title="选择壁纸" injTitleClass="text-gray-800 text-xl" showBtn={false} contentSlot popup={{size: 60, radiusPosition: 'all',radius: 'xl', transparent: false, position: 'center', hideScrollbar: true, easeType: 'none', px: 6, py: 0, mask: {opacity: 0.2, backdropBlur: 'sm'}}}><Wallpaper injClass="!pt-0" data={wallpaperData} isComponent on:select={(e) => {$appConfig.bgUrl = e.detail;toastVisible = true}} on:cateChange={(e) => load(e.detail)}></Wallpaper></Modal>
    <Toast message="设置成功！" bind:visible={toastVisible}></Toast>
</div>