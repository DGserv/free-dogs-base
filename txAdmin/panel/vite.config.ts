import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import tsconfigPaths from 'vite-tsconfig-paths';
import config from '../.deploy.config.js';
import { licenseBanner } from '../scripts/scripts-utils.js';

const baseConfig = {
    build: {
        emptyOutDir: true,
        outDir: '../dist/panel',
        minify: true,
        sourcemap: undefined, // placeholder

        // generate manifest.json in outDir
        manifest: true,
        rollupOptions: {
            input: undefined, //placeholder

            output: {
                banner: licenseBanner('..'),
                //Adding hash to help with cache busting
                entryFileNames: `[name]-[hash].js`,
                chunkFileNames: `[name]-[hash].js`,
                assetFileNames: '[name]-[hash].[ext]',
            }
        },
    },
    server: {
        origin: undefined, //placeholder
    },
    base: '',
    clearScreen: false,
    plugins: [
        // tsconfigPaths({
        //     projects: ['./', '../shared']
        // }),
        react()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@shared": path.resolve(__dirname, "../shared"),
        },
    },
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    if (command === 'serve') {
        baseConfig.server.origin = config.panelViteUrl;
        baseConfig.build.rollupOptions.input = './src/main.tsx'; // overwrite default .html entry
        return baseConfig;
    } else {
        baseConfig.build.sourcemap = true;
        return baseConfig;
    }
})
