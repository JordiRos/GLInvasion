/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var ModuleManager = ModuleManager || {};

//--------------------------------------------------------------------------------------------------------
// ModuleManager
//--------------------------------------------------------------------------------------------------------
ModuleManager.create = function(world) {
    var manager = { world: world };
    manager.modules = [];

    // Load
    manager.load = function() {
        for (var i = 0; i < this.modules.length; i++) {
            this.modules[i].load();
        }    
    }    

    // Init
    manager.init = function() {
        for (var i = 0; i < this.modules.length; i++) {
            this.modules[i].init();
        }    
    }    

    // Reset
    manager.reset = function() {
        for (var i = 0; i < this.modules.length; i++) {
            this.modules[i].reset();
        }
    }
    
    // Update
    manager.update = function(time, delta) {
        for (var i = 0; i < this.modules.length; i++) {
            this.modules[i].update(time, delta);
        }
    }

    // Render
    manager.render = function(fade) {
        for (var i = 0; i < this.modules.length; i++) {
            this.modules[i].render(fade);
        }
    }

    // Destroy
    manager.destroy = function() {
        for (var i = 0; i < this.modules.length; i++) {
            this.modules[i].destroy();
            this.modules[i] = null;
        }
        this.modules = null;
    }

    // Add module
    manager.add = function(module) {
        this.modules.push(module);
        return module;
    }
    
    return manager;
}
