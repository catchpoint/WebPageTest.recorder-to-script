import { stringify, stringifyStep } from "@puppeteer/replay";
import { WPTChromeExtension } from "./wptrecorder.js";

//Change this later

const WPTStringifyChromeRecording = async (recording) => {
  if (recording.length === 0) {
    console.log("Recording length is not correct");
  }

  let stringifiedString;

  if (recording.title) {
    stringifiedString = await stringify(recording, {
      extension: new WPTChromeExtension(),
    });

    // Can be used to remove #recorderSourceMap
    //stringifiedString = stringifiedString.substring(0, stringifiedString.lastIndexOf("//"));
  } else {
    stringifiedString = await stringifyStep(recording, {
      extension: new WPTChromeExtension(),
    });
  }

  return stringifiedString;
};

export { WPTStringifyChromeRecording };
