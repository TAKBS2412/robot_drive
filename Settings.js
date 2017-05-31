/*
* This class contains settings that will be read from the settings div (see Drive.html).
*/

// Creates a settings instance from a div that contains the settings elements.
function Settings(_div) {
    // Set the div.
    this.div = _div;
    
    // The index of the gamepad that the user is using.
    this.gamepad_index = -1;
    
    // The driving mode that the user is using.
    this.driving_mode = "Joystick";
}

// Updates the settings div.
Settings.prototype.update = function(gamepads) {
    this.updateControllers(gamepads); // Update controller settings.
    
};

// Updates the controller settings based on the gamepads from navigator.getGamepads().
Settings.prototype.updateControllers = function(gamepads) {
    var controllers = document.getElementById("controllers");
    var numactivecontrollers = 0;
    for(var i = 0; i < gamepads.length; i++) {
        var row = document.getElementById(i.toString(10));
        if(!gamepads[i]) { // This gamepad is null, delete its row.
            if(row) { // If a row exists, delete it.
                controllers.deleteRow(i);
            }
            continue;
        }
        var cell;
        if(!row) { // Row not found, create a new one.
            var row = controllers.insertRow(numactivecontrollers);
            cell = row.insertCell(0);
            cell.id = i.toString(10);
            cell.addEventListener("click", function(e) {
                settings.gamepad_index = +this.id;
            });
        } else {
            cell = document.getElementById(i.toString());
        }
        cell.innerHTML = gamepads[i].id;
        var stick = new Joystick(gamepads[i]);
        if(i === settings.gamepad_index) { // If this is the gamepad currently being used.
            cell.style.textDecoration = "underline";
        } else {
            cell.style.textDecoration = "none";
        }
        if(stick.buttonPressed()) {
           cell.style.background = "red";
           cell.style.color = "black";
        } else {
           cell.style.background = "black";
           cell.style.color = "red";
        }
        numactivecontrollers++;
    }
};

// Updates the drivingmode settings based on which radio button was clicked.
// This function is called when one of the radio buttons has been clicked.
Settings.prototype.updateDrivingMode = function(buttonPressed) {
    this.driving_mode = buttonPressed.value;
    robotModel.resetPositionIfNeeded(defaultPosition[0], defaultPosition[1], -Math.PI/2, 0);
};