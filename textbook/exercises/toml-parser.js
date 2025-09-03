const fs = require('fs');
const path = require('path');
const toml = require('@iarna/toml');

const baseDirs = ['./textbook/exercises'];

baseDirs.forEach((baseDir) => {
    if (!fs.existsSync(baseDir)) {
        console.warn(`Skipped missing folder: ${baseDir}`);
        return;
    }

    const folders = fs.readdirSync(baseDir, { withFileTypes: true });

    folders.forEach((folder) => {
        if (!folder.isDirectory()) return;

        const chapterName = folder.name; 
        const folderDir = path.join(baseDir, chapterName);
        const files = fs.readdirSync(folderDir).filter(f => f.endsWith('.toml'));

        files.forEach((file) => {
        const filePath = path.join(folderDir, file);
        console.log('Checking file:', filePath);

        const tomlString = fs.readFileSync(filePath, 'utf-8');
        const tomlData = toml.parse(tomlString);

        if (!Array.isArray(tomlData.exercises)) {
            throw new Error(`No "exercises" array found in ${filePath}`);
        }

        const exercisesCount = tomlData.exercises.length;

        for (let i = 0; i < exercisesCount; i++) {
            const ex = tomlData.exercises[i];

            const label = `Exercise #${i + 1} of ${chapterName}`;

            // check for common missing variables
            if (!('title' in ex)) {
            throw new Error(`${label}: missing title`);
            }
            if (!('difficulty' in ex)) {
            throw new Error(`${label}: missing difficulty level`);
            }
            if (!('type' in ex)) {
            throw new Error(`${label}: missing question type`);
            }
            if (!('question' in ex)) {
            throw new Error(`${label}: missing question`);
            }
            if (!('table' in ex)) {
            throw new Error(`${label}: table not set`);
            }
            if (!('multipart' in ex)) {
            throw new Error(`${label}: multipart not set`);
            }
            if (!('answer' in ex)) {
            throw new Error(`${label}: missing answer`);
            }

            // check for correct variable types
            if (typeof ex.title !== 'string') {
            throw new Error(`${label}: title must be a boolean`);
            }
            if (typeof ex.difficulty !== 'string') {
            throw new Error(`${label}: difficulty must be a string`);
            }
            if (typeof ex.type !== 'string') {
            throw new Error(`${label}: type must be a string`);
            }
            if (typeof ex.question !== 'string') {
            throw new Error(`${label}: question must be a string`);
            }
            if (typeof ex.table !== 'boolean') {
            throw new Error(`${label}: table must be a boolean`);
            }
            if (typeof ex.multipart !== 'boolean') {
            throw new Error(`${label}: multipart not set`);
            }

            const allowedDifficulties = ["Easy", "Intermediate", "Challenging"];
            if (!allowedDifficulties.includes(ex.difficulty)) {
                new Error(`${label}: invalid difficulty level, must be "Easy", "Intermediate", or "Challenging"`);
            }

            const allowedTypes = [
                "tracing",
                "explaination",
                "programming",
                "function programming",
                "multiple-choice"
            ];
            if (!allowedTypes.includes(ex.type)) {
                throw new Error(`${label}: invalid question type, must be one of ${allowedTypes.join(", ")}`);
            }

            // exercise type specific variables

            // tracing
            if (ex.type === "tracing") {
                if (typeof ex['question-code'] !== 'string') {
                    throw new Error(`${label}: missing starter-code`);
                }
            }

            // programming
            if (ex.type === 'programming' || ex.type === 'function programming') {
                if (typeof ex['starter-code'] !== 'string') {
                    throw new Error(`${label}: missing starter-code`);
                }
            }

            // include this once we have main-functions for all function programing questions

            // if (ex.type === 'function programming') {
            //   if (typeof ex['main-function'] !== 'string') {
            //     throw new Error(`${label}: missing main-function`);
            //   }
            // }

            // need to add missing test cases later on

            // multiple choice
            if (ex.type === 'multiple-choice') {
                if (!Array.isArray(ex.answer) || ex.answer.some((a) => typeof a !== 'number')) {
                    throw new Error(`${label}: answer must be an array of numbers`);
                }
                if (!Array.isArray(ex.choices) || ex.choices.some((c) => typeof c !== 'string')) {
                    throw new Error(`${label}: choices must be an array of strings`);
                }
                if (!Array.isArray(ex.explanations) || ex.explanations.some((e) => typeof e !== 'string')) {
                    throw new Error(`${label}: explanations must be an array of strings`);
                }
            }

            // tables
            if (ex.table) {

                if (!('headers' in ex)) {
                    throw new Error(`${label}: table question missing headers`);
                }
                if (!('rows' in ex)) {
                    throw new Error(`${label}: table question missing rows`);
                }

                if (!Array.isArray(ex.headers))
                    throw new Error(`${label}: headers must be an array`);
                if (!Array.isArray(ex.rows)) {
                    throw new Error(`${label}: rows must be an array`);
                }

                const rowLength = ex.headers.length;
                ex.rows.forEach((row, idx) => {
                    if (!Array.isArray(row) || row.length !== rowLength) {
                        throw new Error(`${label}: row #${idx + 1} must have exactly ${rowLength} entries`);
                    }
                });

                if (!Array.isArray(ex.answer)) {
                    throw new Error(`${label}: table question must have 'answer' as an array`);
                }
            }

        }

        console.log('Validated file:', filePath);
        });
    });
});

console.log('All done.');
