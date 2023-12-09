<script>
    import {
        Motion,
        AnimatePresence,
        AnimateSharedLayout,
    } from "svelte-motion";
    import Item from "./Item.svelte";
    import Card from "./Card.svelte";
    import { Grids, Grid } from '$lib/components'
    export let injClass = '';
    export let gap = 4;
    export let cols = 4;
    export let modal = '';
    export let apps = [];
    let list = apps
        .map((v, i) => {
            return { ...v, i: i + 1 };
        })
    let selected;
    console.log(injClass, selected, gap, 'injClass');
</script>

<style>
</style>

<div class="w-full bg-white/30 rounded-2xl {injClass}">
    <AnimateSharedLayout type="crossfade">
        <Grids {cols} {gap} mx={0} my={0}>
            {#each list as item (item.i)}
                <Grid col={item.col||1} row={item.row||1}>
                    <Item {item} {modal} bind:selected />
                </Grid>
            {/each}
        </Grids>
        <AnimatePresence
            list={list.filter((v) => v.i === selected)}
            let:item>
            <Card bind:selected {item} />
        </AnimatePresence>
    </AnimateSharedLayout>
</div>