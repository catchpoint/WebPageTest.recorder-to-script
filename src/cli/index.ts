import meow from "meow";
import inquirer, { Answers } from "inquirer";
import { runTransformsOnChromeRecording } from "../transform.js";
import { expandedFiles } from "../utils.js";
import { InquirerAnswerTypes } from "../types";
import chalk from "chalk";

const cli = meow(
  `
  Usage
    $ npx webpagetest-chrome-recorder <path-of-recording.json> [options]

  Options

    -d,  --dry            Dry run the output of the transformed recordings
    -o,  --output         Output location of the files generated by the exporter

  Examples

    $ npx webpagetest-chrome-recorder recordings.json
    $ npx webpagetest-chrome-recorder recordings/*.json
`,
  {
    importMeta: import.meta,
    flags: {
      dry: {
        type: "boolean",
        alias: "d",
      },
      output: {
        type: "string",
        alias: "o",
      },
    },
  }
);

inquirer
  .prompt([
    {
      type: "input",
      name: "files",
      message: "Enter directory or files that should be converted from Recorder JSON to Webpagetest:",
      default: ".",
      when: () => !cli.input.length,
      filter(files: string) {
        return new Promise((resolve) => {
          resolve(files.split(/\s+/).filter((f) => f.trim().length > 0));
        });
      },
    },
    {
      type: "input",
      name: "outputPath",
      message: "Mention the output directory name?",
      when: () => !cli.flags.dry && !cli.flags.output,
      default: "webpagetest",
    },
  ])
  .then((answers: Answers) => {
    const { files: recordingFiles, outputPath: outputFolder } = answers;
    const files = cli.input.length ? cli.input : recordingFiles;
    const filesExpanded = expandedFiles(files);

    if (!filesExpanded) {
      console.log(`No recording files found matching ${files.join(" ")}`);
      return null;
    }

    const outputPath = Array.isArray(cli.flags?.output) ? cli.flags.output : outputFolder;

    return runTransformsOnChromeRecording({
      files: filesExpanded,
      outputPath: outputPath ?? "webpagetest",
      flags: cli.flags,
    });
  })
  .catch((error: any) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      console.log(error);
    }
  });
