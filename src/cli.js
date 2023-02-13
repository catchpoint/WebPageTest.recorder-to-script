import { stringify, stringifyStep } from "@puppeteer/replay";
import { WPTChromeExtension } from "./wptrecorder.js";
import path from "path";
import fs from "fs";

let jsonPath = process.argv.slice(2)[0];
const __dirname = path.resolve(path.dirname("."));
const flow = fs.readFileSync(path.join(__dirname, jsonPath), "utf-8");

//Change this later

const WPTStringifyChromeRecording = async (recording) => {
  if (recording.length === 0) {
    console.log("Recording length is not correct");
  }

  let stringifiedString;

  if (JSON.parse(recording).title) {
    stringifiedString = await stringify(JSON.parse(recording), {
      extension: new WPTChromeExtension(),
    });

    stringifiedString = stringifiedString.substring(0, stringifiedString.lastIndexOf("//"));
  } else {
    stringifiedString = await stringifyStep(JSON.parse(recording), {
      extension: new WPTChromeExtension(),
    });
  }

  return stringifiedString;
};

let rec = await WPTStringifyChromeRecording(flow);
console.log(rec);
