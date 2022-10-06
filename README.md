# GRAPHER

## What is it used for?

The purpose of the program is to allow users to create and save a line graph as a .png file.

## What does the code do?

The [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) is used to render the graph.

The [pointermove](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event) and [pointerdown](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerdown_event) events are used to track which point in the graph the user wants to edit.

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
