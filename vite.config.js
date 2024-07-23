import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { viteMockServe } from 'vite-plugin-mock';
export default defineConfig(() => ({
    resolve: {
        alias: {
            '@': new URL('./src/', import.meta.url).pathname,
        },
    },
	plugins: [
        sveltekit(),
        viteMockServe({
            mockPath: '/src/mock',  // mock文件存放的位置
            localEnabled: true, //在开发环境中启用 mock
        }),
    ],
}));
