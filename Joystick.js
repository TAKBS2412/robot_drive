/*
* This is a class that represents a generalized Joystick.
*/

// Creates a Joystick instance from a default HTML5 Gamepad object.
function Joystick(_stick) {
    this.stick = _stick;
};

// Gets a GamepadButton instance that represents the Joystick's button at the specified instance.
Joystick.prototype.getRawButton = function(index) {
    return this.stick.buttons[index];
};

