/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var EntityEnemyBoss = EntityEnemyBoss || {};

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
EntityEnemyBoss.create = function(world, name, params) {
    params.linkmap = params.enemy.linkmap;
    var entity = Entity.create(world, name, 'ENEMYBOSS', params);
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
        this.curActions = 0;
        this.timeActions = 0;
        this.timeEnabled = 0;
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
                this.timeActions = time + TIME_DELAY_BOSS;
                this.timeEnabled = time;
                this.sprite.playSeq(time, 'Main', this.params.enemy.seqlen, 0);
                Overlays.BossLife.entity.show(time, true);
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
                        // Target
                        this.location.x = p.x + MSin(t*1.2, -20,20) + MSin(t*1.1, -15,15);
                        this.location.y = p.y + MSin(t*1.3, -10,10);
                    } else {
                        // Die
                        this.state = EnemyState.HIDDEN;
                    }
                }
            }
            // Actions
            var actions = this.params.actions[this.curActions];
            if ((time - this.timeActions) > actions.timeLoop)
                this.timeActions = time;
            Actions.parse(this, time - this.timeActions, this.timeActions, actions.offset, actions.actions);
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
        // Ignore when change state
        if (time - this.timeEnabled < TIME_DELAY_BOSS) return;
        
        // Hit!
        this.life -= life;
        if (time - this.timeFlash > TIME_FLASH_ENEMY) this.timeFlash = time;
        Overlays.BossLife.entity.setSize(time, this.life / this.params.enemy.life);
        // Scores
        this.world.scores.addHit(time, player);
        // Actions
        var actions = this.params.actions[this.curActions];
        if (this.life < actions.life)
        {
            this.timeActions = time + TIME_DELAY_BOSS;
            this.timeEnabled = time;
            if (this.curActions < (this.params.actions.length-1))
                this.curActions++;
            // ExplosionTemp
            if (this.params.enemy.explosion)
                Explosions.createCircle(this.world, time, this.location, VEC_ZERO, this.params.enemy.explosionTemp);
        }
        // Destroy
        if (this.life <= 0) {
            Overlays.BossLife.entity.show(time, false);
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
            // Enviar al world
            this.world.setGameOver(time, true);
        }
    }

    // Shoot
    entity.shoot = function(time, type, target) {
    }


    return entity;
}
