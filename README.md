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


## Currently Supported Recorder Commands

- `navigate` (maps to `navigate`)
- `click` (maps to `execAndWait`)
- `change` (maps to `execAndWait`)
- `keydown` (maps to `execAndWait`)
- `keyup` (maps to `execAndWait`)

## Resources
- [Sample JSON recordings](/sample-recordings)
- [Puppeteer JS output for reference](/sample-recordings/puppeteer-examples)
- [Recorder docs](https://developer.chrome.com/docs/devtools/recorder/)

---
**NOTE**

<ul>
<li>At the moment, only Google Chrome Developer and Google Chrome Canary exports these json scripts.</li>
<li>There are some websites having issues with chrome recorder, this issue will be resolved with time as Google developers improve Chrome</li>
</ul>




---


