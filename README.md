<p align="center"><img src="https://docs.webpagetest.org/img/wpt-navy-logo.png" alt="WebPageTest Logo" /></p>


# EXPERIMENTAL: Recorder-To-WPT-Script

Script to convert Chrome user flow recordings to WPT Custom Scripts

Takes the path to a recorder JSON file and returns a WebPageTest Custom Script.

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#)


## Requirements

* [Node js](https://nodejs.org/en/)

## Usage

```
node index.js sample-recordings/simple-recorder.json
```

![Screenshots of Script](/assets/images/wpt-recorder-script.png)
Paste this script into WPT custom script and see the magic happening
<br></br>

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
- [Puppeteer JS output for reference](/sample-recordings/puppeteer-examples)
- [Recorder docs](https://developer.chrome.com/docs/devtools/recorder/)

---
**NOTE**
- Only Chrome v101 and above i.e. Google Chrome Developer and Google Chrome Canary exports these json scripts.
- There are some websites having issues with chrome recorder, this issue will be resolved with time as Google developers improve Chrome
  
---


