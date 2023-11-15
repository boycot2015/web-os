import { readable, writable } from 'svelte/store';
import { http } from '$lib/request';
import themeConfig from '$lib/themeConfig';
export const setBgColor = (bgUrl) => {
    document.body.style.backgroundImage = `url(${bgUrl})`;
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
}
function weatherData () {
    let requestTimes = 0
	const { subscribe, set, update } = writable({});
    const fetchData = async () => {
        let res = await http('http://api.boycot.top/api/weather', { location: '深圳' })
        set(res.data || {})
        requestTimes = 0
    }
    fetchData()
	return {
		subscribe,
		refresh: () => {
            requestTimes++
            requestTimes === 1 && fetchData()
        }
	};
}
function themeData () {
	const { subscribe, set, update } = writable({ ...themeConfig || {} });
	return {
		subscribe,
		set: async (res) => {
            update((data) => ({
                ...data,
                ...res
            }))
            res.bgUrl && setBgColor(res.bgUrl)
        }
	};
}

export const weather = weatherData();
export const theme = themeData();