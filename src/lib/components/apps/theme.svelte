<script>
    import { onMount, onDestroy } from 'svelte';
    import { Grid, Icon, Grids, Switch, CellGroup, Cell, Slider } from 'stdf';
    import Modal from '$lib/components/Modal.svelte';
    import { weather } from '@/store';
    import appConfig from '$lib/appConfig';
    const { bgContainer } = appConfig
    export let col = 1;
    export let row = 4;
    export let injClass = '';
    $: visible = false;
    let blurValue = bgContainer.backdropBlur === 'lg' ? bgContainer.backdropBlur === 'xl' ? 100 : 60 : 0;
    let timer = [];
    const changeBlur = (e) => {
        blurValue = e.detail
    }
    onMount(() => {
        timer.map(el => el && clearInterval(el))
        timer.push(setInterval(() => {
            weather.refresh()
        }, 60000))
    })
    onDestroy(() => {
        timer.map(el => clearInterval(el))
    })
</script>
<Grid {row} {col}>
    <div
    role="none"
    on:click={() => visible = true}
        class="py-5 {injClass} dark:bg-black h-full rounded-xl text-xs text-center flex flex-col justify-around items-center shadow dark:shadow-white/10"
    >
        <div class="location text-xl">装修设置</div>
        <Icon name="ri-paint-brush-line" size={40} injClass="py-6" />
    </div>
    <Modal bind:visible={visible} title="装修设置" injTitleClass="text-white text-xl" showBtn={false} contentSlot popup={{size: 50, radiusPosition: 'all',radius: 'xl', transparent: true, position: 'center', easeType: 'backOut', px: 6, py: 6, mask: {opacity: 0.2, backdropBlur: 'sm'}}}>
        <Grids cols={4} mx="0" my="0" gap="4">
            <Grid row={1} col={4}>
                <div class="flex flex-col justify-between dark:bg-black py-0 h-full text-gray-800 text-lg text-center">
                    <CellGroup shadow="xl" radius="2xl">
                        <Cell title="模糊程度" detail="slot" right="none" mx="0" my="0" shadow="none" line radius="none">
                            <div class="w-40" slot="detail" >
                                <Slider showTip="never" on:change={changeBlur} step={20} value={blurValue}  />
                            </div>
                        </Cell>
                        <Cell title="默认负一屏" detail="slot" right="none" mx="0" my="0" shadow="none" line radius="none">
                            <Switch slot="detail" inside="slot" radius="full" check={!appConfig.initActive} on:change={changeBlur}>
                            </Switch>
                        </Cell>
                    </CellGroup>
                </div>
            </Grid>
        </Grids>
    </Modal>
</Grid>