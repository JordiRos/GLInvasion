/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var ShapePolygon = ShapePolygon || {};

//--------------------------------------------------------------------------------------------------------
// ShapePolygon
//--------------------------------------------------------------------------------------------------------
ShapePolygon.create = function(points) {
    var shape = { type: Shape.POLYGON, points: points };
    shape.position = new THREE.Vector2(0,0);
    
    // Calc max radius (optimization)
    shape.radius = 0;
    for (var i = 0; i < shape.points.length; i++) {
        var p = shape.points[i];
        shape.radius = Math.max(shape.radius, DistanceVector2(p.x, p.y));
    }
    
    // Point inside shape
    shape.isInside = function(point, radius) {
        if (radius === undefined) radius = 0;
        var d = DistanceVector2(point.x - this.position.x, point.y - this.position.y);
        // Inside radius?
        if (d < (this.radius + radius)) {
            // Check determinant is always negative or < radius
            for (var i = 0; i < this.points.length; i++) {
                var p0 = this.points[i];
                var p1 = (i < this.points.length-1) ? this.points[i+1] : this.points[0];
                var d = PointLineDistance(point.x, point.y, p0.x + this.position.x, p0.y + this.position.y, p1.x + this.position.x, p1.y + this.position.y);
                if (d > radius) return false;
            }
            return true;
        }
        return false;
    }
    
    return shape;
}
