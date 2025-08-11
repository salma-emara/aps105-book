const fs = require("fs");
const path = require("path");
const toml = require("toml");
const tomlify = require("tomlify-j0.4");

const basePath = path.join(__dirname, "../exercises");

function walkChaptersAndAddIds() {
  console.log("Script started");

  const chapters = fs.readdirSync(basePath);

  chapters.forEach((chapterFolder) => {
    const chapterPath = path.join(basePath, chapterFolder);
    const filePath = path.join(chapterPath, "testing-exercises.toml");

    if (!fs.existsSync(filePath)) return;

    const tomlContent = fs.readFileSync(filePath, "utf8");
    let parsed;

    try {
      parsed = toml.parse(tomlContent);
    } catch (e) {
      console.error(`Failed to parse ${filePath}:`, e.message);
      return;
    }

    if (!Array.isArray(parsed.exercises)) {
      console.warn(`No exercises found in ${filePath}`);
      return;
    }

    // question-id if missing
    parsed.exercises.forEach((exercise, index) => {
      if (!exercise["question-id"]) {
        exercise["question-id"] = `chapter-${chapterFolder.split("-")[1]}-Q${index + 1}`;
      }
    });

    // convert back to TOML
    const newToml = tomlify.toToml(parsed, { space: 2 });
    fs.writeFileSync(filePath, newToml);
    console.log(`Updated ${filePath}`);
  });
}

walkChaptersAndAddIds();
