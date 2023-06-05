const fs = require('fs');
const path = require('path');
const toml = require('@iarna/toml'); 

const folders = fs.readdirSync('./');

folders.forEach((folder) => {
    const folderDir = path.join('./', folder);
    if (fs.statSync(folderDir).isDirectory() === false) {
        return;
    }
    const files = fs.readdirSync(folderDir);

    files.forEach((file) => {
        if (file.endsWith('.toml')) {
            const filePath = path.join(folderDir, file);
            console.log("Working on: " + filePath);
            const tomlString = fs.readFileSync(filePath, 'utf-8'); 
            const tomlData = toml.parse(tomlString); 
            const questionCount = tomlData.questions.length; 
            const questions = []; 
            for (let i = 0; i < questionCount; i++) { 
                const question = tomlData.questions[i]; 
                if (typeof question.prompt !== 'string') {
                    throw new Error('Prompt must be a string');
                }
                if (!question.answer.every((element) => typeof element === 'number')) {
                    throw new Error('Answer must be an array of numbers');
                }
                if (!question.distractors.every((element) => typeof element === 'string')) {
                    throw new Error('Distractors must be an array of strings');
                }
                if (!question.explainations.every((element) => typeof element === 'string')) {
                    throw new Error('Explainations must be an array of strings');
                }

                questions.push(question); 
            }
            console.log("Done: " + filePath);
        }
    });
});
 
console.log("All done.")