/*
* This is a class that models a GameObject in 2D space.
*/

// Creates a GameModel instance in 2D space.
function GameModel(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.speed = 0;
    this.angle = 0;
}

// This function updates the current GameModel instance using GameController.
// This is a default function, it may (and should) be overriden.
GameModel.prototype.update = function(controller) {
};