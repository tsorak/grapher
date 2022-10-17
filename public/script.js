//assign references to html elements
const canvas = document.querySelector("canvas");
const [sizeXElem, sizeYElem] = document.querySelectorAll(".cvsSize");
const noiseModeElem = document.getElementById("noiseModeElem");

//setup config
const config = {
    time: {
        daysInEachMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        isLeapYear: !((new Date().getFullYear() / 4) % 1), //Is the current year evenly dividable with 4
        selectedMonth: 0,
    },
    element: {
        size: { x: sizeXElem.value, y: sizeYElem.value },
    },
    period: {
        unit: "months",
        step: 0,
        amountOfPoints: 0,
    },
    value: {
        unit: "kr",
        step: { distance: 20, amountPerStep: 100 },
        amountOfPoints: 0,
    },
    points: [0],
};
const setupConfig = () => {
    //Calculate pixel distance between each period point (Day)
    config.period.amountOfPoints = config.time.daysInEachMonth[0];
    config.period.step = config.element.size.x / config.period.amountOfPoints;

    //points along y axis
    config.value.amountOfPoints = Math.floor(config.element.size.y / config.value.step.distance);

    //Leap year
    if (config.time.isLeapYear) {
        config.time.daysInEachMonth[1] = 29;
    }
};
setupConfig();
const updateAmountOfPoints = () => {
    config.period.amountOfPoints = config.time.daysInEachMonth[config.time.selectedMonth];
    config.period.step = config.element.size.x / config.period.amountOfPoints;
};

//set canvas size
[canvas.width, canvas.height] = Object.values(config.element.size);
//canvas
const canvas2d = canvas.getContext("2d");

//takes in two points and draws a line between them
const drawLine = (fromX, fromY, toX, toY, color = "#f00") => {
    canvas2d.beginPath();
    canvas2d.moveTo(fromX, fromY);
    canvas2d.lineCap = "square";
    canvas2d.strokeStyle = color;
    canvas2d.lineTo(toX, toY);
    canvas2d.stroke();
    canvas2d.closePath();
};

const drawAxles = () => {
    drawLine(0, 0, 0, config.element.size.y, "#000");
    drawLine(0, config.element.size.y, config.element.size.x, config.element.size.y, "#000");
};

const drawAxleSteps = () => {
    //X
    for (let i = 0; i < config.points.length; i++) {
        drawLine(i * config.period.step, config.element.size.y, i * config.period.step, config.element.size.y - 14, "#000");
    }
    //Y
    for (let i = 0; i < config.value.amountOfPoints; i++) {
        drawLine(0, config.element.size.y - i * config.value.step.distance, 14, config.element.size.y - i * config.value.step.distance, "#000");
    }
};

const drawPoints = () => {
    config.points.forEach((value, index) => {
        const prevIndex = index - 1 > 0 ? index - 1 : 0;
        const prevValue = config.points[index - 1] !== undefined ? config.points[index - 1] : 0;

        drawLine(prevIndex * config.period.step, config.element.size.y - prevValue, index * config.period.step, config.element.size.y - value);
    });
};

//event handlers
const setupEventhandlers = () => {
    const bounds = canvas.getBoundingClientRect();
    // const mousePos = { x: 0, y: 0 };

    canvas.onpointerdown = (e) => {
        if (e.button !== 0) return;
        canvas.onpointermove = (e) => {
            const x = e.clientX - (bounds.left - 0.5);
            const y = e.clientY - (bounds.top - 0.5);
            const closestPoint = Math.round(Math.abs(config.element.size.x - x - 800) / config.period.step);
            // console.log(closestPoint);
            setPoint(closestPoint, config.element.size.y - y);
            redraw();
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
    form.onchange,
        (form.oninput = (e) => {
            console.log(form);
            const selectedMonth = Number(form.monthSelectElem.value);
            config.time.selectedMonth = selectedMonth;
            updateAmountOfPoints();
            genPoints();
            redraw();
        });
};

//gen points
const genPoints = () => {
    for (let i = 1; i < config.period.amountOfPoints + 1; i++) {
        const randomVal = Math.ceil(Math.random() * config.element.size.y);
        config.points[i] = randomVal;
    }
};

//set single point
const setPoint = (point, value) => {
    config.points[point] = value;
};

const redraw = () => {
    canvas2d.reset();
    drawAxles();
    drawAxleSteps();
    drawPoints();
};

genPoints();
redraw();
setupEventhandlers();

//Toggling of noise-mode
let autoRefreshID;
const enableNoiseMode = () => {
    autoRefreshID = setInterval(() => {
        genPoints();
        redraw();
    }, 50);
};
const disableNoiseMode = () => {
    clearInterval(autoRefreshID);
};

noiseModeElem.onchange = () => {
    noiseModeElem.checked ? enableNoiseMode() : disableNoiseMode();
};

console.debug(config);
