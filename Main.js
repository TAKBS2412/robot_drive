/*
* This file contains implementations of GameView, GameModel, and GameController, as well as instances of other classes.
*/

// To be called when the page is loaded.
window.onload = function() {
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
    
    
    /* A GameView implementation. */
    var canvas = document.getElementById("field");
    var robotView = new GameView(canvas);
    
    // An implementation of GameView's update() function.
    // Assumes that model is a GameModel object (see GameModel.js) with the methods shown above implemented.
    robotView.update = function(model) {
        // Original rectangle points.
        var origPoints = [
            [0, 0],
            [50, 0],
            [50, 50],
            [0, 50]
        ];
        
        // Translate and rotate points.
        for(var i = 0; i < origPoints.length; i++) {
            var curPoint = origPoints[i];
            curPoint = [curPoint[0] + model.x, curPoint[1] + model.y];
            curPoint = this.rotatePoint(curPoint, this.angle, [model.x, model.y]);
        }
        
        this.ctx.beginPath();
        this.ctx.moveTo(origPoints[0], origPoints[1]);
        for(var i = 1; i < origPoints.length; i++) {
            var curPoint = origPoints[i];
            this.ctx.lineTo(curPoint[0], curPoint[1]);
        }
        
        this.ctx.lineWidth = 5;
        this.strokeStyle = "black";
        this.stroke();
    };
    
    // Rotates the point point by the angle angle around the center center.
    // Returns the rotated point.
    robotView.rotatePoint = function(point, angle, center) {
        var deltaX = point[0] - center[0];
        var deltaY = point[1] - center[1];
        
        // Find angle between point and center.
        var theta = Math.atan2(deltaY, deltaX);
        
        // Find distance between point and center.
        var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        
        var newtheta = theta + angle;
        
        // Find the new x and y coordinates of the rotated rectangle.
        var newx = center[0] + Math.cos(newtheta) * distance;
        var newy = center[1] + Math.sin(newtheta) * distance;
        
        return [newx, newy];
    };
};