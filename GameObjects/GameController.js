/*
* This is a class that is used to provide input (such as from a Joystick) to the GameObject.
*/

// Creates a GameController instance from an input object (the type of which depends on the GameController).
function GameController(_input) {
    this.input = _input;
}