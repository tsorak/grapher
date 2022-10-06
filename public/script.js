//assign references to html elements
const canvas = document.querySelector("canvas");
const [sizeXElem, sizeYElem] = document.querySelectorAll(".cvsSize");
const noiseModeElem = document.getElementById("noiseModeElem");

//setup config
const config = {
	element: {
		size: { x: sizeXElem.value, y: sizeYElem.value },
	},
	period: {
		unit: "months",
		step: 20,
	},
	value: {
		unit: "kr",
	},
	points: [0],
	amountOfPoints: 0,
};

//calculate how many points fit along the x axis. Taking 'period.step' into account.
config.amountOfPoints = Math.floor(config.element.size.x / config.period.step);

//set canvas size
[canvas.width, canvas.height] = Object.values(config.element.size);

//canvas
const cvs = canvas.getContext("2d");

const setupAxles = () => {
	cvs.beginPath();
	cvs.moveTo(0, 0);
	cvs.lineCap = "square";
	cvs.strokeStyle = "#f00";
	cvs.lineTo(0, config.element.size.y);
	cvs.stroke();
	cvs.closePath();

	cvs.beginPath();
	cvs.moveTo(0, config.element.size.y);
	cvs.lineCap = "square";
	cvs.strokeStyle = "#f00";
	cvs.lineTo(config.element.size.x, config.element.size.y);
	cvs.stroke();
	cvs.closePath();
};

const drawPoints = () => {
	config.points.forEach((value, index) => {
		const prevIndex = index - 1 > 0 ? index - 1 : 0;
		const prevValue = config.points[index - 1] !== undefined ? config.points[index - 1] : 0;

		cvs.beginPath();
		cvs.moveTo(prevIndex * config.period.step, config.element.size.y - prevValue);
		cvs.lineCap = "butt";
		cvs.strokeStyle = "#f00";
		cvs.lineTo(index * config.period.step, config.element.size.y - value);
		cvs.stroke();
		cvs.closePath();
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
			const closestPoint = Math.round(x / (config.amountOfPoints / 2));
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
};

//gen points
const genPoints = () => {
	for (let i = 1; i < config.amountOfPoints + 1; i++) {
		const randomVal = Math.ceil(Math.random() * config.element.size.y);
		config.points[i] = randomVal;
	}
};

//set single point
const setPoint = (point, value) => {
	config.points[point] = value;
};

const redraw = () => {
	cvs.reset();
	setupAxles();
	drawPoints();
};

genPoints();
redraw();
setupEventhandlers();

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
