import * as apps from '$lib/appConfig';
import { Badge } from 'stdf';
import Theme from '$lib/components/apps/theme.svelte'
const appList = []
for (const key in apps) {
    if (apps[key].text && apps[key].icon) {
        appList.push({ icon: { name: apps[key].icon, size: apps[key].size || 26, injClass: `${apps[key].bgColor} ${apps[key].color} p-1 px-1.5 rounded-lg mr-3` }, title: apps[key].text, url: apps[key].url })
    }
}
export default [
    {
        type: 'single',
        list: [
            {
                img: '',
                avatar: true,
                icon: { name: 'ri-close-line', theme: true, size: 32 },
                title: 'boycot',
                desc: 'Apple ID、iCloud、媒体与购买项目',
                url: ''
            },
            {
                img: '',
                detailSlot: true,
                detail: { component: Badge, props: {
                    text: 1, isInner: true, injClass: 'mr-3 !text-sm !px-1.5'
                } },
                title: '有软件更新可用',
                desc: '',
                url: ''
            }
        ]
    },
    {
        type: 'group',
        mx: 0,
        my: 0,
        radius: '2xl',
        list: [
            {
                img: '',
                avatar: true,
                injClass: 'text-lg',
                mx: 0,
                my: 0,
                shadow: 'none',
                line: true,
                radius: 'none',
                icon: { name: 'ri-flight-takeoff-line', theme: true, size: 24, injClass: 'bg-orange-600 px-1 py-0.5 mr-3 text-white rounded-lg' },
                title: '飞行模式',
                desc: 'Apple ID、iCloud、媒体与购买项目',
                url: ''
            },
            {
                img: '',
                icon: { name: 'ri-wifi-off-line', theme: true, size: 24, injClass: 'bg-blue-600 px-1 py-0.5 mr-3 text-white rounded-lg' },
                title: '无线局域网',
                desc: '',
                url: ''
            },
            {
                img: '',
                icon: { name: 'ri-bluetooth-line', theme: true, size: 24, injClass: 'bg-blue-600 px-1 py-0.5 mr-3 text-white rounded-lg' },
                title: '蓝牙',
                desc: '',
                url: ''
            },
            {
                img: '',
                icon: { name: 'ri-base-station-line', theme: true, size: 24, injClass: 'bg-green-600 px-1 py-0.5 mr-3 text-white rounded-lg' },
                title: '蜂窝网络',
                desc: '',
                url: ''
            },
            {
                img: '',
                icon: { name: 'ri-link', theme: true, size: 24, injClass: 'bg-green-600 px-1 py-0.5 mr-3 text-white rounded-lg' },
                title: '个人热点',
                desc: '',
                url: ''
            }
        ]
    },
    {
        type: 'notice',
        list: [
            {
                icon: { name: 'ri-notification-2-fill', theme: true, size: 24, injClass: 'bg-red-500 px-1 py-0.5 mr-3 text-white rounded-lg' },
                title: '通知',
                desc: '',
                url: ''
            },
            {
                icon: { name: 'ri-volume-up-fill', theme: true, size: 24, injClass: 'bg-red-500 px-1 py-0.5 mr-3 text-white rounded-lg' },
                title: '声音与触感',
                desc: '',
                url: ''
            }
        ]
    },
    {
        type: 'common',
        list: [
            {
                icon: { name: 'ri-settings-line', theme: true, size: 24, injClass: 'bg-gray-600 px-1 py-0.5 mr-3 text-white rounded-lg' },
                title: '通用',
                desc: '',
                url: ''
            },
            {
                icon: { name: 'ri-switch-line', theme: true, size: 24, injClass: 'bg-gray-600 px-1 py-0.5 mr-3 text-white rounded-lg' },
                title: '控制中心',
                desc: '',
                url: ''
            },
            {
                icon: { name: 'ri-sun-line', theme: true, size: 24, injClass: 'bg-blue-600 px-1 py-0.5 mr-3 text-white rounded-lg' },
                title: '显示与亮度',
                desc: '',
                url: ''
            },
            {
                icon: { name: 'ri-plant-line', theme: true, size: 24, injClass: 'bg-blue-400 px-1 py-0.5 mr-3 text-white rounded-lg' },
                title: '墙纸',
                desc: '',
                component: Theme,
                dialog: true,
                props: {
                    contentSlot: true,
                    visible: true
                },
                url: ''
            },
        ]
    },
    {
        type: 'apps',
        list: [...appList]
    }
]