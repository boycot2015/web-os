<script>
    import {
        Motion,
        AnimatePresence,
        AnimateSharedLayout,
    } from "svelte-motion";
    import Item from "./Item.svelte";
    import Card from "./Card.svelte";
    import { Grids, Grid } from '$lib/components'
    import { appConfig } from '@/store'
    export let injClass = '';
    export let gap = 4;
    export let cols = 4;
    export let mx = 0;
    export let my = 0;
    export let row = 1;
    export let col = 1;
    export let modal = '';
    export let apps = [];
    export let readOnly = false;
    export let totalCount = 18;
    let selected;
    let maxCount = $appConfig.index ? ($appConfig.md || $appConfig.lg || $appConfig.xl) ? 56 : 24 : ($appConfig.md || $appConfig.lg || $appConfig.xl) ? 80 : 32
    let list = apps.slice(0, totalCount < 100 ? maxCount : totalCount).map((v, i) => ({ ...v, i: i + 1 }))
    console.log(readOnly, 'injClass');
    const onRemove = (e, app) => {
        e.preventDefault();
        e.stopPropagation();
        $appConfig.dialog = {
            onConfirm: () => {
                app.hidden = true;
                list = list.filter(_ =>!_.hidden);
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
</script>

<style>
</style>

<div class="w-full bg-white/30 rounded-2xl {injClass}">
    <AnimateSharedLayout type="crossfade">
        <Grids cols={ ($appConfig.md || $appConfig.lg || $appConfig.xl) ? cols >= 8 ? $appConfig.xl ? 12 : 8 : cols : cols} {gap} mx={mx} my={my}>
            {#each list as item}
                {#if !item.hidden}
                    <Grid col={item.col||row} row={item.row||col}>
                        <Item {item} {modal} bind:selected on:remove={(e) => onRemove(e, item)} />
                    </Grid>
                {/if}
            {/each}
        </Grids>
        <AnimatePresence
            initial={false}
            list={list.filter((v) => v.i === selected)}
            let:item>
            {#if item.props && item.props.modal }
                <Card bind:selected {item} />
            {/if}
        </AnimatePresence>
    </AnimateSharedLayout>
</div>