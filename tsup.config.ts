import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  treeshake: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["esm"],
  external: ["react", "react-dom"]
})