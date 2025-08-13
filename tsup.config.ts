import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['package/index.ts'],
  treeshake: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["esm"],
  external: ["react", "react-dom"]
})