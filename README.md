<!-- <p align="center"><img src="https://docs.webpagetest.org/img/wpt-navy-logo.png" alt="WebPageTest Logo" /></p> -->
<p align="center"><img width="100%" alt="Webpagetest Slack Banner" src="assets/Banner-docs.jpg"></p>
<p align="center"><a href="https://docs.webpagetest.org/api/integrations/#officially-supported-integrations">Learn about more WebPageTest API Integrations in our docs</a></p>

#  WEBPAGETEST CHROME RECORDER

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#)

This tool will help you to convert JSON user flows from [Google Chrome DevTools Recorder](https://goo.gle/devtools-recorder) to WEBPAGETEST Custom Scripts

Converts recordings to Webpagetest scripts using CLI / Module (Wrapper Funstions).


Check out our [Webpagetest Chrome extension](https://chrome.google.com/webstore/detail/webpagetest-recorder-exte/eklpnjohdjknellndlnepihjnhpaimok) to export JSON user flows as Webpagetest custom scripts straight away from Chrome DevTools.


## 🏗 Installation

```sh
npm install -g webpagetest-chrome-recorder
```

## 🚀 Usage

To quickly run the interactive CLI, run:

```sh
npx webpagetest-chrome-recorder
```

> The CLI will prompt you for the path to the chrome devtool recordings you wish to modify and the location to write the Nightwatch tests.

**⚡️ Transform individual recordings**

```sh
npx webpagetest-chrome-recorder <path to the chrome devtools recording>
```

**⚡️ Transform multiple recordings** (Space delimited)

```sh
npx webpagetest-chrome-recorder <path.json> <path.json>
```

👉 By default output will be written to `webpagetest` folder.

You can specify different output directory, specify that via cli

```sh
npx webpagetest-chrome-recorder <path to the chrome devtools recording> --output=<folder-name>
```

## ⚙️ CLI Options

| Option       | Description                                            |
| ------------ | ------------------------------------------------------ |
| -d, --dry    | Dry run the output of the transformed recordings       |
| -o, --output | Set Output location for the exports                    |

## 💻 Programmatic API

```javascript
import { WPTStringifyChromeRecording } from "webpagetest-chrome-recorder";

const recording = {
  title: "recording",
  steps: [
    {
      type: "setViewport",
      width: 812,
      height: 609,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false,
    },
    {
      type: "navigate",
      url: "https://timkadlec.com/",
      assertedEvents: [
        {
          type: "navigation",
          url: "https://timkadlec.com/",
          title: "TimKadlec.com - Web Performance Consulting | TimKadlec.com",
        },
      ],
    },
  ],
};

const customScript = await WPTStringifyChromeRecording(JSON.stringify(recording));

console.log(customScript);


//setViewportSize 812 609
//setEventName Navigate
//navigate https://timkadlec.com/
//# recorderSourceMap=BABBC
```

## Steps to obtain Chrome user flow recordings

Refer to [Recorder docs](https://developer.chrome.com/docs/devtools/recorder/) for more information on Chrome Recorder

<h3>#Open the Recorder panel</h3>

- Open DevTools.
- Click on More options --> More tools > Recorder.

![Screenshots of Script](/assets/images/open_dev-1.png)

<h3>#Export the JSON</h3>

---
**NOTE**
- Only Chrome v101 and above i.e. Google Chrome Developer and Google Chrome Canary exports these json scripts.
- Make sure that your recording plays back correctly in Chrome before feeding it into The Recorder Script (To obtain the expected outcome)

---

After you are done with the recording

- Click on export icon and select "Export as a JSON file"

![Screenshots of Script](/assets/images/export-json.png)

Once that is done, feed the JSON into the recorder script to generate the [WPT custom script](#usage)


## Currently Supported Recorder Commands

- `navigate` (maps to `navigate`)
- `click` (maps to `execAndWait`)
- `change` (maps to `execAndWait`)
- `keydown` (maps to `execAndWait`)
- `keyup` (maps to `execAndWait`)
- `waitForElement` (maps to `waitFor`)
- `waitForExpression` (maps to `waitFor`)
- `doubleClick` (maps to `execAndWait`)
- `scroll` (maps to `execAndWait`)

## Resources
- [Sample JSON recordings](/sample-recordings)
- [Recorder docs](https://developer.chrome.com/docs/devtools/recorder/)

---
**NOTE**
- Only Chrome v101 and above supports export json scripts.

---


