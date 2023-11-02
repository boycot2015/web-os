import { baseApiUrl } from '$lib'
/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const res = await fetch(`${baseApiUrl}/wallpaper?id=${params.id}`);
	const item = await res.json();
	return {
        ...item,
        id: params.id,
        cates: [...item.catetoryData.imgList, ...item.catetoryData.list]
    };
}
export const ssr = false