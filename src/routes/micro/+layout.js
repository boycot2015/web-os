
/** @type {import('./$types').LayoutLoad} */
export async function load({ params, route }) {
    return { ...params, route }
}
export const ssr = false