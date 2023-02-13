import { StringifyExtension } from "@puppeteer/replay";

export class WPTChromeExtension extends StringifyExtension {
  async beforeAllSteps(...args) {}

  async afterEachStep(...args) {
    const [out, step] = args;

    function addScriptLine(step) {
      switch (step.type) {
        case "setViewport":
          addViewport(step);
          break;
        case "navigate":
          addNavigate(step.url);
          break;
        case "click":
          addClick(step.selectors);
          break;
        case "change":
          addChange(step.selectors, step.value);
          break;
        case "keyDown":
          addKeyDown(step.assertedEvents && step.assertedEvents);
          break;
        case "keyUp":
          addKeyUp();
          break;
        case "waitForElement":
          addWaitForElement(step.selectors);
          break;
        case "waitForExpression":
          addWaitFor(step);
          break;
        case "doubleClick":
          doubleClick(step.selectors);
          break;
        case "scroll":
          scroll(step);
          break;
      }
    }
    //Gotta do something about this
    let isKeyDown = false;

    addScriptLine(step);

    function addNavigate(url) {
      out.appendLine(`setEventName Navigate`);
      out.appendLine(`navigate ${url}`);
    }

    function addViewport(step) {
      out.appendLine(`setViewportSize ${step.width} ${step.height}`);
    }

    function addNavigate(url) {
      out.appendLine("setEventName Navigate");
      out.appendLine("navigate " + url + "");
    }

    function addClick(selectors) {
      out.appendLine("setEventName Click");
      //for now, let's skip any aria/ until we figure somethign out there
      selectors.forEach((selector) => {
        if (!selector[0].startsWith("aria/") && !selector[0].startsWith("xpath/") && !selector[0].startsWith("text/")) {
          out.appendLine('execAndWait document.querySelector("' + selector + '").click();');
        }
      });
    }

    function addChange(selectors, value) {
      if (isKeyDown) {
        out.appendLine("setEventName KeyDown");
        selectors.forEach((selector) => {
          if (
            !selector[0].startsWith("aria/") &&
            !selector[0].startsWith("xpath/") &&
            !selector[0].startsWith("text/")
          ) {
            out.appendLine('execAndWait document.querySelector("' + selector + '").click();');
          }
        });
      } else {
        out.appendLine("setEventName Change");
        //for now, let's skip any aria/ until we figure somethign out there
        selectors.forEach((selector) => {
          if (
            !selector[0].startsWith("aria/") &&
            !selector[0].startsWith("xpath/") &&
            !selector[0].startsWith("text/")
          ) {
            //out.appendLine('execAndWait document.querySelector("' + selector + '").value = "' + value + '";';
            // This will also handle React's Synthetic Event Listeners
            out.appendLine(
              `execAndWait el = document.querySelector('${selector}'); proto = Object.getPrototypeOf(el); set = Object.getOwnPropertyDescriptor(proto, 'value').set; set.call(el, '${value}'); el.dispatchEvent(new Event('input', { bubbles: true }))`
            );
          }
        });
      }
    }

    function addKeyDown(assertedEvents) {
      //Because some keydown events are returning url's as assertedEvents
      if (assertedEvents) {
        assertedEvents.forEach((item) => {
          out.appendLine("setEventName KeyDown");
          out.appendLine("navigate " + item.url + "");
        });
      } else {
        //just to fake out to change the state so that change function can behave as expected
        isKeyDown = true;
      }
    }

    function addKeyUp() {
      isKeyDown = false;
    }

    function addWaitForElement(selectors) {
      selectors.forEach((selector) => {
        out.appendLine("setEventName WaitForElement");
        out.appendLine(`waitFor document.querySelector("${selector}")`);
      });
    }

    function addWaitFor(step) {
      out.appendLine("setEventName WaitForExpression");
      out.appendLine("waitFor " + step.expression + "");
    }

    function doubleClick(selectors) {
      out.appendLine("setEventName doubleClick");
      //for now, let's skip any aria/ until we figure somethign out there
      selectors.forEach((selector) => {
        if (!selector[0].startsWith("aria/") && !selector[0].startsWith("xpath/") && !selector[0].startsWith("text/")) {
          out.appendLine(`execAndWait document.querySelector('${selector}').dispatchEvent(new MouseEvent('dblclick'))`);
        }
      });
    }

    function scroll(step) {
      out.appendLine("setEventName Scroll");
      out.appendLine(`execAndWait window.scrollBy(${step.x},${step.y})`);
    }
  }

  // async afterAllSteps(...args) {
  //   args[0].appendLine('console.log("finished");');
  // }

  // async stringifyStep(...args) {
  //   console.log(...args);
  // }
}
