<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import { Popup, Button, Icon } from 'stdf';
	import zh_CN from 'stdf/lang/zh_CN';

	// 定义事件派发器
	// Define event dispatcher
	const dispatch = createEventDispatcher();

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || zh_CN;
	const modalLang = currentLang.modal;

	// 是否显示
	// Whether to show
	export let visible = false;

	// 标题
	// Title
	export let title = modalLang.title;

	//标题对齐方式
	//Title alignment
	export let titleAlign = 'center';
    export let injClass = '';
    export let injTitleClass = '';
    export let injButtonClass = '';
	// 内容
	// Content
	export let content = modalLang.content;

	//内容是否使用slot
	//Whether to use slot for content
	export let contentSlot = false;

	// 弹出层参数
	// Popup parameters
	export let popup = {};

	// 是否显示图标
	// Whether to show icon
	export let showIcon = false;

	// 图标参数
	// Icon parameters
	export let icon = {};

	// 是否显示按钮
	// Whether to show button
	export let showBtn = true;

	// 按钮文字
	// Button text
	export let btnText = modalLang.btnText;

	// 按钮参数
	// Button parameters
	export let button = {}; //按钮参数

	// 标题对齐方式样式
	// Title alignment style
	const titleAlignClass = {
		left: ' text-left',
		center: ' text-center',
		right: ' text-right',
	};

	// 关闭并派发事件
	// Close and dispatch events
	const closeModalFunc = () => {
		visible = false;
		dispatch('close');
	};

	// 监听visible变化并派发事件
	// Listen to the change of visible and dispatch events
	$: {
		if (visible) {
			dispatch('open');
		} else {
			dispatch('close');
		}
	}
</script>
<style lang="less" scoped>
	:global(.pointer-events-none) {
		:global(.pointer-events-auto) {
			max-width: 1200px !important;
    		margin: 0 auto;
		}
	}
</style>
<Popup
	bind:visible
	size={0}
	duration={300}
	outDuration={150}
	maskClosable={showBtn ? false : true}
	position="center"
	radiusPosition="all"
	radius="lg"
	px="8"
	style="margin: 0 120px;"
	{...popup}
>
	<div class={`px-4 pt-4 ${showBtn ? 'pb-2' : 'pb-4'} ${injClass} text-center space-y-4`}>
		<div class={`${injTitleClass} font-bold${titleAlignClass[titleAlign] || titleAlignClass['center']}`}>{title}</div>
		{#if showIcon}
			<div>
				<Icon {...icon} />
			</div>
		{/if}
		<div>
			{#if contentSlot}
				<slot />
			{:else}
				{content}
			{/if}
		</div>
		{#if showBtn}
			<div class="{injButtonClass}">
				<Button size="full" {...button} on:click={closeModalFunc}>{btnText}</Button>
			</div>
		{/if}
	</div>
</Popup>
