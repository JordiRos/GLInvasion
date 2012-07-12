/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var EntitySprite = EntitySprite || {};

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
EntitySprite.create = function(world, name, params) {
    var entity = Entity.create(world, name, 'SPRITE', params);
    entity.sprite = Sprite.create(world, params.sprite);
    
    // Update
    entity.update = function(time, delta) {
        if (!this.dead) {
            // Update
            this.onUpdate(time, delta);

            this.sprite.update(time, delta);
            if (!this.sprite.playing || this.position.y < (-this.sprite.seq.size.y))
                this.dead = true;
        }
    }
    
    // Render
    entity.render = function(fade) {
        this.sprite.render(this.position, this.scale, this.rotation, fade);
    }
    
    // Start sprite sequence
    entity.start = function(time, seq, position, scale, speed, rotation, rotspeed, len, loops) {
        this.location.copy(position);
        this.scale.copy(scale);
        this.speed.copy(speed);
        this.rotation = rotation;
        this.rotspeed = rotspeed;
        // Sequence
        this.sprite.playSeq(time, seq, len, loops);
        this.size.copy(this.sprite.seq.size);
        this.center.copy(this.sprite.seq.center);
        this.update(time, 0);
    }

    return entity;
}
