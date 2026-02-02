const esbuild = require('esbuild');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

async function build() {
    await esbuild.build({
        entryPoints: [path.join(__dirname, 'entry-sidebar.tsx')],
        bundle: true,
        outfile: path.join(outDir, 'sidebar.js'),
        loader: { '.tsx': 'tsx', '.ts': 'ts' },
        jsx: 'automatic',
        minify: true,
        platform: 'browser',
        target: ['es2020'],
        define: {
            'process.env.NODE_ENV': '"production"'
        },
        // We need to handle react imports since we are bundling standalone
    });
    console.log('Sidebar build complete: out/sidebar.js');
}

build().catch(() => process.exit(1));
