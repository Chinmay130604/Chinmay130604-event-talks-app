const fs = require('fs');
const path = require('path');
const { schedule } = require('./data.js'); // Assuming data.js exports an object with a schedule array

const htmlTemplatePath = path.join(__dirname, 'index.html');
const cssPath = path.join(__dirname, 'style.css');
const jsPath = path.join(__dirname, 'script.js');
const outputPath = path.join(__dirname, 'dist', 'index.html');

// Read template HTML
let html = fs.readFileSync(htmlTemplatePath, 'utf8');

// Read CSS and inject
const css = fs.readFileSync(cssPath, 'utf8');
html = html.replace('<style id="dynamic-styles"></style>', `<style>${css}</style>`);

// Read JS and inject
const js = fs.readFileSync(jsPath, 'utf8');
html = html.replace('<script id="dynamic-script"></script>', `<script>${js}</script>`);

// Inject schedule data
const scheduleDataScript = `<script id="schedule-data">window.talkSchedule = ${JSON.stringify(schedule)};</script>`;
html = html.replace('<script id="schedule-data"></script>', scheduleDataScript);

// Write the final HTML to the output file
fs.writeFileSync(outputPath, html, 'utf8');

console.log(`Successfully generated single-file website at: ${outputPath}`);
