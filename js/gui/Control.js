/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Control = Control || {};

//--------------------------------------------------------------------------------------------------------
// Constructor
//--------------------------------------------------------------------------------------------------------
Control.create = function(x, w, y, h) {
    var control = { x:x, y:y, w:w, h:h, };
    control.controls = [];

    // Virtuals
    control.update     = function() { };
    control.render     = function() { };
    control.keyPress   = function() { return false; }
    control.mousePress = function() { return false; }
    control.mouseMove  = function() { return false; }
    control.onShow     = function() { };
    control.onHide     = function() { };

    // AddChild
    control.addChild = function(control) {
        this.controls.push(control);
    }

    // updateChilds
    control.updateChilds = function(time, delta) {
        for (var i = 0; i < this.controls.length; i++) {
            var control = this.controls[i];
            control.update(time, delta);
        }
    }
    
    // renderChilds
    control.renderChilds = function(fade) {
        for (var i = 0; i < this.controls.length; i++) {
            var control = this.controls[i];
            control.render(fade);
        }
    }

    // eventChilds
    control.eventChilds = function(evt) {
        for (var i = 0; i < this.controls.length; i++) {
            var control = this.controls[i];
            control.event(evt);
        }
    }

    return control;
}
