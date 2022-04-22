import {fileURLToPath, URL} from "url";
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        base: '',
        root: 'src',
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, 'index.html'),
                locator: path.resolve(__dirname, 'locator.html'),
            },
        },
    },
    // server: {
    //   open: '/main.html',
    // },
});
