
import { baseApiUrl } from '$lib';
// import '@brewer/beerui/assets/beer.css'
import '/src/app.css';
/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch, route }) {
	const res = await fetch(baseApiUrl);
    /**@type {{query?: {id: number}, cates: any[]}} */
    let wallpaper = { query: { id: 83 }, cates: [] };
    if (route.id?.includes('id')) {
        const wallpaperRes = await fetch(baseApiUrl + '/wallpaper');
        wallpaper = await wallpaperRes.json();
    }
	const item = await res.json();
    item.tabs = item.tabs.map((/** @type {any} */ el) => ({
        ...el,
        id: el.value == 'wallpaper' ? wallpaper.query?.id : null
    }))
	return { ...item, route };
}
export const ssr = false