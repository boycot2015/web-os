<script>
    import { Grids, Grid, Switch, Icon, Button } from 'stdf';
    let devices = ['iOS', 'Android', 'Windows', 'macOS', 'Ubuntu'];
    let curentIndex = 0;
    $: currentDevice = devices[curentIndex];
    const changeDeviceFun = () => {
        curentIndex === devices.length - 1 ? (curentIndex = 0) : curentIndex++;
    };
    let color = false;
    $: colorCss = `${color ? ' bg-gradient-to-tr from-extend0/70 to-extend2/70' : ' bg-gray-100 dark:bg-gray-700'}`;
    const changeColorFun = e => {
        color = e.detail;
    };
    //获取当前时间
    const date = new Date();
    //获取当前月份转为汉字
    const monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const monthIndex = date.getMonth();
    $: month = monthArr[monthIndex];
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    $: time = `${hour}:${minute}`;
    //获取中文周几
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    $: weekDay = week[date.getDay()];
</script>
<style scoped lang="less">
</style>
<div class="demo">
    <div class="pb-8 pt-2">
        <div class={`mx-2 rounded-xl p-2 shadow transition duration-300${colorCss}`}>
            <Grids cols={5} mx="0" my="0">
                <Grid row={3}>
                    <div
                        class="flex flex-col justify-between bg-white dark:bg-black p-1 h-full rounded-lg text-xs text-center shadow dark:shadow-white/10"
                    >
                        <div>{weekDay}</div>
                        <div class="text-4xl">{day}</div>
                        <div class="text-gray-600">{month}</div>
                    </div>
                </Grid>
                <Grid row={2}>
                    <div
                        class="bg-white dark:bg-black p-1 h-full rounded-lg text-xl font-bold text-center flex flex-col justify-center shadow dark:shadow-white/10"
                    >
                        {time}
                    </div>
                </Grid>
                <Grid row={2}>
                    <div
                        class="bg-white dark:bg-black p-1 h-full rounded-lg text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
                    >
                        <div class="flex justify-center">
                            <Switch inside="slot" radius="full" on:change={changeColorFun}>
                                <div slot="false">
                                    <Icon name="ri-paint-brush-line" size={12} />
                                </div>
                                <div slot="true">
                                    <Icon name="ri-paint-brush-fill" size={12} theme />
                                </div>
                            </Switch>
                        </div>
                        <div>彩 色</div>
                    </div>
                </Grid>
    
                <Grid row={2} col={2}>
                    <div class="bg-white dark:bg-black h-full rounded-lg text-xs text-center flex flex-col justify-center shadow dark:shadow-white/10">
                        <Button fill="lineTheme" radius="full" on:click={changeDeviceFun}>切换设备</Button>
                    </div>
                </Grid>
                <Grid row={2} col={2}>
                    <div class="bg-white dark:bg-black p-1 h-full rounded-lg text-xs text-center flex justify-around shadow dark:shadow-white/10 py-1">
                        <div class="flex flex-col justify-center">
                            {#if currentDevice === 'iOS'}
                                <Icon name="ri-apple-fill" size={30} />
                            {:else if currentDevice === 'Android'}
                                <Icon name="ri-android-fill" size={30} />
                            {:else if currentDevice === 'Windows'}
                                <Icon name="ri-windows-fill" size={30} />
                            {:else if currentDevice === 'macOS'}
                                <Icon name="ri-command-fill" size={30} />
                            {:else}
                                <Icon name="ri-ubuntu-fill" size={30} />
                            {/if}
                        </div>
                        <div class="flex flex-col justify-around">
                            <div class="text-sm">
                                {#if currentDevice === 'iOS'}
                                    A15 Bionic
                                {:else if currentDevice === 'Android'}
                                    骁龙8 Gen1
                                {:else if currentDevice === 'Windows'}
                                    AMD YES
                                {:else if currentDevice === 'macOS'}
                                    M1 Ultra
                                {:else}
                                    Intel
                                {/if}
                            </div>
                            <div>
                                {#if currentDevice === 'iOS'}
                                    iPhone
                                {:else if currentDevice === 'Android'}
                                    Android
                                {:else if currentDevice === 'Windows'}
                                    Windows
                                {:else if currentDevice === 'macOS'}
                                    MacBook Pro
                                {:else}
                                    Ubuntu
                                {/if}
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid row={2}>
                    <div
                        class="bg-white dark:bg-black p-1 h-full rounded-lg text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
                    >
                        <div class="flex justify-center">
                            <Switch inside="slot" radius="full">
                                <div slot="false">
                                    <Icon name="ri-bluetooth-line" size={12} top={-1} />
                                </div>
                                <div slot="true">
                                    <Icon name="ri-bluetooth-connect-line" size={12} theme top={-1} />
                                </div>
                            </Switch>
                        </div>
                        <div>蓝 牙</div>
                    </div>
                </Grid>
                <Grid row={4}>
                    <div
                        class="bg-white dark:bg-black h-full rounded-lg text-xs text-center flex flex-col justify-around items-center shadow dark:shadow-white/10"
                    >
                        <div class="w-1/2 overflow-hidden">
                            
                        </div>
                        <div>STDF</div>
                    </div>
                </Grid>
                <Grid row={3}>
                    <div class="bg-white dark:bg-black h-full rounded-lg text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10">
                        <div>92%</div>
                        <div class="animate-pulse">
                            <Icon name="ri-battery-2-charge-line" size={30} injClass="text-extend1" />
                        </div>
                        <div>充电中</div>
                    </div>
                </Grid>
                <Grid row={2}>
                    <div class="bg-white dark:bg-black h-full rounded-lg text-xs text-center flex flex-col justify-center shadow dark:shadow-white/10">
                        {#if currentDevice === 'iOS'}
                            <Icon name="ri-smartphone-line" size={30} />
                        {:else if currentDevice === 'Android'}
                            <Icon name="ri-tablet-line" size={30} />
                        {:else if currentDevice === 'Windows'}
                            <Icon name="ri-computer-line" size={30} />
                        {:else if currentDevice === 'macOS'}
                            <Icon name="ri-macbook-fill" size={30} />
                        {:else}
                            <Icon name="ri-ubuntu-line" size={30} />
                        {/if}
                    </div>
                </Grid>
                <Grid row={2}>
                    <div
                        class="bg-white dark:bg-black h-full rounded-lg text-xs text-center flex flex-col justify-around items-center shadow dark:shadow-white/10 py-1"
                    >
                        <div>
                            <Icon name="ri-sun-line" size={20} />
                        </div>
                        <div>
                            <div>68%</div>
                        </div>
                    </div>
                </Grid>
                <Grid row={2}>
                    <div
                        class="bg-white dark:bg-black p-1 h-full rounded-lg text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
                    >
                        <div class="flex justify-center">
                            <Switch inside="slot" radius="full">
                                <div slot="false">
                                    <Icon name="ri-wifi-off-line" size={12} />
                                </div>
                                <div slot="true">
                                    <Icon name="ri-wifi-line" size={12} theme />
                                </div>
                            </Switch>
                        </div>
                        <div>Wi-Fi</div>
                    </div>
                </Grid>
                <Grid row={4} col={2}>
                    <div class="bg-white dark:bg-black p-1 h-full rounded-lg text-xl font-bold text-center flex justify-around justify-center shadow dark:shadow-white/10 items-center">
                        <Icon name="ri-award-line" />
                        <a  href="/mall">品牌推荐</a>
                    </div>
                </Grid>
                <Grid row={4} col={1}>
                    <div class="bg-white dark:bg-black p-1 h-full rounded-lg text-md font-bold text-center flex flex-col items-center justify-around shadow dark:shadow-white/10">
                        <Icon name="ri-folder-image-line" />
                        <a
                        href="/cates/wallpaper/83">在线壁纸</a>
                    </div>
                </Grid>
                <Grid row={2} col={2}>
                    <div class="bg-white dark:bg-black p-1 h-full rounded-lg text-md font-bold text-center flex justify-around items-center shadow dark:shadow-white/10">
                        <Icon name="ri-movie-2-line" />
                        <a
                        href="/cates/movie">最新电影</a>
                    </div>
                </Grid>
                <Grid row={2} col={2}>
                    <div class="bg-white dark:bg-black p-1 h-full rounded-lg text-md font-bold text-center flex justify-around items-center shadow dark:shadow-white/10">
                        <Icon name="ri-newspaper-line" />
                        <a
                        href="/cates/realtime">新闻动态</a>
                    </div>
                </Grid>
            </Grids>
        </div>
    </div>
</div>