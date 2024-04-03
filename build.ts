import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['bin.ts'],
    platform: 'node',
    bundle: true,
    minify: true,
    outfile: 'build/bin.cjs',
})