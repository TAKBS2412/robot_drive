/*
* This is a class that represents a generalized Joystick.
*/

// Creates a Joystick instance from a default HTML5 Gamepad object.
function Joystick(_stick) {
    this.stick = _stick;
};

// Gets a GamepadButton instance that represents the Joystick's button at the specified index.
Joystick.prototype.getRawButton = function(index) {
    return this.stick.buttons[index];
};

// Gets the value of the axes at the specified index.
Joystick.prototype.getRawAxis = function(index) {
    return this.stick.axes[index];
};

// Gets the value of the Joystick's x axis.
Joystick.prototype.getX = function() {
    return this.stick.axes[0];
};

// Gets the value of the Joystick's y axis.
Joystick.prototype.getY = function() {
    return this.stick.axes[1];
};

// Returns whether at least one button on this joysstick is pressed.
Joystick.prototype.buttonPressed = function() {
    for(var i = 0; i < this.stick.buttons.length; i++) {
        if(this.getRawButton(i).pressed) return true;
    }
    return false;
};