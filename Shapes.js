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
 * This class represents a vector in 2D space (in component form).
 * The vector is represented in component form because we don't need angle and magnitude in this particular case (so that will save us a square root and arctangent call).
*/

// Creates a vector in component form from 2 points. 
function Vector(_point1, _point2) {
    this.deltax = _point2.x - _point1.x;
    this.deltay = _point2.y - _point1.y;
}

