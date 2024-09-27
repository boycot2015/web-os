import adapterAuto from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import adapterStatic from '@sveltejs/adapter-static';
import adapterVercel from '@sveltejs/adapter-vercel';
// console.log(process.argv, 'process.env.adapter');

const adapter = process.argv.includes('vercel') ? adapterVercel() : adapterStatic({
    pages: 'dist',
    runtime: 'nodejs18.x',
    fallback: process.argv.includes('surge') ? '200.html' : 'index.html' // may differ from host to host
});
/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        alias: {
            '@': './src/*'
        },
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: process.env.MODE === 'development' ? adapterAuto() : adapter
	},
    preprocess: preprocess({
        less: {
          prependData: '@import \'./src/styles/base.less\';'
        }
    })
};

export default config;
