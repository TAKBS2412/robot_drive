/*
* This file contains implementations of GameView, GameModel, and GameController, as well as instances of other classes.
*/

/* A GameController implementation. */
var stick = new Joystick(navigator.getGamepads()[0]);
var robotController = new GameController(stick);

// Gets the angle from the joystick.
robotController.getAngle = function() {
    return this.input.getX();
};

// Gets the speed from the joystick.
robotController.getSpeed = function() {
    return this.input.getY();
};

// Gets the change in x based off of angle and speed.
robotController.getDeltaX = function(angle, speed) {
    return Math.cos(angle)*speed;
};

// Gets the change in y based off of angle and speed.
robotController.getDeltaY = function(angle, speed) {
    return Math.sin(angle)*speed;
};

/* A GameModel implementation. */

var robotModel = new GameModel(0, 0); //Create new GameModel instance.

// An implementation of GameModel's update() function.
// Assumes that controller is a GameController object (see GameController.js) with the methods shown above implemented.
robotModel.update = function(controller) {
    // Find angle and speed from controller
    this.angle = controller.getAngle();
    this.speed = controller.getSpeed();
    
    // Recalculate x and y coordinates
    this.x += controller.getDeltaX();
    this.y += controller.getDeltaY();
};