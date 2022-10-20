let config = {
    period: {
        unit: "",
    },
    value: {
        unit: "",
    },
    points: [],
};
let canvas;
let canvas2d;

const state = {
    period: {
        stepSpacing: undefined,
    },
    value: {
        stepSpacing: undefined,
    },
};

const init = (inputConfig, inputCanvas) => {
    config = inputConfig;
    canvas = inputCanvas;
    canvas2d = canvas.getContext("2d");

    // //state
    // state.points = config.points;
    // state.period.stepCount = state.points.length;
    // state.value.stepCount = config.value.stepCount ? config.value.stepCount : 10;

    if (!config.points || !config.points.length) {
        throw new Error("No points provided!");
    }

    calculateStepSpacing();
    redraw();
};

const calculateStepSpacing = () => {
    //x
    state.period.stepSpacing = canvas.width / config.points.length;

    //y
    state.value.stepSpacing = canvas.height / config.points.length;
    // state.value.stepSpacing = canvas.height / Math.max.apply(null, config.points);
    // let sum = 0;
    // exconfig.points.forEach((value) => {
    //     sum += value;
    // });
    // let averageValue = sum / exconfig.points.length;
    // state.value.stepSpacing = canvas.height / averageValue;
};

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
    drawLine(0, 0, 0, canvas.height, "#000");
    drawLine(0, canvas.height, canvas.width, canvas.height, "#000");
};

const drawAxleSteps = () => {
    //X
    for (let i = 0; i < config.points.length; i++) {
        drawLine(i * state.period.stepSpacing, canvas.height, i * state.period.stepSpacing, canvas.height - 14, "#000");
    }
    //Y
    for (let i = 0; i < canvas.height / state.value.stepSpacing; i++) {
        drawLine(0, canvas.height - i * state.value.stepSpacing, 14, canvas.height - i * state.value.stepSpacing, "#000");
    }
};

const drawAxleText = () => {
    canvas2d.font = "12px serif";
    canvas2d.fillStyle = "#777";
    canvas2d.fillText(`${config.value.unit}`, 16, 12);
    canvas2d.fillText(`${config.period.unit}`, canvas.width - 24, canvas.height - 20);
};

const drawPoints = () => {
    config.points.forEach((value, index) => {
        const prevIndex = index - 1 > 0 ? index - 1 : 0;
        const prevValue = config.points[index - 1] !== undefined ? config.points[index - 1] : 0;

        drawLine(prevIndex * state.period.stepSpacing, canvas.height - prevValue, index * state.period.stepSpacing, canvas.height - value);
    });
};

const genPoints = () => {
    for (let i = 0; i < (!config.points.length ? 10 : config.points.length); i++) {
        const randomVal = Math.ceil(Math.random() * canvas.height);
        config.points[i] = randomVal;
    }
};

const setPoint = (point, value) => {
    config.points[point] = value;
};

const redraw = () => {
    canvas2d.reset();
    drawAxles();
    drawAxleSteps();
    drawAxleText();
    drawPoints();
};

export { init, state, genPoints, setPoint, redraw };
