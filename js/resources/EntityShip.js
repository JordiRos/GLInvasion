/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var EntityShip = EntityShip || {};

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
EntityShip.create = function(world, name, params) {
    var entity = Entity.create(world, name, 'SHIP', params);
    entity.sprite = Sprite.create(world, params.sprite);
    entity.index = params.index;
    entity.sprites = [ 4, 3, 0, 1, 2 ];

    // Load
    entity.load = function() {
        this.move = { };
        this.shape = Shape.create();
        this.circle1 = this.shape.add(ShapeCircle.create(4));
    }

    // Init
    entity.init = function() {
        this.reset();
    }
    
    // Reset
    entity.reset = function() {
        this.alive = true;
        this.timePlasma = 0;
        this.timeLaser = 0;
        this.timeShock = 0;
		this.timeFlash = -1;
        this.velocity = 0;
        this.velocityd = SHIP_VELOCITY;
        this.angleSprite = 0;
        this.power = Game.Easy ? 3 : 1;
        // Sequence
        this.sprite.setSeq('Main', true);
        this.location.set(0,50);
        this.size.copy(this.sprite.seq.size);
        this.center.copy(this.sprite.seq.center);
    }    

    // Update
    entity.update = function(time, delta) {
        if (this.alive) {
            // Position
            this.velocityd = SHIP_VELOCITY;
            // Move
            if (this.move.left)  { this.location.x = Math.max(-this.world.halfw + 25, this.location.x - this.velocity * delta); this.angleSprite = Math.max(-2, this.angleSprite - SHIP_ANGLE_SPEED * 2 * delta); }
            if (this.move.right) { this.location.x = Math.min( this.world.halfw - 25, this.location.x + this.velocity * delta); this.angleSprite = Math.min( 2, this.angleSprite + SHIP_ANGLE_SPEED * 2 * delta); }
            if (this.move.up)    { this.location.y = Math.min( this.world.h     - 35, this.location.y + this.velocity * delta); }
            if (this.move.down)  { this.location.y = Math.max( 0                + 35, this.location.y - this.velocity * delta); }
            // Fires
            if (this.move.fire3) { this.shoot(time, 'shock'); }
            if (this.move.fire2) { this.shoot(time, 'laser'); this.velocityd = SHIP_VELOCITY * 0.55; }
            else if (this.move.fire1) { this.shoot(time, 'plasma'); this.velocityd = SHIP_VELOCITY * 0.70; }
            this.velocity = Lerp(0.1, this.velocity, this.velocityd);
            // Update
            this.onUpdate(time, delta);

            // Recover Angle
            if (this.angleSprite > 0) this.angleSprite = Math.max(0, this.angleSprite - SHIP_ANGLE_SPEED * delta);
            if (this.angleSprite < 0) this.angleSprite = Math.min(0, this.angleSprite + SHIP_ANGLE_SPEED * delta);
            
            // Sprite based on angle + flare
            var base = Math.round(this.angleSprite+2) * 3;
            var len = FRAME3 * 2;
            var flare = (time % len) * 3 / len;
            this.sprite.setFrame(Math.floor(flare) + base);

            // Physics box
            this.circle1.position.set(this.position.x, this.position.y);
			// Flash
			this.flash = 1-MTime01(time, this.timeFlash, 0.25);
        }
    }
    
    // Render
    entity.render = function(fade) {
        if (this.alive)
            this.sprite.render(this.position, this.scale, this.rotation, fade, fade * this.flash);
    }

    // Hit
    entity.hit = function(time) {
        this.alive = false;
        Explosions.createCircle(this.world, time, this.location, VEC_ZERO, Explosions.SHIP);
    }
	
	entity.doFlash = function(time) {
		this.timeFlash = time;
	}
    
    // Shoot
    entity.shoot = function(time, weapon) {
        switch (weapon)
        {
            // Fire1: Plasma
            case 'plasma':
                if ((time - this.timePlasma) >= SHIP_DELAY_PLASMA) {
                    Sounds.Plasma.play(); 
                    switch (this.power) {
                        case 1:
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow1, this, time, { x: this.position.x - 10, y: this.position.y + 10 }, 1400, deg2rad(-4));
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow1, this, time, { x: this.position.x + 10, y: this.position.y + 10 }, 1400, deg2rad(+4));
                            break;
                        case 2:
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow2, this, time, { x: this.position.x - 10, y: this.position.y + 10 }, 1400, deg2rad(-4));
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow2, this, time, { x: this.position.x + 10, y: this.position.y + 10 }, 1400, deg2rad(+4));
                            break;
                        case 3:
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow2, this, time, { x: this.position.x - 10, y: this.position.y + 10 }, 1400, deg2rad(-4));
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow2, this, time, { x: this.position.x + 10, y: this.position.y + 10 }, 1400, deg2rad(+4));
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow1, this, time, { x: this.position.x - 25, y: this.position.y - 6 },  1400, deg2rad(-16));
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow1, this, time, { x: this.position.x + 25, y: this.position.y - 6 },  1400, deg2rad(+16));
                            break;
                        case 4:
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow3, this, time, { x: this.position.x - 10, y: this.position.y + 10 }, 1400, deg2rad(-4));
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow3, this, time, { x: this.position.x + 10, y: this.position.y + 10 }, 1400, deg2rad(+4));
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow1, this, time, { x: this.position.x - 25, y: this.position.y - 6 },  1400, deg2rad(-16));
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow1, this, time, { x: this.position.x + 25, y: this.position.y - 6 },  1400, deg2rad(+16));
                            break;
                        case 5:
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow3, this, time, { x: this.position.x - 10, y: this.position.y + 10 }, 1400, deg2rad(-4));
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow3, this, time, { x: this.position.x + 10, y: this.position.y + 10 }, 1400, deg2rad(+4));
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow3, this, time, { x: this.position.x - 25, y: this.position.y - 6 },  1400, deg2rad(-16));
                            Bullets.ShootPlayer(Bullets.PlayerBlueArrow3, this, time, { x: this.position.x + 25, y: this.position.y - 6 },  1400, deg2rad(+16));
                            break;
                    }
                    this.timePlasma = time;
                }
                break;
            // Fire2: Laser
            case 'laser':
                if ((time - this.timeLaser) >= SHIP_DELAY_LASER) {
                    if (this.world.scores.canLaser(this.index)) {
                        this.timeLaser = time;
                        this.world.scores.shootLaser(time, this.index);
                        switch (this.power) {
                            case 1:
                            case 2:
                                Bullets.ShootPlayer(Bullets.PlayerLaser1, this, time, { x: this.position.x + MRandom(-2,2), y: this.position.y +  0 + MRandom(-2,2) }, 1000, 0);
                                Bullets.ShootPlayer(Bullets.PlayerLaser1, this, time, { x: this.position.x + MRandom(-2,2), y: this.position.y + 16 + MRandom(-2,2) }, 1000, 0);
                                Bullets.ShootPlayer(Bullets.PlayerLaser1, this, time, { x: this.position.x + MRandom(-2,2), y: this.position.y + 32 + MRandom(-2,2) }, 1000, 0);
                                break;
                            case 3:
                            case 4:
                                Bullets.ShootPlayer(Bullets.PlayerLaser2, this, time, { x: this.position.x + MRandom(-2,2), y: this.position.y +  0 + MRandom(-2,2) }, 1000, 0);
                                Bullets.ShootPlayer(Bullets.PlayerLaser2, this, time, { x: this.position.x + MRandom(-2,2), y: this.position.y + 16 + MRandom(-2,2) }, 1000, 0);
                                Bullets.ShootPlayer(Bullets.PlayerLaser2, this, time, { x: this.position.x + MRandom(-2,2), y: this.position.y + 32 + MRandom(-2,2) }, 1000, 0);
                                break;
                            case 5:
                                Bullets.ShootPlayer(Bullets.PlayerLaser3, this, time, { x: this.position.x + MRandom(-2,2), y: this.position.y +  0 + MRandom(-2,2) }, 1000, 0);
                                Bullets.ShootPlayer(Bullets.PlayerLaser3, this, time, { x: this.position.x + MRandom(-2,2), y: this.position.y + 16 + MRandom(-2,2) }, 1000, 0);
                                Bullets.ShootPlayer(Bullets.PlayerLaser3, this, time, { x: this.position.x + MRandom(-2,2), y: this.position.y + 32 + MRandom(-2,2) }, 1000, 0);
                                break;
                        }
                    }
                }
                break;
            // Fire3: Shock
            case 'shock':
                if ((time - this.timeShock) >= SHIP_DELAY_SHOCK) {
                    this.world.scores.shootShock(time, 0);
                    this.timeShock = time;
                }
                break;
        }
    }

    return entity;
}