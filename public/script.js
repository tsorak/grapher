//setup grapher
import * as grapher from "./modules/grapher.js";

//assign references to html elements
const canvas = document.querySelector("canvas");
// const [sizeXElem, sizeYElem] = document.querySelectorAll(".cvsSize");
const noiseModeElem = document.getElementById("noiseModeElem");

//STATE
const example = {
    selectedMonth: 0,
    daysInEachMonth: [31, !((new Date().getFullYear() / 4) % 1) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
};

const config = {
    period: {
        unit: "days",
    },
    value: {
        unit: "kr",
    },
    points: new Array(example.daysInEachMonth[new Date().getMonth()]),
};

grapher.init(config, canvas);

//Event Handlers
const bounds = canvas.getBoundingClientRect();
canvas.onpointerdown = (e) => {
    if (e.button !== 0) return;
    canvas.onpointermove = (e) => {
        const x = e.clientX - (bounds.left - 0.5);
        const y = e.clientY - (bounds.top - 0.5);
        const closestPoint = Math.round(x / grapher.state.period.stepSpacing);
        // console.log(closestPoint);
        grapher.setPoint(closestPoint, canvas.height - y);
        grapher.redraw();
    };
    canvas.onpointerup = (e) => {
        canvas.onpointermove = null;
        canvas.onpointerup = null;
    };
};
document.onpointerup = () => {
    canvas.onpointermove = null;
    canvas.onpointerup = null;
};
const form = document.querySelector("form");
form.onchange = (e) => {
    example.selectedMonth = form.monthSelectElem.value;
    config.points = new Array(example.daysInEachMonth[example.selectedMonth]);

    grapher.init(config, canvas);
};

//Toggling noise-mode
const noisemode = {
    id: null,
    toggle: () => {
        if (noisemode.id) {
            clearInterval(noisemode.id);
            noisemode.id = null;
        } else {
            noisemode.id = setInterval(() => {
                grapher.genPoints();
                grapher.redraw();
            }, 50);
        }
    },
};

//event handler
noiseModeElem.onchange = () => {
    noisemode.toggle();
};

console.debug(config);
