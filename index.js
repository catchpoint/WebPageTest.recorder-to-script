const fs = require('fs');
let jsonPath = process.argv.slice(2)[0];
let jsonFile = fs.readFileSync(jsonPath);
let flow = JSON.parse(jsonFile);


let convert = function(step) {
    let wptScript = '';

    //first, is it a valid step?
    function isValid(stepType) {
        if (stepMap[stepType]) {
            return true;
        } else {
            return false;
        }
    }
    function addNavigate(url) {
        wptScript += 'setEventName Navigate\n';
        wptScript += 'navigate ' + url + '\n';
    }
    function addClick(selectors) {
        wptScript += 'setEventName Click\n';
        //for now, let's skip any aria/ until we figure somethign out there
        for (let index = 0; index < selectors.length; index++) {
            const selector = selectors[index];
            if (!selector[0].startsWith('aria/')) {
                wptScript += 'execAndWait document.querySelector("' + selector + '").click();\n';
                break;
            }
        }
    }
    function addChange(selectors, value) {
        wptScript += 'setEventName Change\n';
        wptScript += 'combineSteps 2\n';
        //for now, let's skip any aria/ until we figure somethign out there
        for (let index = 0; index < selectors.length; index++) {
            const selector = selectors[index];
            if (!selector[0].startsWith('aria/')) {
                wptScript += 'exec document.querySelector("' + selector + '").value = ' + value + ';\n';
                wptScript += 'execAndWait document.querySelector("' + selector + '").dispatchEvent(new Event("change", { bubbles: true }));\n';
                wptScript += 'execAndWait document.querySelector("' + selector + '").dispatchEvent(new Event("input", { bubbles: true }));\n';
                break;
            }
        }
    }
    function addScriptLine(step) {
        switch(step.type) {
            case 'navigate':
                addNavigate(step.url);
                break;
            case 'click':
                addClick(step.selectors);
                break;
            case 'change':
                addChange(step.selectors, step.value);
                break;
        }
    }

    flow.steps.forEach(step => {
        addScriptLine(step);
    });

    return wptScript;
}

let wptScript = convert(flow);
console.log(wptScript);