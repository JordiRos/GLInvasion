/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var EntityOverlaySprite = EntityOverlaySprite || {};

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
EntityOverlaySprite.create = function(world, name, params) {
    var entity = Entity.create(world, name, 'OVERLAYSPRITE', params);
    entity.sprite = Sprite.create(world, params.sprite);
    entity.sprite.overlay = true;
    entity.position.x = params.position.x;
    entity.position.y = params.position.y;

    // Init
    entity.init = function() {
        this.reset();
    }

    // Reset
    entity.reset = function() {
        this.show(0, true);
        this.sprite.playSeq(0, 'Main');
    }

    // Update
    entity.update = function(time, delta) {
        this.sprite.update(time, delta);
        this.fade  = MTime01(time, this.timeVisible, 0.25);
        this.flash = MTime010(time, this.timeVisible, 0.25);
    }
    
    // Render
    entity.render = function(fade) {
        //this.sprite.render(this.position, this.scale, 0, 1, 0);
        if (this.visible)
            this.sprite.render(this.position, this.scale, 0, fade, 0);
        else {
            this.sprite.render(this.position, this.scale, 0, fade * (1-this.fade), fade * this.flash);
            this.sprite.render(this.position, this.scale, 0, 0, fade * this.flash);
        }
    }
    
    return entity;
}
