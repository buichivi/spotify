import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteBabelPlugin from "@rollup/plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        ViteBabelPlugin({
            babelHelpers: "bundled",
        }),
    ],
});
