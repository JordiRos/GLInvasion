/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Module = Module || {};

//--------------------------------------------------------------------------------------------------------
// Module
//--------------------------------------------------------------------------------------------------------
Module.create = function(world) {
    var module = { world: world };
    
    // Virtuals
    module.load    = function() {};
    module.init    = function() {};
    module.reset   = function() {};
    module.update  = function() {};
    module.render  = function() {};
    module.destroy = function() {};

    return module;
}
