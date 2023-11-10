import { readable, writable } from 'svelte/store';
import { http } from '$lib/request';
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
	const { subscribe, set, update } = writable({bgColor: 'bg-gradient-to-t from-[#f8f8f8] to-[#ccc]'});
	return {
		subscribe,
		set: async (res) => {
            update((data) => ({
                ...data,
                ...res
            }))
        }
	};
}

export const weather = weatherData();
export const theme = themeData();