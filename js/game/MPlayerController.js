/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var MPlayerController = MPlayerController || {};

//--------------------------------------------------------------------------------------------------------
// MPlayerController
//--------------------------------------------------------------------------------------------------------
MPlayerController.create = function(world, ship) {
    var module = Module.create(world);
    module.ship = ship;

    // Init
    module.init = function() {
        this.ship = this.world.map.ship;
        
    }

    // Event
    module.event = function(event) {
        switch (event.type) {
            case 'UP':     this.ship.move.up    = event.press; break;
            case 'DOWN':   this.ship.move.down  = event.press; break;
            case 'LEFT':   this.ship.move.left  = event.press; break;
            case 'RIGHT':  this.ship.move.right = event.press; break;
            case 'FIRE1':  this.ship.move.fire1 = event.press; break;
            case 'FIRE2':  this.ship.move.fire2 = event.press; break;
            case 'FIRE3':  this.ship.move.fire3 = event.press; break;
        }
    }

    return module;
}
