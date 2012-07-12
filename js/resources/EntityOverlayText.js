/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var EntityOverlayText = EntityOverlayText || {};

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
EntityOverlayText.create = function(world, name, params) {
    var entity = Entity.create(world, name, 'OVERLAYTEXT', params);
    entity.font = params.font;
    entity.position.x = params.position.x;
    entity.position.y = params.position.y;

    // Reset
    entity.reset = function() {
        this.text = '';
        this.textold = '';
        this.time = 0;
    }
    
    // Init
    entity.init = function() {
        this.reset();
    }
    
    // Update
    entity.update = function(time, delta) {
        this.fade = MTime01(time, this.time, 0.2);
    }
    
    // Render
    entity.render = function(fade ) {
        if (this.fade < 1)
            this.font.font.render(this.world.hud, this.textold, this.position.x,this.position.y, fade, fade * (1-this.fade));
        // Current
        var y = 10 * (1 - this.fade);
        this.font.font.render(this.world.hud, this.text, this.position.x,this.position.y + y, fade, fade * this.fade);
        if (this.fade < 1)
            this.font.font.render(this.world.hud, this.text, this.position.x,this.position.y, fade, fade * (1-this.fade), THREE.AdditiveBlending);
    }
    
    // Start sprite sequence
    entity.set = function(time, text) {
        if (text != this.text) {
            this.time = time;
            this.textold = this.text;
            this.text = text;
            this.update(time, 0);
        }
    }

    return entity;
}
