/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var EntityEnemyStd = EntityEnemyStd || {};

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
EntityEnemyStd.create = function(world, name, params) {
    params.linkmap = params.enemy.linkmap;
    var entity = Entity.create(world, name, 'ENEMYSTANDARD', params);
    entity.sprite = Sprite.create(world, params.enemy.sprite)

    // Load
    entity.load = function() {
        this.shape = Shape.create();
        switch (this.params.enemy.collision.type) {
            case ShapeCircle:  this.collision = this.shape.add(ShapeCircle.create (this.params.enemy.collision.radius)); break;
            case ShapePolygon: this.collision = this.shape.add(ShapePolygon.create(this.params.enemy.collision.points)); break;
        }
    }

    // Init
    entity.init = function() {
        this.reset();
    }

    // Reset
    entity.reset = function() {
        this.frame = 0;
        this.life = this.params.enemy.life;
        this.state = EnemyState.WAITING;
        this.timeFlash = -1;
        if (this.params.position) {
            this.params.time = Math.max(0, (this.params.position.y - APP_H - 200) / -this.world.level.speed);
            this.location.copy(this.params.position);
        }
        // Sequence
        this.sprite.setSeq('Main', true);
        this.size.copy(this.sprite.seq.size);
        this.center.copy(this.sprite.seq.center);
    }

    // Update
    entity.update = function(time, delta) {
        if (this.state == EnemyState.WAITING) {
            // Time to active?
            if (time > this.params.time) {
                this.state = EnemyState.ACTIVE;
                this.timeActive = time;
                this.sprite.playSeq(time, 'Main', this.params.enemy.seqlen, 0);
            }
        }

        // Position
        if (this.state == EnemyState.ACTIVE) {
            var t = time - this.timeActive;
            if (this.params.path) {
                //----------------------------------------------------------------------------------------------------------------
                // Dynamic: PATH
                //----------------------------------------------------------------------------------------------------------------
                var len = Path.getLength(this.params.path);
                if (t >= 0) {
                    if (t < len) {
                        var p = Path.getPoint(this.params.path, t);
                        // Rotate target
                        this.location.x = p.x;
                        this.location.y = p.y;
                        this.target = { };
                        this.target.x = this.world.map.ship.position.x - this.location.x;
                        this.target.y = this.world.map.ship.position.y - this.location.y;
                        NormalizeVector2(this.target);
                        // Angle
                        this.rotation = deg2rad(AngleFromVector(-this.target.x, -this.target.y));
                    } else {
                        // Die
                        this.state = EnemyState.HIDDEN;
                    }
                }
            } else if (this.params.kamikaze) {
                //----------------------------------------------------------------------------------------------------------------
                // Dynamic: KAMIKAZE
                //----------------------------------------------------------------------------------------------------------------
                if (t == 0) {
                    // Set source
                    var randomx = this.params.kamikaze.random ? this.params.kamikaze.random.x : 0;
                    var randomy = this.params.kamikaze.random ? this.params.kamikaze.random.y : 0;
                    var randomt = this.params.kamikaze.random ? this.params.kamikaze.random.t : 0;
                    this.location.x = this.params.kamikaze.source.x + MRandom(-randomx, randomx);
                    this.location.y = this.params.kamikaze.source.y + MRandom(-randomy, randomy);
                    // Set target vector
                    if (this.params.kamikaze.target)
                        this.target = { x: this.params.kamikaze.target.x + MRandom(-randomt, randomt) - this.location.x, y: this.params.kamikaze.target.y - this.location.y };
                    else
                        this.target = { x: this.world.map.ship.position.x + MRandom(-randomt, randomt) - this.location.x, y: this.world.map.ship.position.y - this.location.y};
                    NormalizeVector2(this.target);
                }
                // Keep targeting ship (only going down)
                if (!this.params.kamikaze.target) {
                    var randomt = this.params.kamikaze.random ? this.params.kamikaze.random.t : 0;
                    this.target.x = Lerp(0.01 * delta, this.target.x, this.world.map.ship.position.x - this.location.x + MRandom(-randomt, randomt));
                    if (this.location.y > (this.world.map.ship.position.y+50))
                        this.target.y = Lerp(0.01 * delta, this.target.y, this.world.map.ship.position.y - this.location.y);
                    else
                        this.target.y = Lerp(0.01 * delta, this.target.y, -500);
                    NormalizeVector2(this.target);
                    // Angle
                    this.rotation = deg2rad(AngleFromVector(-this.target.x, -this.target.y));
                }
                // Advance
                var step = MTime01(t, 0, this.params.kamikaze.acceltime);
                var speed = Lerp(step, this.params.kamikaze.speedini, this.params.kamikaze.speedfin);
                this.speed.x = this.target.x * speed;
                this.speed.y = this.target.y * speed;
                // Die
                if (t > 3 && !this.world.map.entityVisible(this)) {
                    this.state = EnemyState.HIDDEN;
                }
            } else if (this.params.position) {
                //----------------------------------------------------------------------------------------------------------------
                // Static: POSITION
                //----------------------------------------------------------------------------------------------------------------
                this.location.copy(this.params.position);
                // Die
                if (t > 3 && !this.world.map.entityVisible(this)) {
                    this.state = EnemyState.HIDDEN;
                }
            }
            // Actions
            if (this.params.actions)
                Actions.parse(this, time - this.timeActive, this.timeActive, this.params.actions.offset, this.params.actions.actions);
        }

        // Update
        this.onUpdate(time, delta);
        this.collision.position.set(this.position.x, this.position.y);

        // Sprite
        this.flash = (EnemyState.ACTIVE || this.state == EnemyState.DEAD) ? (1-MTime01(time, this.timeFlash, TIME_FLASH_ENEMY)) : 0;
        this.sprite.update(time, delta);
    }

    // Render
    entity.render = function(fade) {
        var f = (this.state == EnemyState.ACTIVE || MODE_EDITOR) ? 1 : this.flash;
        this.sprite.render(this.position, this.scale, this.rotation, fade * f, fade * this.flash);
    }

    // Hit
    entity.hit = function(time, life, player) {
        this.life -= life;
        if (time - this.timeFlash > TIME_FLASH_ENEMY) this.timeFlash = time;
        // Scores
        this.world.scores.addHit(time, player);
        // Destroy
        if (this.life <= 0) {
            this.life = 0;
            this.state = EnemyState.DEAD;
            // Scores
            this.world.scores.addScore(time, player, this.params.enemy.score);
            // Explosion
            if (this.params.enemy.explosion)
                Explosions.createCircle(this.world, time, this.location, VEC_ZERO, this.params.enemy.explosion);
            // Decals
            if (this.params.enemy.decals)
                Decals.create(this.world, time, this.location, VEC_ZERO, this.params.enemy.decals);
            // Items
            if (this.params.item)
                this.params.item.item.show(this.world, time, this.position, this.params.item);
        }
    }

    // Shoot
    entity.shoot = function(time, type, target) {
    }

    return entity;
}
