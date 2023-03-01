import chalk from "chalk";
import * as path from "path";
import fs from "fs";
import { readFileSync } from "fs";
import { WPTStringifyChromeRecording } from "./main.js";

const __dirname = path.resolve(path.dirname("."));

export function runTransformsOnChromeRecording({ files, outputPath, flags }) {
  const { dry } = flags;

  return files.map(async (file) => {
    console.log(chalk.yellow(`Running Webpagetest Chrome Recorder on ${file}\n`));

    const recordingContent = readFileSync(file, "utf-8");
    const stringifiedFile = await WPTStringifyChromeRecording(recordingContent);

    if (!stringifiedFile) {
      return;
    }

    const fileName = file.split("/").pop();
    const testName = fileName ? fileName.replace(".json", "") : undefined;

    if (dry) {
      console.log(stringifiedFile);
    } else if (!testName) {
      chalk.red("Please try again. Now file or folder found");
    } else {
      let outputFolder = path.join(__dirname, outputPath);
      exportFileToFolder({
        stringifiedFile,
        testName,
        outputPath,
        outputFolder,
      });
    }
  });
}

function exportFileToFolder({ stringifiedFile, testName, outputPath, outputFolder }) {
  const folderPath = path.join(".", outputPath);
  if (!fs.existsSync(folderPath)) {
    fs.mkdir(
      path.join(".", outputPath),
      {
        recursive: true,
      },
      (err) => {
        if (!err) {
          exportFileToFolder({
            stringifiedFile,
            testName,
            outputFolder,
            outputPath,
          });
        } else {
          console.error(` Something went wrong while creating ${outputPath}\n Stacktrace: ${err?.stack}`);
        }
      }
    );
  } else {
    fs.writeFile(path.join(outputFolder, `/${testName}.txt`), stringifiedFile, (err) => {
      if (!err) {
        console.log(chalk.green(`\n ${testName}.json exported to ${outputPath}/${testName}.js\n `));
      } else {
        console.log(chalk.red(`\n Something went wrong exporting ${outputPath}/${testName}.js \n`));
      }
    });
  }
}
