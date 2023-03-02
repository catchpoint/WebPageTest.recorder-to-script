import assert from "assert";
import { stringify, stringifyStep } from "@puppeteer/replay";
import { WPTChromeExtension } from "../src/wptrecorder.js";
import { Interface, it } from "mocha";

describe("WebpagetestStringifyExtension", function () {
  it("should correctly exports setViewport step", async () => {
    const recording: any = {
      title: "Recording 10/4/2022 at 4:20:30 PM",
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
      ],
    };
    let stringifiedString = await stringify(recording, {
      extension: new WPTChromeExtension(),
    });

    assert.equal(
      stringifiedString.toString().substring(0, stringifiedString.lastIndexOf("//")),
      "setViewportSize 812 609\n"
    );
  });

  it("should correctly exports navigate step", async () => {
    const recording: any = {
      title: "Recording 10/4/2022 at 4:20:30 PM",
      steps: [
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
    let stringifiedString = await stringify(recording, {
      extension: new WPTChromeExtension(),
    });

    assert.equal(
      stringifiedString.toString().substring(0, stringifiedString.lastIndexOf("//")),
      "setEventName Navigate\nnavigate https://timkadlec.com/\n"
    );
  });

  it("should correctly exports click step", async () => {
    const recording: any = {
      title: "Recording 10/4/2022 at 4:20:30 PM",
      steps: [
        {
          type: "click",
          target: "main",
          selectors: [
            ["aria/WORK WITH ME"],
            ["#nav > ul > li:nth-child(2) > a"],
            ['xpath///*[@id="nav"]/ul/li[2]/a'],
            ["text/Work With Me"],
          ],
          offsetY: 50,
          offsetX: 101.82290649414062,
          assertedEvents: [
            {
              type: "navigation",
              url: "https://timkadlec.com/me/",
              title: "",
            },
          ],
        },
      ],
    };
    let stringifiedString = await stringify(recording, {
      extension: new WPTChromeExtension(),
    });

    assert.equal(
      stringifiedString.toString().substring(0, stringifiedString.lastIndexOf("//")),
      'setEventName Click\nexecAndWait document.querySelector("#nav > ul > li:nth-child(2) > a").click();\n'
    );
  });

  it("should correctly exports change step", async () => {
    const recording: any = {
      title: "Recording 10/4/2022 at 4:20:30 PM",
      steps: [
        {
          type: "change",
          value: "iphone 14",
          selectors: [["aria/Search Amazon.in"], ["#twotabsearchtextbox"], ['xpath///*[@id="twotabsearchtextbox"]']],
          target: "main",
        },
      ],
    };
    let stringifiedString = await stringify(recording, {
      extension: new WPTChromeExtension(),
    });

    assert.equal(
      stringifiedString.toString().substring(0, stringifiedString.lastIndexOf("//")),
      'setEventName Change\nexecAndWait el = document.querySelector("#twotabsearchtextbox"); proto = Object.getPrototypeOf(el); set = Object.getOwnPropertyDescriptor(proto, "value").set; set.call(el, "iphone 14"); el.dispatchEvent(new Event("input", { bubbles: true }))\n'
    );
  });

  it("should correctly exports keyDown step", async () => {
    const recording: any = {
      title: "Recording 10/4/2022 at 4:20:30 PM",
      steps: [
        {
          type: "keyDown",
          target: "main",
          key: "Enter",
          assertedEvents: [
            {
              type: "navigation",
              url: "https://www.amazon.in/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=iphone+14&crid=3VSGL4Z2V5AQ2&sprefix=iphone+14%2Caps%2C433",
              title: "",
            },
          ],
        },
      ],
    };
    let stringifiedString = await stringify(recording, {
      extension: new WPTChromeExtension(),
    });

    assert.equal(
      stringifiedString.toString().substring(0, stringifiedString.lastIndexOf("//")),
      "setEventName KeyDown\nnavigate https://www.amazon.in/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=iphone+14&crid=3VSGL4Z2V5AQ2&sprefix=iphone+14%2Caps%2C433\n"
    );
  });

  it("should correctly exports keyUp step", async () => {
    const recording: any = {
      title: "Recording 10/4/2022 at 4:20:30 PM",
      steps: [
        {
          type: "keyUp",
          key: "Enter",
          target: "main",
        },
      ],
    };
    let stringifiedString = await stringify(recording, {
      extension: new WPTChromeExtension(),
    });

    assert.equal(stringifiedString.toString().substring(0, stringifiedString.lastIndexOf("//")), "");
  });

  it("should correctly exports waitForElement step", async () => {
    const recording: any = {
      title: "Recording 10/4/2022 at 4:20:30 PM",
      steps: [
        {
          type: "waitForElement",
          selectors: [
            ["aria/Start Test →"],
            ["#analytical-review > div:nth-child(2) > div > ul > li > div > div.test_presets_easy_submit > input"],
            ['xpath///*[@id="analytical-review"]/div[1]/div/ul/li/div/div[3]/input'],
          ],
          frame: [],
          target: "main",
        },
      ],
    };
    let stringifiedString = await stringify(recording, {
      extension: new WPTChromeExtension(),
    });

    assert.equal(
      stringifiedString.toString().substring(0, stringifiedString.lastIndexOf("//")),
      'setEventName WaitForElement\nwaitFor document.querySelector("#analytical-review > div:nth-child(2) > div > ul > li > div > div.test_presets_easy_submit > input")\n'
    );
  });

  it("should correctly exports waitForExpression step", async () => {
    const recording: any = {
      title: "Recording 10/4/2022 at 4:20:30 PM",
      steps: [
        {
          type: "waitForExpression",
          expression: "true",
        },
      ],
    };
    let stringifiedString = await stringify(recording, {
      extension: new WPTChromeExtension(),
    });

    assert.equal(
      stringifiedString.toString().substring(0, stringifiedString.lastIndexOf("//")),
      "setEventName WaitForExpression\nwaitFor true\n"
    );
  });

  it("should correctly exports doubleClick step", async () => {
    const recording: any = {
      title: "Recording 10/4/2022 at 4:20:30 PM",
      steps: [
        {
          type: "doubleClick",
          selectors: [
            ["aria/Start Test →"],
            ["#analytical-review > div:nth-child(2) > div > ul > li > div > div.test_presets_easy_submit > input"],
            ['xpath///*[@id="analytical-review"]/div[1]/div/ul/li/div/div[3]/input'],
          ],
          offsetX: 124.96295166015625,
          offsetY: 7.682861328125,
          frame: [],
          target: "main",
        },
      ],
    };
    let stringifiedString = await stringify(recording, {
      extension: new WPTChromeExtension(),
    });

    assert.equal(
      stringifiedString.toString().substring(0, stringifiedString.lastIndexOf("//")),
      "setEventName doubleClick\nexecAndWait document.querySelector('#analytical-review > div:nth-child(2) > div > ul > li > div > div.test_presets_easy_submit > input').dispatchEvent(new MouseEvent('dblclick'))\n"
    );
  });

  it("should correctly exports single step", async () => {
    const recording: any = {
      type: "navigate",
      url: "https://timkadlec.com/",
      assertedEvents: [
        {
          type: "navigation",
          url: "https://timkadlec.com/",
          title: "TimKadlec.com - Web Performance Consulting | TimKadlec.com",
        },
      ],
    };
    let stringifiedString = await stringifyStep(recording, {
      extension: new WPTChromeExtension(),
    });

    assert.equal(stringifiedString.toString(), "setEventName Navigate\nnavigate https://timkadlec.com/\n");
  });
});
