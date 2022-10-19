# GRAPHER

**For a more detailed rundown of the project, please see the API.md file.**

## What is it used for?

The purpose of the program is to allow users to create and save a line graph as a .png file.

The provided example can be used to interactively draw a graph of expenditures over each day in a month.

## What does the code do?

The [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) is used to render the graph.

The [pointermove](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event) and [pointerdown](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerdown_event) events are used to track which point in the graph the user wants to edit.

## Further work

-   As the code stands now the Expense example is hard-coded into the script.js file.

    Further work could therefore include generalising and building a more user-friendly interface.
    This could be done by using a class or just a "grapher" object containing the functions which rely on the canvas interface. (noisemode would not have to be included as it is not required for the program to run.)
    Grapher would then have an initialising function which takes in a config and a "CanvasRenderingContext2D".
    The config would only include information about which units to use aswell as an array of values.

-   Perhaps instead of using the Canvas API something else could be built to generate and save the graph to disk. (Maybe using only the commandline entirely? Providing a config and an array of numbers...)

## Running the project

### **Node**

Install dependencies

```
npm install
```

Starting the project

```
npm run start
```

### **Deno**

Starting the project

```
deno task start
```
