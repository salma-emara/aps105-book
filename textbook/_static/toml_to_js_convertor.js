const fs = require('fs');
const toml = require('@iarna/toml');
const path = require('path');

// Function to convert TOML to JS
function convertTomlToJs(tomlPath, jsPath) {
    const tomlData = fs.readFileSync(tomlPath, 'utf8');
    const jsonData = toml.parse(tomlData);
    const jsData = `let parsedObject; \n  parsedObject = ${JSON.stringify(
        jsonData,
        null,
        2
    )};`;
    fs.writeFileSync(jsPath, jsData);
}

// Convert TOML files in each folder of the directory
const rootFolders = ['textbook/exercises', 'textbook/quizzes']; // Path to the directory containing folders with TOML files

rootFolders.forEach((directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
        console.warn(`Skipped missing folder: ${directoryPath}`);
        return;
    }

    fs.readdirSync(directoryPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .forEach((dirent) => {
            const folderPath = path.join(directoryPath, dirent.name);
            fs.readdirSync(folderPath)
                .filter((file) => file.endsWith('.toml'))
                .forEach((file) => {
                    const tomlPath = path.join(folderPath, file);
                    const jsPath = path.join(folderPath, `${file.replace('.toml', '.js')}`);
                    convertTomlToJs(tomlPath, jsPath);
                });
        });
});
