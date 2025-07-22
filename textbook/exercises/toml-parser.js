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

        // common variables
        if (typeof ex.title !== 'string') {
          throw new Error(`${label}: title must be a string`);
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

        // exercise type specific variables
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

        if (ex.type === 'programming' || ex.type === 'function programming') {
          if (typeof ex['starter-code'] !== 'string') {
            throw new Error(`${label}: missing starter-code`);
          }
          if (typeof ex['answer-code'] !== 'string') {
            throw new Error(`${label}: missing answer-code`);
          }
        }
      }

      console.log('Validated file:', filePath);
    });
  });
});

console.log('All done.');
