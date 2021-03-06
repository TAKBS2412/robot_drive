/*
* This is a class that represents a generalized Joystick.
*/

// Creates a Joystick instance from a default HTML5 Gamepad object and settings.
function Joystick(_stick, _settings) {
    this.stick = _stick;
    this.settings = _settings;
}

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
    if(this.settings.driving_mode === "Joystick") {
        return this.stick.axes[5]; // Twist.
    } else if(this.settings.driving_mode === "Gamepad") {
        return this.stick.axes[0];
    } else if(this.settings.driving_mode === "Airplane") {
        return this.stick.axes[0]; // Side to side.
    }
};

// Gets the value of the Joystick's y axis.
Joystick.prototype.getY = function() {
    if(this.settings.driving_mode === "Joystick") {
        return this.stick.axes[1];
    } else if(this.settings.driving_mode === "Gamepad") {
        return this.stick.axes[3];
    } else if(this.settings.driving_mode === "Airplane") {
        return this.stick.axes[1];
    }
};

// Returns whether at least one button on this joysstick is pressed.
Joystick.prototype.buttonPressed = function() {
    for(var i = 0; i < this.stick.buttons.length; i++) {
        if(this.getRawButton(i).pressed) return true;
    }
    return false;
};

// Returns whether the up button was pressed.
Joystick.prototype.upButtonPressed = function() {
    if(this.settings.driving_mode === "Joystick") {
        return this.getRawButton(1).pressed;
    } else if(this.settings.driving_mode === "Gamepad") {
        return this.getRawButton(4).pressed;
    } else if(this.settings.driving_mode === "Airplane") {
        return this.getRawButton(4).pressed;
    }
};

// Returns whether the down button was pressed.
Joystick.prototype.downButtonPressed = function() {
    if(this.settings.driving_mode === "Joystick") {
        return this.getRawButton(2).pressed;
    } else if(this.settings.driving_mode === "Gamepad") {
        return this.getRawButton(6).pressed;
    } else if(this.settings.driving_mode === "Airplane") {
        return this.getRawButton(6).pressed;
    }
};

// Returns whether the open button was pressed.
Joystick.prototype.openButtonPressed = function() {
    if(this.settings.driving_mode === "Joystick") {
        return this.getRawButton(3).pressed;
    } else if(this.settings.driving_mode === "Gamepad") {
        return this.getRawButton(5).pressed;
    } else if(this.settings.driving_mode === "Airplane") {
        return this.getRawButton(5).pressed;
    }
};

// Returns whether the close button was pressed.
Joystick.prototype.closeButtonPressed = function() {
    if(this.settings.driving_mode === "Joystick") {
        return this.getRawButton(4).pressed;
    } else if(this.settings.driving_mode === "Gamepad") {
        return this.getRawButton(7).pressed;
    } else if(this.settings.driving_mode === "Airplane") {
        return this.getRawButton(7).pressed;
    }
};