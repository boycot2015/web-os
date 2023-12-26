<script>
    import { Grid } from 'stdf';
    export let injClass = 'text-purple-600 bg-gray-200';
    export let row = 3;
    export let col = 1;
    export let cols = 1;
    export let rows = 1;
    //获取当前时间
    const date = new Date();
    const day = date.getDate();
    //获取中文周几
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    //获取当前月份转为汉字
    const monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const monthIndex = date.getMonth();
    $: month = monthArr[monthIndex];
    $: weekDay = week[date.getDay()];
</script>
<Grid {row} {col}>
    <div
        role="none"
        class="relative flex flex-col {cols} {rows} {row == 3 ?'h-[10rem]': 'h-[3.8rem] mx-1.5'} {injClass} flex-col justify-center dark:bg-black rounded-xl text-xs text-center shadow dark:shadow-white/10"
    >
        <div>{weekDay}</div>
        <div class=" {row == 3 ?'text-5xl py-5': 'text-2xl py-1'}">{day}</div>
        {#if row == 3 }
        <div class="text-md">{month}</div>
        {/if}
    </div>
</Grid>