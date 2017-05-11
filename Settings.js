/*
* This class contains settings that will be read from the settings div (see Drive.html).
*/

// Creates a settings instance from a div that contains the settings elements.
function Settings(_div) {
    // Set the div.
    this.div = _div;
    
    // The last table of gamepads.
    this.last_table = document.getElementById("controllers");
}

// Updates the settings div based on the gamepads from navigator.getGamepads().
Settings.prototype.update = function(gamepads) {
    var controllers = document.createElement("table");
    this.div.replaceChild(controllers, this.last_table);
    for(var i = 0; i < gamepads.length; i++) {
        if(!gamepads[i]) continue; // Skip any null gamepads
        var row = controllers.insertRow(i);
        var cell = row.insertCell(0);
        cell.innerHTML = gamepads[i].id;
        var stick = new Joystick(gamepads[i]);
        cell.style.backgroundColor = stick.buttonPressed() ? "red" : "white";
    }
    this.last_table = controllers;
};