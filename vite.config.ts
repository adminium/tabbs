import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import typescript from "@rollup/plugin-typescript";
import {resolvePath} from "react-router-dom";
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    resolve: {
        alias: [{find: '@', replacement: '/src'}]
    },
    build: {
        lib: {
            entry: resolve(__dirname, './packages/index.ts'),
            name: 'router-tabs',
            // formats: ['es'],
            fileName: (format) => `router-tabs.${format}.js`
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['react'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    react: 'React'
                }
            }
        },
        outDir: 'lib/dist'
    }
})
