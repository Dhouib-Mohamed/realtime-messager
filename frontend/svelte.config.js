import {vitePreprocess} from '@sveltejs/kit/vite';
import adapterNode from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
        adapter: adapterNode({out: 'build-node', precompress: false})
	}
};

export default config;
