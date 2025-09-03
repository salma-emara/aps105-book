const fs = require('fs');
const toml = require('@iarna/toml');
const path = require('path');

// Function to convert TOML to JS
function convertTomlToJs(tomlPath, jsPath) {
    const tomlData = fs.readFileSync(tomlPath, 'utf8');
    const jsonData = toml.parse(tomlData);

    const chapterName = path.basename(path.dirname(tomlPath));
    const testcaseDir = path.join(__dirname, '..', 'testcases', chapterName);

    if (jsonData.exercises) {
        jsonData.exercises.forEach((ex) => {
            if (ex.testcases) {
                ex.testcases.forEach((tc) => {
                    if (typeof tc.input === 'string') {
                        const inputFilePath = path.join(testcaseDir, tc.input);
                        const inputContent = fs.readFileSync(inputFilePath, 'utf8').replace(/\r?\n/g, '\n');
                        tc.input = [inputContent];
                    }
                    if (typeof tc.output === 'string') {
                        const outputFilePath = path.join(testcaseDir, tc.output);
                        const outputContent = fs.readFileSync(outputFilePath, 'utf8').replace(/\r?\n/g, '\n');
                        tc.output = [outputContent];
                    }
                });
            }
        });
    }

    const jsData = `let parsedObject; \n  parsedObject = ${JSON.stringify(
        jsonData,
        null,
        2
    )};`;
    fs.writeFileSync(jsPath, jsData);
}

// Convert TOML files in each folder of the directory
const rootFolders = [
    path.resolve(__dirname, '../exercises'), // one level up, then /exercises
    path.resolve(__dirname, '../quizzes'),   // one level up, then /quizzes
];


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
