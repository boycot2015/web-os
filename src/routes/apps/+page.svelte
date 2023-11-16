<script>
    import * as apps from '$lib/appConfig';
    import { Input } from 'stdf';
    import { IndexBar } from '$lib/components';
    import { getInitials, convertToPinyin } from '$lib/convertToPinyin'
    import { theme } from '@/store';
    import { goto } from '$app/navigation';
    const navHeight = 48;
	const bottomHeight = 50;
	const height = window.innerHeight - navHeight - bottomHeight;
	let radius = 'full';
	let data = [];
    let sourceData = [];
	let source = {};
    let strArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
	let scrollAlign = true;
	let injClassList = ['text-xl text-white', 'text-lg text-white !py-3 my-2'];
    for (const key in apps) {
        if (apps[key].text && apps[key].icon) {
            source[key] = {...apps[key], index: getInitials(apps[key].text).slice(0, 1), py: convertToPinyin({text: apps[key].text})}
        }
    }
    strArr.map(el => {
        sourceData.push({index: el, title: el, child: []})
    })
    for (const key in source) {
        let index = strArr.findIndex(el => el === source[key].index)
        index >= 0 && sourceData[index].child.push({ ...source[key] })
    }
    sourceData = sourceData.filter(el => el.child && el.child.length)
    data = sourceData
</script>
<div class="w-full p-3 h-full backdrop-blur-{$theme.backdropBlur === 'none'?'md':$theme.backdropBlur}">
    <Input type="search" placeholder="请输入关键词" radius={'full'} on:change={(e) => {
        let str = getInitials(e.detail)
        data = e.detail ? sourceData.filter(el => str.toLocaleLowerCase().includes(el.index.slice(0, 1).toLocaleLowerCase()) || !!el.child.filter(child => child.text?.includes(e.detail)).length).map(el => {
            el.child = el.child.filter(child => str.toLocaleLowerCase().includes(child.index.slice(0, 1).toLocaleLowerCase()) || child.text?.includes(e.detail))
            return el
        }).filter(el => el.child && el.child.length) : sourceData
    }}></Input>
    {#if data && data.length}
    <IndexBar
        data={data}
		{radius}
		{height}
		{scrollAlign}
		titleInjClass={injClassList[0]}
		textInjClass={injClassList[1]}
		top={navHeight}
        on:clickchild={(e) => {
            let app = e.detail.child
            if (app.url && app.url.includes('http')) goto(`/micro/${app.url}/${app.title||app.text}/${app.icon}`);
            else if (app.url) goto(`${app.url}`);
        }}
	/>
    {/if}
</div>