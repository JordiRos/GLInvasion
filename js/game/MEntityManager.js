/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var MEntityManager = MEntityManager || {};

//--------------------------------------------------------------------------------------------------------
// MEntityManager
//--------------------------------------------------------------------------------------------------------
MEntityManager.create = function(world, params) {
    var module = Module.create(world);
    module.params = params;
    module.entities = [];
    module._isDead = function(entity) { return entity.dead; };
    module.count = function() { return this.entities.length; }

    // Init
    module.init = function() {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].init();
        }
    }

    // Reset
    module.reset = function() {
        if (this.params.resetClear) {
            this.clear();
        }
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].reset();
        }
        // Remove dead entities
        DeleteArray(this.entities, this._isDead);
    }
    
    // Update
    module.update = function(time, delta) {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update(time, delta);
        }
        // Remove dead entities
        DeleteArray(this.entities, this._isDead);
    }

    // Render
    module.render = function(fade) {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].render(fade);
        }
    }

    // Clear
    module.clear = function() {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i] = null;
        }
        this.entities.length = 0;
    }

    // Destroy
    module.destroy = function() {
        this.clear();
        this.entities = null;
    }

    // Add module
    module.add = function(entity) {
        this.entities.push(entity);
        return entity;
    }

    return module;
}
