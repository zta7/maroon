import { defineConfig } from "vite"
import React from "@vitejs/plugin-react"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import AutoImport from "unplugin-auto-import/vite"

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      src: path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    React(),
    AutoImport({
      imports: ["react", "react-router-dom"],
      dts: "./src/auto-imports.d.ts",
      // resolvers: [
      //   IconsResolver({
      //     componentPrefix: "Icon",
      //   }),
      // ],
      // dirs: ["src/components/basic"],
    }),
    Icons({
      compiler: "jsx",
      jsx: "react",
    }),
  ],
})
