/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Entity = Entity || {};

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
Entity.create = function(world, name, type, params) {
    var entity = { world: world, name: name, type: type, params: params };
    entity.location = new THREE.Vector2(0,0);
    entity.position = new THREE.Vector2(0,0);
    entity.scale = new THREE.Vector2(1,1);
    entity.size = new THREE.Vector2(0,0);
    entity.center = new THREE.Vector2(0,0);
    entity.speed = new THREE.Vector2(0,0);
    entity.rotation = 0;
    entity.rotspeed = 0;
    entity.dead = false;
	entity.visible = true;
    entity.timeVisible = 0;
    entity.linkmap = params.linkmap;
    
    // Functions
    entity.getMapOffsetX = function(x) { return x + (this.linkmap ? this.world.map.position.x : 0); };
    entity.getMapOffsetY = function(y) { return y + (this.linkmap ? this.world.map.position.y : 0); };
    entity.onUpdate = function(time, delta) {
        this.location.x += this.speed.x * delta;
        this.location.y += this.speed.y * delta;
        this.position.x = this.getMapOffsetX(this.location.x);
        this.position.y = this.getMapOffsetY(this.location.y);
        this.rotation += this.rotspeed * delta;
    }

    // Hide sprite
    entity.show = function(time, show) {
        this.timeVisible = time;
        this.visible = show;
    }

    return entity;
}
