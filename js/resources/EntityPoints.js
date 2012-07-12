/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var EntityPoints = EntityPoints || {};

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
EntityPoints.create = function(world, name, params) {
    var entity = Entity.create(world, name, 'POINTS', params);
    
    // Update
    entity.update = function(time, delta) {
        this.fade = 0;
        if (!this.dead) {
            // Update
            this.onUpdate(time, delta);
            if (time - this.time > this.len)
                this.dead = true;
            this.fade = TWEEN.Ease(MTime01(time, this.time, this.len), 1,0, TWEEN.Func.Sine, TWEEN.Type.EaseOut);
        }
    }
    
    // Render
    entity.render = function(fade) {
        if (this.fade > 0) {
            var x = this.position.x + this.world.map.offset.x;
            var y = this.world.h - (this.position.y + this.world.map.offset.y);
            Fonts.ArcadePoints.font.render(this.world.hud, this.points, x,y, 1, fade * this.fade);
        }
    }
    
    // Start sprite sequence
    entity.show = function(time, points, position, speed, len) {
        this.time = time;
        this.points = points;
        this.len = len;
        this.location.copy(position);
        this.speed.copy(speed);
        // Sequence
        this.update(time, 0);
    }

    return entity;
}
