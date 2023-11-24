
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	return { ...params }
}
export const ssr = false