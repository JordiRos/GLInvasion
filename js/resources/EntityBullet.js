/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var EntityBullet = EntityBullet || {};

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
EntityBullet.create = function(world, name, owner, params) {
    var entity = Entity.create(world, name, 'BULLET', params);
    entity.sprite = Sprite.create(world, params.sprite);
    entity.type = params.type;
    entity.damage = params.damage;
    entity.player = owner.index;
    entity.enemy = owner;
    entity.shape = Shape.create();
    switch (params.collision.type) {
        case ShapeCircle:  entity.collision = entity.shape.add(ShapeCircle.create (params.collision.radius)); break;
        case ShapePolygon: entity.collision = entity.shape.add(ShapePolygon.create(params.collision.points)); break;
    }    
    
    // Update
    entity.update = function(time, delta) {
        // Initial scale
        var s = 1;
        if ((time - this.time) < 0.10) {
            var t = MTime01(time, this.time, 0.10);
            s = Lerp(t, 0.5, 1);
        }
        this.scale.set(s, 1);
        // Speed
        if (this.params.speedlen && this.params.speedscale) {
            var t = MTime01(time, this.time, this.params.speedlen);
            var f = Lerp(t, 1,this.params.speedscale);
            this.speed.x = f * this.speedorig.x;
            this.speed.y = f * this.speedorig.y;
        }
        // Update
        this.onUpdate(time, delta);
        this.collision.position.set(this.position.x, this.position.y);
        this.sprite.update(time, delta);
        this.dead = this.dead || !this.world.map.entityVisible(this);
    }
    
    // Render
    entity.render = function(fade) {
        this.sprite.render(this.position, this.scale, this.rotation, fade);
    }

    // Shoot
    entity.shoot = function(time, position, speed, rotation, rotspeed) {
        this.time = time;
        this.location.copy(position);
        this.speed.copy(speed);
        this.speedorig = { x: speed.x, y: speed.y };
        this.rotation = rotation;
        this.rotspeed = rotspeed;
        // Sequence
        this.sprite.playSeq(time, 'Main', this.params.seqlen, 0);
        this.size.copy(this.sprite. seq.size);
        this.center.copy(this.sprite.seq.center);
        this.update(time, 0);
    }
    
    // Die
    entity.die = function(time) {
        this.dead = true;
        var ent = this.world.extras.add(EntitySprite.create(this.world, '', { sprite: Sprites.Bullet_Destroy, linkmap: false }));
        ent.start(time, 'Main', this.position, VEC_ONE, VEC_ZERO, MRandom(0,360),8, FRAME5*6, 1);
        ent.sprite.blending = THREE.AdditiveBlending;
    }

    return entity;
}
