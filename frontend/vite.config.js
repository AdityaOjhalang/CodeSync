// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   test: {
//     globals: true,
//     environment: "jsdom",
//   },
// });




import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        global: {},
    },
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            './runtimeConfig': './runtimeConfig.browser',
        },
    },
});
