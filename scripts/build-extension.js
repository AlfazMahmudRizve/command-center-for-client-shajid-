const fs = require('fs');
const path = require('path');
const glob = require('glob');

const outDir = path.join(__dirname, '..', 'out');
const nextDir = path.join(outDir, '_next');
const newNextDir = path.join(outDir, 'next');

async function main() {
    const nextDir = path.join(outDir, '_next');
    const newNextDir = path.join(outDir, 'next');

    // 1. Rename _next to next
    if (fs.existsSync(nextDir)) {
        if (fs.existsSync(newNextDir)) {
            fs.rmSync(newNextDir, { recursive: true, force: true });
        }
        fs.renameSync(nextDir, newNextDir);
        console.log('Renamed _next to next');
    }

    // 2. Process ALL files in the out directory (recursively)
    const allFiles = getAllFiles(outDir);

    allFiles.forEach(file => {
        // Skip if it's a directory (readdir returns files and dirs, but our glob-like helper returns paths)
        // Actually our helper below returns file paths.

        // We only care about text-based files
        const ext = path.extname(file);
        if (!['.html', '.js', '.css', '.json', '.txt', '.map'].includes(ext)) return;

        let content = fs.readFileSync(file, 'utf8');
        const originalContent = content;

        // Robust replacements covering various quoting styles and path contexts
        // 1. Absolute paths: "/_next/" -> "/next/"
        content = content.replace(/\/_next\//g, '/next/');

        // 2. Relative/Part paths in JS/JSON: "_next/" -> "next/"
        // Note: We must be careful not to break strings that *shouldn't* change, but "_next/" is highly specific to Next.js structure.
        content = content.replace(/\"_next\//g, '"next/');
        content = content.replace(/\'_next\//g, "'next/");

        // 3. Catch-all for CSS urls or weird webpack concat: url(/_next/...)
        // (Covered by #1 usually, but let's be safe for non-root paths if any)

        // 4. Specific Webpack chunk loading usually looks like:
        // u.p = ... + "_next/static/..."
        // We replace "_next/" literal with "next/"
        // This is the most critical one for chunk loading.

        // Special handling for HTML files: Extract Inline Scripts
        if (ext === '.html') {
            const inlineScripts = [];
            // Regex to match <script>...</script> content that does NOT have a src attribute
            // Note: This is a simple regex and might be fragile, but works for standard Next.js output
            content = content.replace(/<script>([\s\S]*?)<\/script>/g, (match, scriptContent) => {
                inlineScripts.push(scriptContent);
                return ''; // Remove the inline script from HTML
            });

            if (inlineScripts.length > 0) {
                const inlineFilename = `inline-${path.basename(file, '.html')}.js`;
                const inlinePath = path.join(outDir, inlineFilename);

                // Join all inline scripts with a safety semicolon
                fs.writeFileSync(inlinePath, inlineScripts.join(';\n'));
                console.log(`Extracted inline scripts to ${inlineFilename}`);

                // Inject the new script reference before the closing </body> or </head>
                // We use standard blocking script to preserve order of execution relative to parsing (though Next.js usually puts them at the end)
                // Next.js App Router puts them in Body mostly.
                // We'll append it to the body to be safe.
                content = content.replace('</body>', `<script src="/${inlineFilename}"></script></body>`);
            }
        }

        if (content !== originalContent) {
            fs.writeFileSync(file, content);
            console.log(`Updated: ${path.relative(outDir, file)}`);
        }
    });

    console.log('Build patch complete.');
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file)
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles)
        } else {
            arrayOfFiles.push(fullPath)
        }
    })

    return arrayOfFiles
}

main();
