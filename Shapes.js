/*
 * These are some misc. functions relating to geometry and collision detection.
*/

/*
 * This class represents a point in 2D space.
*/
function Point(_x, _y) {
    this.x = _x;
    this.y = _y;
}

/*
 * This class represents a vector in 2D space.
*/
function Vector(_direction, _magnitude) {
    this.direction = _direction;
    this.magnitude = _magnitude;
}