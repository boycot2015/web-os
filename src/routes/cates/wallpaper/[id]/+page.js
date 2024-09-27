import { baseApiUrl } from '$lib'
/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    let loading = true
	const res = await fetch(`${baseApiUrl}/wallpaper?id=${params.id}`);
	const { data: item } = await res.json();
    loading = false
	return {
        ...item,
        loading,
        id: params.id,
        cates: [...item.cates || []]
    };
}
export const ssr = false