//assign references to html elements
const canvas = document.querySelector("canvas");
const [sizeXElem, sizeYElem] = document.querySelectorAll(".cvsSize");

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
		step: 20,
	},
};
console.debug(config);

//set canvas size
[canvas.width, canvas.height] = Object.values(config.element.size);
