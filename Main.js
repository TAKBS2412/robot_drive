/*
* This file contains implementations of GameView, GameModel, and GameController, as well as instances of other classes.
*/

// Variable declarations.
var robotController;
var robotModel;
var robotView;
var settings;
var defaultPosition; // The [x, y] values that the robot starts at.

// To be called when the page is loaded.
window.onload = function() {
    settings = new Settings(document.getElementById("settings"));
    
    // Make sure that Settings.updateDrivingMode() is called when a radio button is clicked.
    var buttons = document.getElementsByTagName("input");
    for(var i = 0; i < buttons.length; i++) {
    	var button = buttons[i];
    	buttons[i].onclick = function() {
    	    settings.updateDrivingMode(this);
    	};
    }

    /* A GameController implementation. */
    robotController = new GameController();
    
    // Gets the angle from the joystick.
    robotController.getAngle = function() {
        var angle = this.input.getX();
        if(Math.abs(angle) < 0.1) angle = 0;
        angle *= 0.07;
        return angle;
    };
    
    // Gets the speed from the joystick.
    robotController.getSpeed = function() {
        return 1.5 * this.input.getY();
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
    var canvas = document.getElementById("field");
    // Get half the width and half the height of the canvas.
    var widthhalf = canvas.width / 2;
    var heighthalf = canvas.height / 2;
    defaultPosition = [widthhalf, heighthalf];
    robotModel = new GameModel(widthhalf, heighthalf); // Create new GameModel instance.
    robotModel.armlength = 5; // Length of robot's arms.
    robotModel.armdistance = 30; //Distance between the robot's arms.
    
    // Resets x, y, angle, and speed to specified values if any of them are NaN.
    robotModel.resetPositionIfNeeded = function(newx, newy, newangle, newspeed) {
        this.x = (this.x || newx);
        this.y = (this.y || newy);
        this.angle = (this.angle || newangle);
        this.speed = (this.speed || newspeed);
    };
    
    // An implementation of GameModel's update() function.
    // Assumes that controller is a GameController object (see GameController.js) with the methods shown above implemented.
    robotModel.update = function(controller) {
        // Find angle and speed from controller
        this.angle += controller.getAngle();
        this.speed = -controller.getSpeed();
        
        // Recalculate x and y coordinates
        this.deltax = controller.getDeltaX(this.angle, this.speed);
        this.deltay = controller.getDeltaY(this.angle, this.speed);
        
        if(!this.deltax) {
        	this.deltax = 0;
        }
        
        if(!this.deltay) {
        	this.deltay = 0;
        }
        
        this.x += this.deltax;
        this.y += this.deltay;
        
        // Set armlength based on if up or down button is pressed.
        if(controller.input.upButtonPressed()) {
            this.armlength = 5;
        } else if(controller.input.downButtonPressed()) {
            this.armlength = 20;
        }
        
        // Set armdistance based on if open or closed button is pressed.
        if(controller.input.openButtonPressed()) {
            this.armdistance = 30;
        } else if(controller.input.closeButtonPressed()) {
            this.armdistance = 20;
        }
    };
    
    
    /* A GameView implementation. */
    robotView = new GameView(canvas);
    
    // An implementation of GameView's update() function.
    // Assumes that model is a GameModel object (see GameModel.js) with the methods shown above implemented.
    robotView.update = function(model) {
        // Original rectangle points.
        var origPoints = [
            // Beginning of robot.
            [-25, -20],
            [25, -20], 
            // First arm.
            [25, -model.armdistance/2],
            [25+model.armlength, -model.armdistance/2],
            [25, -model.armdistance/2],
            // Second arm.
            [25, model.armdistance/2],
            [25+model.armlength, model.armdistance/2],
            [25, model.armdistance/2],
            // Rest of robot.
            [25, 20],
            [-25, 20],
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
        this.ctx.strokeStyle = "red";
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
        
        var gamepads = navigator.getGamepads();
        
        if(settings.gamepad_index >= 0 && gamepads[settings.gamepad_index]) {
            // Retrieve updated joystick instance and set it.
            var stick = new Joystick(gamepads[settings.gamepad_index], settings);
            robotController.input = stick;

            // Update robotObject.
            robotObject.update();
        }
        
        // Update settings.
        settings.update(gamepads);
        
        // Recursively call update().
        window.requestAnimationFrame(update);
    }
    window.requestAnimationFrame(update);
};