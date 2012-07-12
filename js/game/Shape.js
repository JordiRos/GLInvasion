/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Shape = Shape || { CIRCLE: 0, POLYGON: 1 };

//--------------------------------------------------------------------------------------------------------
// Shape
//--------------------------------------------------------------------------------------------------------
Shape.create = function() {
    var shape = { };
    shape.shapes = [];

    // Point inside shape
    shape.add = function(shape) {
        this.shapes.push(shape);
        return shape;
    }

    return shape;
}

// Check collisions
Shape.collide = function(shape, other) {
    for (var i = 0; i < shape.shapes.length; i++) {
        for (var j = 0; j < other.shapes.length; j++) {
            if (Shape.collideShape(shape.shapes[i], other.shapes[i]))
                return other.shapes[i];
        }
    }
    return false;
}
    
// Check shape collide
Shape.collideShape = function(shape, other) {
    switch (shape.type) {
        // CIRCLE
        case Shape.CIRCLE:
            switch (other.type) {
                case Shape.CIRCLE:  return this.collide_Circle_Circle(shape, other);
                case Shape.POLYGON: return this.collide_Circle_Polygon(shape, other);
            }
            break;
        // POLYGON
        case Shape.POLYGON:
            switch (other.type) {
                case Shape.CIRCLE:  return this.collide_Circle_Polygon(other, shape);
                case Shape.POLYGON: return this.collide_Polygon_Polygon(other, shape);
            }
            break;
    }
}

// Collide: circle / circle
Shape.collide_Circle_Circle = function(shape, other) {
    var d = DistanceVector2(shape.position.x - other.position.x, shape.position.y - other.position.y);
    return (d < (shape.radius + other.radius));
}

// Collide: circle / polygon
Shape.collide_Circle_Polygon = function(shape, other) {
    return other.isInside(shape.position, shape.radius);
}

// Collide: polygon / polygon
Shape.collide_Polygon_Polygon = function(shape, other) {
    var d = DistanceVector2(shape.position.x - other.position.x, shape.position.y - other.position.y);
    if (d < (shape.radius + other.radius)) {
        // Other inside shape
        for (var i = 0; i < other.points.length; i++) {
            if (shape.isInside({ x: other.points[i].x + other.position.x, y: other.points[i].y + other.position.y }))
                return true;
        }
        // Shape inside other
        for (var i = 0; i < shape.points.length; i++) {
            if (other.isInside({ x: shape.points[i].x + shape.position.x, y: shape.points[i].y + shape.position.y }))
                return true;
        }
    }
    return false;
}
