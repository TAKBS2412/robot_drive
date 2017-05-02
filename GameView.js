/*
* This is a class that is used to display the GameObject.
*/

// Creates a GameView instance from a canvas.
function GameView(_canvas) {
    this.canvas = _canvas;
}

// This function updates the current GameView instance using GameModel.
// This is a default function, it may (and should) be overriden.
GameView.prototype.update = function(model) {
};