/*
* This file contains implementations of GameView, GameModel, and GameController, as well as instances of other classes.
*/

// Variable declarations.
var robotController;
var robotModel;
var robotView;

// To be called when the page is loaded.
window.onload = function() {
    /* A GameController implementation. */
    var stick = new Joystick(navigator.getGamepads()[0]);
    robotController = new GameController(stick);
    
    // Gets the angle from the joystick.
    robotController.getAngle = function() {
        var angle = stick.getX();
        if(Math.abs(angle) < 0.01) angle = 0;
        angle *= 0.05;
        console.log(angle);
        return angle;
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
    
    robotModel = new GameModel(0, 0); //Create new GameModel instance.
    
    // An implementation of GameModel's update() function.
    // Assumes that controller is a GameController object (see GameController.js) with the methods shown above implemented.
    robotModel.update = function(controller) {
        // Find angle and speed from controller
        this.angle += controller.getAngle();
        this.speed = -controller.getSpeed();
        
        // Recalculate x and y coordinates
        this.x += (controller.getDeltaX() | 0);
        this.y += (controller.getDeltaY() | 0);
    };
    
    
    /* A GameView implementation. */
    var canvas = document.getElementById("field");
    robotView = new GameView(canvas);
    
    // An implementation of GameView's update() function.
    // Assumes that model is a GameModel object (see GameModel.js) with the methods shown above implemented.
    robotView.update = function(model) {
        // Original rectangle points.
        var origPoints = [
            [-25, -20],
            [25, -20],
            [25, 20],
            [-25, 20]
        ];
        
        // Find new model location.
        model.x = model.x + Math.cos(model.angle) * model.speed;
        model.y = model.y + Math.sin(model.angle) * model.speed;
        
        // Translate and rotate points.
        for(var i = 0; i < origPoints.length; i++) {
            origPoints[i] = [origPoints[i][0] + model.x, origPoints[i][1] + model.y];
            origPoints[i] = this.rotatePoint(origPoints[i], model.angle, [model.x, model.y]);
        }
        this.ctx.beginPath();
        this.ctx.moveTo(origPoints[0][0], origPoints[0][1]);
        for(var i = 1; i < origPoints.length; i++) {
            var curPoint = origPoints[i];
            this.ctx.lineTo(curPoint[0], curPoint[1]);
        }
        this.ctx.lineTo(origPoints[0][0], origPoints[0][1]); // Move back to the original point.
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
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
    
    var robotObject = new GameObject(robotModel, robotView, robotController); // Create robot.
    
    // This function is called periodically by window.requestAnimationFrame().
    function update(timestamp) {
        // Clear the canvas for redrawing.
        robotView.ctx.clearRect(0, 0, robotView.canvas.width, robotView.canvas.height);
        
        // Retrieve updated joystick instance and set it.
        var stick = new Joystick(navigator.getGamepads()[0]);
        robotController.input = stick;
        
        // Update robotObject.
        robotObject.update();
        
        // Recursively call update().
        window.requestAnimationFrame(update);
    }
    window.requestAnimationFrame(update);
};