/*
* This class contains settings that will be read from the settings div (see Drive.html).
*/

// Creates a settings instance from a div that contains the settings elements.
function Settings(_div) {
    // Set the div.
    this.div = _div;
    
    // The index of the gamepad that the user is using.
    this.gamepad_index = -1;
}

// Updates the settings div based on the gamepads from navigator.getGamepads().
Settings.prototype.update = function(gamepads) {
    var controllers = document.getElementById("controllers");
    var gamepadcount = 0;
    for(var i = 0; i < gamepads.length; i++) {
        if(!gamepads[i]) continue; // Skip any null gamepads
        gamepadcount++;
        var cell;
        if(!document.getElementById(i.toString(10))) { // Row not found, create a new one.
            var row = controllers.insertRow(i);
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
        cell.style.backgroundColor = stick.buttonPressed() ? "red" : "white";
    }
    // Remove any rows representing gamepads that have been deleted.
    var row = document.getElementById(gamepadcount.toString(10));
    while(row) {
        controllers.deleteRow(gamepadcount);
        gamepadcount++;
        row = document.getElementById(gamepadcount.toString(10));
    }
};
