/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var ShapeCircle = ShapeCircle || {};

//--------------------------------------------------------------------------------------------------------
// ShapeCircle
//--------------------------------------------------------------------------------------------------------
ShapeCircle.create = function(radius) {
    var shape = { type: Shape.CIRCLE, radius: radius };
    shape.position = new THREE.Vector2(0,0);

    // Point inside shape
    shape.isInside = function(point, radius) {
        if (radius === undefined) radius = 0;
        var d = DistanceVector2(point.x - this.position.x, point.y - this.position.y);
        return (d < (this.radius - radius));
    }

    return shape;
}
