/*
* This file contains implementations of GameView, GameModel, and GameController, as well as instances of other classes.
*/

/* A GameController implementation. */
var stick = new Joystick(navigator.getGamepads()[0]);
var robotController = new GameController(stick);

// Gets the change in x based off of the joystick values.
robotController.getDeltaX = function() {
    var angle = stick.getX();
    var speed = stick.getY();
    return Math.cos(angle)*speed;
};

// Gets the change in y based off of the joystick values.
robotController.getDeltaY = function() {
    var angle = stick.getX();
    var speed = stick.getY();
    return Math.sin(angle)*speed;
};

/* A GameModel implementation. */

var robotModel = new GameModel(0, 0); //Create new GameModel instance.

// An implementation of GameModel's update() function.
// Assumes that controller is a GameController object (see GameController.js) with the methods shown above implemented.
robotModel.update = function(controller) {
    // Recalculate x and y coordinates
    this.x += controller.getDeltaX();
    this.y += controller.getDeltaY();
};