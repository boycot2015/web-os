<script lang="ts">
    import 'dayjs/locale/zh-cn.js';
    import dayjs from 'dayjs';
    import { onMount, onDestroy } from 'svelte';
    import { Datepicker, InlineCalendar, themes } from 'svelte-calendar';
    export let injClass = '';
    export let inline = false;
    export let theme = themes.dark;

    const timeFormat = (time, split = '/') => {
        return new Date(time).toLocaleString().split('/').join(split)
    }
    let timer = null;
    let timeStr = timeFormat(new Date());
    let store;
    let locale = 'zh-cn';
    $: dayjs.locale(locale);
    onMount(async () => {
        clearInterval(timer)
        timer = setInterval(() => timeStr = timeFormat(new Date()), 1000)
    });
    onDestroy(() => {
        clearInterval(timer)
    })
  </script>
  
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if !inline}
    <div class="calendar flex align-c {injClass}" on:dblclick|stopPropagation>
        <Datepicker 
        bind:store
        startOfWeekIndex={1}
        selected={new Date(timeStr)}
        let:key let:send let:receive
        format="MM/DD/YYYY HH:mm:ss"
        theme={{
            calendar: {
                ...theme.calendar,
                width: '400px',
                legend: {
                    height: '30px' 
                },
                background: {
                    ...theme.calendar['background'],
                    primary: "transparent",
                    highlight: "#5829d6",
                    hover: "#222"
                },
                "font": {
                    regular: "1.5em",
                    large: "12em"
                },
            }
        }}>
            <button in:receive|local={{ key }} out:send|local={{ key }} class="time mx-1">
                {#if $store?.hasChosen}
                    {timeFormat($store.selected).split(' ')[0] === timeStr.split(' ')[0] ? timeStr : timeFormat($store.selected).split(' ')[0]}
                {:else}
                    {timeStr}
                {/if}
            </button>
        </Datepicker>
    </div>
{:else}
    <InlineCalendar startOfWeekIndex={1} theme={{calendar: {...themes.dark.calendar, ...theme.calendar}}} />
{/if}
<style lang="less">
.calendar {
    .time {
        cursor: pointer;
    }
}
</style>
  