const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// A simple 1x1 dark pixel PNG (base64)
// We can use this for all icons for now to pass validation.
// It's a dark grey #0a0a0a pixel.
const base64Png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYbPcDwACMAFurWu4gAAAAABJRU5ErkJggg==";
const buffer = Buffer.from(base64Png, 'base64');

const sizes = ['16', '48', '128'];

sizes.forEach(size => {
    fs.writeFileSync(path.join(publicDir, `icon${size}.png`), buffer);
    console.log(`Created icon${size}.png`);
});
