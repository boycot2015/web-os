// import adapterAuto from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
// import adapterStatic from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-vercel';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
        alias: {
            '@': './src/*'
        },
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		// adapter: adapter({
            // images: {
            //     sizes: [640, 828, 1200, 1920, 3840],
            //     formats: ['image/avif', 'image/webp'],
            //     minimumCacheTTL: 300,
            //     domains: ['example-app.vercel.app'],
            // },
        //     runtime: 'nodejs18.x',
		// 	fallback: '200.html' // may differ from host to host
		// })
        // adapter: process.env.MODE === 'development' ? adapterAuto() : adapter()
        adapter: adapter()
	},
    preprocess: preprocess({
        less: {
          prependData: '@import \'./src/styles/base.less\';'
        }
    })
};

export default config;
