/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var EntityEnemyTank = EntityEnemyTank || {};

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
EntityEnemyTank.create = function(world, name, params) {
    params.linkmap = params.enemy.linkmap;
    var entity = Entity.create(world, name, 'ENEMYSTANDARD', params);
    entity.sprite = Sprite.create(world, params.enemy.sprBase)
	entity.sprTower = Sprite.create(world, params.enemy.sprTower)

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
		this.sprTower.setSeq('Main', true);
        this.size.copy(this.sprite.seq.size);
        this.center.copy(this.sprite.seq.center);
		this.posTower = { x: 0, y: 0 };
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
			this.location.copy(this.params.position);
			// Die
			if (t > 3 && !this.world.map.entityVisible(this)) {
				this.state = EnemyState.HIDDEN;
			}
			// Actions
			if (this.params.actions)
				Actions.parse(this, time - this.timeActive, this.timeActive, this.params.actions.offset, this.params.actions.actions);
        }

        // Update
        this.onUpdate(time, delta);
        this.collision.position.set(this.position.x, this.position.y);

		// Tower
		var tx = this.world.map.ship.position.x - this.position.x;
		var ty = this.world.map.ship.position.y - this.position.y;
		var angle = AngleFromVector(tx, ty);
		this.sprTower.frame = Math.floor((8.5 + 8 * angle / 360.0) % 8);
		this.posTower.x = this.position.x + this.params.enemy.offsetTower.x;
		this.posTower.y = this.position.y + this.params.enemy.offsetTower.y;
					
        // Sprite
        this.flash = (EnemyState.ACTIVE || this.state == EnemyState.DEAD) ? (1-MTime01(time, this.timeFlash, TIME_FLASH_ENEMY)) : 0;
        this.sprite.update(time, delta);
		this.sprTower.update(time, delta);
    }
    
    // Render
    entity.render = function(fade) {
        var f = (this.state == EnemyState.ACTIVE || MODE_EDITOR) ? 1 : this.flash;
        this.sprite.render(this.position, this.scale, this.rotation, fade * f, fade * this.flash);
		this.sprTower.render(this.posTower, this.scale, this.rotation, fade * f, fade * this.flash);
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
    entity.bulletOffset = function(offset) {
		var v = RotateVector2(offset, deg2rad(-this.sprTower.frame * 360 / 8));
		v.x += this.params.enemy.offsetTower.x;
		v.y += this.params.enemy.offsetTower.y;
		return v;
    }

    return entity;
}
