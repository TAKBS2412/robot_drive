/*
* This is a class that represents a generalized GameObject (an object in the game/2D space).
* The GameObject contains:
* - An instance of a GameModel object, which represents the location of the object and contains other attributes such as color, size, etc.
* - An instance of a GameView object, which takes a GameModel instance and renders it on the screen.
* - An instance of a GameController object, which takes a GameModel instance and an input object (the type of which depends on the GameController) and modifies the GameModel instance accordingly.
*/

// Creates a GameObject instance.
function GameObject(_model, _view, _controller) {
    this.model = _model;
    this.view = _view;
    this.controller = _controller;
}

// Updates GameModel and GameView when appropriate.
// This function is (indirectly) called periodically by requestAnimationFrame().
GameObject.prototype.update = function() {
    // Update GameModel based on GameController.
    this.model.update(this.controller);
    // Update GameView based on GameModel.
    this.view.update(this.model);
};