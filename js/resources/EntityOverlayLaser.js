/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var EntityOverlayLaser = EntityOverlayLaser || {};

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
EntityOverlayLaser.create = function(world, name, params) {
    var entity = Entity.create(world, name, 'OVERLAYLASER', params);
    entity.sprite1 = Sprite.create(world, params.sprite);
    entity.sprite2 = Sprite.create(world, params.sprite);
    entity.sprite1.overlay = true;
    entity.sprite2.overlay = true;
    entity.position.x = params.position.x;
    entity.position.y = params.position.y;

    // Init
    entity.init = function() {
        this.realw = this.sprite2.sprite.getSeq('Barra').size.x;
        this.reset();
    }

    // Reset
    entity.reset = function() {
        this.show(0, true);
        this.timeflash = 0;
        this.size = 1;
        this.sprite1.playSeq(0, 'Fondo');
        this.sprite2.playSeq(0, 'Barra');
        this.visible = this.params.hidden ? false : true;
    }

    // Update
    entity.update = function(time, delta) {
        this.sprite1.update(time, delta);
        this.sprite2.update(time, delta);
        this.flash = MTime010(time, this.timeflash, 0.25);
        this.fade = this.visible ? MTime01(time, this.timeVisible, 0.5) : MTime10(time, this.timeVisible, 0.5);
    }
    
    // Render
    entity.render = function(fade) {
        var f = fade * this.fade;
        // Fondo
        this.sprite2.sprite.getFrame(0).w = 1;
        this.sprite2.sprite.getSeq('Fondo').size.x = this.realw * 1;
        this.sprite1.render(this.position, this.scale, 0, f, 0);
        // Barra
        this.sprite2.sprite.getFrame(1).w = this.size;
        this.sprite2.sprite.getSeq('Barra').size.x = this.realw * this.size;
        this.sprite2.render(this.position, this.scale, 0, f, f * this.flash);
    }

    // Use
    entity.setSize = function(time, size) {
        if (size != this.size && size == 1)
            this.timeflash = time;
        this.size = size;
    }

    return entity;
}
