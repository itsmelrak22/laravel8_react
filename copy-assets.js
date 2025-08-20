import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the manifest file to get the actual built file names
const manifestPath = path.join(__dirname, 'public/build/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Create directories if they don't exist
const cssDir = path.join(__dirname, 'public/css');
const jsDir = path.join(__dirname, 'public/js');

if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
}

if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
}

// Copy CSS file
if (manifest['resources/css/app.css']) {
    const cssSource = path.join(__dirname, 'public/build', manifest['resources/css/app.css'].file);
    const cssTarget = path.join(__dirname, 'public/css/app.css');
    fs.copyFileSync(cssSource, cssTarget);
    console.log('✓ CSS file copied to /css/app.css');
}

// Copy JS file
if (manifest['resources/js/app.jsx']) {
    const jsSource = path.join(__dirname, 'public/build', manifest['resources/js/app.jsx'].file);
    const jsTarget = path.join(__dirname, 'public/js/app.js');
    fs.copyFileSync(jsSource, jsTarget);
    console.log('✓ JS file copied to /js/app.js');
}

console.log('Assets copied successfully!');
