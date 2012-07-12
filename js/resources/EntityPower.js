/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var EntityPower = EntityPower || {};

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
EntityPower.create = function(world, name, params) {
    var entity = Entity.create(world, name, 'POWER', params);
    entity.sprite = Sprite.create(world, params.sprite);
    entity.type = params.type;
    entity.shape = Shape.create();
    entity.circle1 = entity.shape.add(ShapeCircle.create(params.radius));
    
    // Update
    entity.update = function(time, delta) {
        // Initial scale
        if ((time - this.time) < 0.10) {
            var t = MTime01(time, this.time, 0.10);
            var s = Lerp(t, 0.5, 1);
            this.scale.set(s, s);
            entity.circle1.radius = this.params.radius * s;
        }
        
        // Update
        switch (this.params)
        {
            case Powers.PowerUp:
            case Powers.ShockUp:
                // Move around screen
                this.location.x = this.source.x + MSin((time - this.time) * 2, -120,120);
                this.location.y = this.location.y + this.dir * 100 * delta;
                break;
            case Powers.StarL:
                break;
            case Powers.StarH:
                // Get close to player
                var ship = this.world.map.ship;
                if (ship.alive) {
                    var d = DistanceVector2(this.position.x - this.world.map.ship.position.x, this.position.y - this.world.map.ship.position.y);
                    if (d < STAR_RADIUS) {
                        var f = -STAR_SPEED / d;
                        this.speed.x = (this.position.x - ship.position.x) * f;
                        this.speed.y = (this.position.y - ship.position.y) * f;
                    } else {
                        this.speed.x*= STAR_BREAK;
                        if (this.speed.x > FLYING_STAR_SPEED)
                            this.speed.y -= 500 * delta;
                        else
                            this.speed.y = FLYING_STAR_SPEED;
                    }
                }
                break;                
        }
        
        // Update
        this.onUpdate(time, delta);
        this.circle1.position.set(this.position.x, this.position.y);
        this.sprite.update(time, delta);
        this.flash = 1-MTime01(time, this.timeFlash, FRAME*5);
        // Die
        if (!this.dead) {
            //if (time - this.time < 15) {
            if (1) {
                if (this.dir > 0 && this.position.y > 560)
                    this.dir =-1;
                if (this.dir < 0 && this.position.y < 40)
                    this.dir = 1;
            }
            this.dead = !this.world.map.entityVisible(this) || (this.flash == 0 && !this.active);
        }
    }
    
    // Render
    entity.render = function(fade) {
        this.sprite.render(this.position, this.scale, this.rotation, fade * (this.active ? 1 : this.flash), fade * this.flash);
    }

    // Shoot
    entity.show = function(time, position) {
        this.time = time;
        this.timeFlash = 0;
        this.active = true;
        this.dir = -1;
        this.source = { x: position.x - (this.params.linkmap ? this.world.map.position.x : 0), y: position.y - (this.params.linkmap ? this.world.map.position.y : 0)};
        this.location.copy(this.source);
        // Sequence
        this.sprite.playSeq(time, 'Main', this.params.seqlen, -1);
        this.size.copy(this.sprite.seq.size);
        this.center.copy(this.sprite.seq.center);
        this.update(time, 0);
    }

    // Get
    entity.get = function(time, player) {
        this.timeFlash = time;
        this.active = false;
        switch (this.params)
        {
            // PowerUp
            case Powers.PowerUp:
                this.world.map.ship.power = Math.min(this.world.map.ship.power + 1, SHIP_MAX_POWER);
				this.world.map.ship.doFlash(time);
                break;
            // ShockUp
            case Powers.ShockUp:
                this.world.scores.addShock(time, player);
				this.world.map.ship.doFlash(time);
                break;
            // Stars
            case Powers.StarL:
            case Powers.StarH:
                var ent = this.world.extras.add(EntityPoints.create(this.world, '', { linkmap: false }));
                ent.show(time + 0.3, '' + this.params.score, this.position, { x: 0, y: -100 }, 0.3);
                // Add Score points
                this.world.scores.addScore(time, player, this.params.score);
                break;
        }
    }

    return entity;
}
