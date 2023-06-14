const fs = require('fs');
const toml = require('@iarna/toml');
const path = require('path');

// Function to convert TOML to JS
function convertTomlToJs(tomlPath, jsPath) {
    const tomlData = fs.readFileSync(tomlPath, 'utf8');
    const jsonData = toml.parse(tomlData);
    const jsData = `let parsedObject; \n  parsedObject = ${JSON.stringify(jsonData, null, 2)};`;
    fs.writeFileSync(jsPath, jsData);
}

// Convert each TOML file in the folder
const folderPath = "quiz"; // Path to the folder containing TOML files

fs.readdirSync(folderPath)
    .filter(file => file.endsWith('.toml'))
    .forEach(file => {
        const tomlPath = path.join(folderPath, file);
        const jsPath = path.join(folderPath, `${file.replace('.toml', '.js')}`);
        convertTomlToJs(tomlPath, jsPath);
        console.log(`Converted ${tomlPath} to ${jsPath}`);
    });
