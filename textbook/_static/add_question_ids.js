const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "../exercises");

function walkChaptersAndAddIds() {
  const chapters = fs.readdirSync(basePath);

  chapters.forEach((chapterFolder) => {
    const chapterPath = path.join(basePath, chapterFolder);
    const filePath = path.join(chapterPath, "testing-exercises.toml");

    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, "utf8");
    let lines = content.split("\n");

    let exerciseIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === "[[exercises]]") {
        exerciseIndex++;

        // Check if this exercise already has a question-id anywhere before the next exercise
        let nextExerciseIndex = lines.slice(i + 1).findIndex(l => l.trim() === "[[exercises]]");
        let sliceEnd = nextExerciseIndex === -1 ? lines.length : i + 1 + nextExerciseIndex;
        const hasId = lines.slice(i + 1, sliceEnd).some(l => l.trim().startsWith("question-id"));

        if (!hasId) {
          const chapterNum = chapterFolder.match(/^chapter-(\d+)$/i)?.[1] || "0";
          const qid = `chapter-${chapterNum}-Q${exerciseIndex}`;
          lines.splice(i + 1, 0, `question-id = "${qid}"`);
        }
      }
    }

    fs.writeFileSync(filePath, lines.join("\n"));
    console.log(`Patched ${filePath}`);
  });
}

walkChaptersAndAddIds();
