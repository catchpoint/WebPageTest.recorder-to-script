# EXPERIMENTAL: Recorder-To-WPT-Script
Script to convert Chrome user flow recordings to WPT Custom Scripts

Takes the path to a recorder JSON file and returns a WebPageTest Custom Script.

```
node index.js sample-recordings/simple-recorder.json
```

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

There are some websites having issues with chrome recorder, this issue will be resolved with time as Google developers improve Chrome

---
