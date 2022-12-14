# Script flow

The script starts with assigning references to the relevant HTML elements.

The config is defined.

Then three groups of functions are defined:

1. Functions interacting with the Canvas API.
2. A function that sets up user interaction event-handlers.
3. A set of two functions, one that sets a value in the points array and one that randomises all values in the points array.

Then the genPoints function runs which randomises the values in the points array.

Then the redraw function gets called which first clears the canvas and then draws the x, y axles aswell as steps and unit information and in the end it draws the actual line graph.

Then the setupEventhandlers function is called.

# Functions

### **drawLine**

Starts a new path and moves to the (fromX, fromY) point.
Sets the line color (using #f00/red as the default value).
Sets the second point using (toX, toY).
Fills in the line and closes the path.

### **drawAxles**

Draws two lines in black, one along the x axis and the other along the y axis using the previously talked about drawLine function.

### **drawAxleSteps**

For the length of the points array, drawLine is used to indicate where the point is on the canvas.

### **drawAxleText**

Sets font size and family.
Sets text color to grey.
Draws the value unit in the top left of the canvas.
Draws the period unit in the bottom right.

### **drawPoints**

For every value in the points array:

-   We check weather the prior index is assigned, if so we use its value draw a line between it and the current point.
-   NOTE: The "size.y - value" is used to move the origin to the bottom left. Because the origin position for the canvas is in the top left corner.

### **setupEventhandlers**

1. Starts listening for pointer movement when the left mouse button is pressed down, listens for release.
    - Gets the pointer position and checks which the closest point is to it.
    - Sets the point value according to the pointer height on the canvas.
2. The mouse button released so we stop listening for pointer movement and button releases.
3. Listens for a change on the selected month element and rerenders the canvas with the amount of days in the chosen month.

### **genPoints**

Each index up to the specified amount of points gets assigned a random number between 1 to the canvas height.

### **setPoint**

Sets the provided index to the provided value in the points array.
