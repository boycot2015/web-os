<script>
    import { Grids, Grid, Switch, Icon, Button, TabBar } from 'stdf';
    // import { createEventDispatcher } from 'svelte';
    import { theme } from '@/store';
    // const dispatch = createEventDispatcher();
    const changeColorFun = e => {
        theme.set({bgColor: e.detail ? 'bg-gradient-to-t from-[#f8f8f8] to-[#ccc]': 'bg-gray dark:bg-gray-700'})
    };
    let devices = ['iOS', 'Android', 'Windows', 'macOS', 'Ubuntu'];
    let curentIndex = 0;
    $: currentDevice = devices[curentIndex];
    const changeDeviceFun = () => {
        curentIndex === devices.length - 1 ? (curentIndex = 0) : curentIndex++;
    };
</script>
<Grids cols={5} mx="0" my="0" gap="2">
    <Grid row={2}>
        <div
            class="bg-white dark:bg-black p-1 h-full rounded-xl text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
        >
            <div class="flex justify-center">
                <Switch inside="slot" radius="full" check={true} on:change={changeColorFun}>
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
        <div class="bg-white dark:bg-black h-full rounded-xl text-xs text-center flex flex-col justify-center shadow dark:shadow-white/10">
            <Button fill="lineTheme" radius="full" on:click={changeDeviceFun}>切换设备</Button>
        </div>
    </Grid>
    <Grid row={2} col={2}>
        <div class="bg-white dark:bg-black p-1 h-full rounded-xl text-xs text-center flex justify-around shadow dark:shadow-white/10 py-1">
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
                        A17 Pro Bionic
                    {:else if currentDevice === 'Android'}
                        骁龙8 Gen3
                    {:else if currentDevice === 'Windows'}
                        AMD Intel
                    {:else if currentDevice === 'macOS'}
                        M2 Ultra
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
            class="bg-white dark:bg-black h-full rounded-xl text-xs text-center flex flex-col justify-around items-center shadow dark:shadow-white/10 py-1"
        >
            <div>
                <Icon name="ri-sun-line" size={20} />
            </div>
            <div>
                <div>68%</div>
            </div>
        </div>
    </Grid>
    <Grid row={6}>
        <div class="bg-white dark:bg-black h-full rounded-xl text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10">
            <div>92%</div>
            <div class="animate-pulse">
                <Icon name="ri-battery-2-charge-line" size={30} injClass="text-extend1" />
            </div>
            <div>充电中</div>
        </div>
    </Grid>
    <Grid row={2}>
        <div class="bg-white dark:bg-black h-full rounded-xl text-xs text-center flex flex-col justify-center shadow dark:shadow-white/10">
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
            class="bg-white dark:bg-black p-1 h-full rounded-xl text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
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
    <Grid row={2}>
        <div
            class="bg-white dark:bg-black p-1 h-full rounded-xl text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
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
    <Grid row={4} col={1}>
        <a href="/cates/realtime" on:click={(e) => e.stopPropagation()} class="bg-white dark:bg-black p-1 h-full rounded-xl text-md font-bold text-center text-gray-800 flex justify-around items-center shadow dark:shadow-white/10">
            <Icon name="ri-newspaper-line" />
            <span
            >新闻动态</span>
        </a>
    </Grid>
    <Grid row={4} col={2}>
        <a href="/mall" on:click={(e) => e.stopPropagation()} class="bg-white dark:bg-black p-1 h-full rounded-xl text-xl font-bold text-center text-gray-800 flex justify-around justify-center shadow dark:shadow-white/10 items-center">
            <Icon name="ri-award-line" />
            <span>品牌推荐</span>
        </a>
    </Grid>
    <Grid row={4} col={1}>
        <a href="/cates/wallpaper/83" on:click={(e) => e.stopPropagation()} class="bg-white dark:bg-black p-1 h-full rounded-xl text-md font-bold text-center text-gray-800 flex flex-col items-center justify-around shadow dark:shadow-white/10">
            <Icon name="ri-folder-image-line" />
            <span>在线壁纸</span>
        </a>
    </Grid>
</Grids>
