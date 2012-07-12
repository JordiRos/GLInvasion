/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Bullets = {

    //-------------------------------------------------------------------------------------------------------------------
    // PLAYER
    //-------------------------------------------------------------------------------------------------------------------

    // PlayerBlueArrow1
    PlayerBlueArrow1: { sprite: Sprites.Bullet_BlueArrow1, linkmap: false, damage: 50, seqlen: FRAME3, collision: { type: ShapeCircle, radius: 8 } },
    PlayerBlueArrow2: { sprite: Sprites.Bullet_BlueArrow2, linkmap: false, damage: 60, seqlen: FRAME3, collision: { type: ShapeCircle, radius: 10} },
    PlayerBlueArrow3: { sprite: Sprites.Bullet_BlueArrow3, linkmap: false, damage: 70, seqlen: FRAME3, collision: { type: ShapeCircle, radius: 12} },
    // PlayerLaser
    PlayerLaser1: { sprite: Sprites.Bullet_Laser1, linkmap: false, damage: 30, seqlen: FRAME3 * 3, collision: { type: ShapePolygon, points: [ {x:-21,y: 13}, {x:21,y: 13}, {x:21,y:-13}, {x:-21,y:-13} ], }, },
    PlayerLaser2: { sprite: Sprites.Bullet_Laser2, linkmap: false, damage: 35, seqlen: FRAME3 * 3, collision: { type: ShapePolygon, points: [ {x:-27,y: 13}, {x:27,y: 13}, {x:27,y:-13}, {x:-27,y:-13} ], }, },
    PlayerLaser3: { sprite: Sprites.Bullet_Laser3, linkmap: false, damage: 40, seqlen: FRAME3 * 3, collision: { type: ShapePolygon, points: [ {x:-33,y: 13}, {x:33,y: 13}, {x:33,y:-13}, {x:-33,y:-13} ], }, },

    // ShootPlayer
    ShootPlayer: function(bullet, entity, time, position, speed, angle) {
        var ent = entity.world.bulletsP.add(EntityBullet.create(entity.world, '', entity, bullet));
        ent.shoot(time, position, VectorFromAngle(angle, speed), angle, 0);
    },

    //-------------------------------------------------------------------------------------------------------------------
    // ENEMIES
    //-------------------------------------------------------------------------------------------------------------------
    
    // PlasmaSma
    PlasmaOrngSma: { sprite: Sprites.Bullet_PlasmaOrngSma, linkmap: false, seqlen: FRAME3*5, speed: 650, speedscale: 0.7, speedlen: 4, collision: { type: ShapeCircle, radius: 7} },
    PlasmaPinkSma: { sprite: Sprites.Bullet_PlasmaPinkSma, linkmap: false, seqlen: FRAME3*5, speed: 600, speedscale: 0.7, speedlen: 4, collision: { type: ShapeCircle, radius: 7} },
    PlasmaBlueSma: { sprite: Sprites.Bullet_PlasmaBlueSma, linkmap: false, seqlen: FRAME3*5, speed: 550, speedscale: 0.7, speedlen: 4, collision: { type: ShapeCircle, radius: 7} },
    // PlasmaMed
    PlasmaOrngMed: { sprite: Sprites.Bullet_PlasmaOrngMed, linkmap: false, seqlen: FRAME3*5, speed: 650, speedscale: 0.6, speedlen: 4, collision: { type: ShapeCircle, radius: 11} },
    PlasmaPinkMed: { sprite: Sprites.Bullet_PlasmaPinkMed, linkmap: false, seqlen: FRAME3*5, speed: 600, speedscale: 0.6, speedlen: 4, collision: { type: ShapeCircle, radius: 11} },
    PlasmaBlueMed: { sprite: Sprites.Bullet_PlasmaBlueMed, linkmap: false, seqlen: FRAME3*5, speed: 550, speedscale: 0.6, speedlen: 4, collision: { type: ShapeCircle, radius: 11} },
    // PlasmaBig
    PlasmaOrngBig: { sprite: Sprites.Bullet_PlasmaOrngBig, linkmap: false, seqlen: FRAME3*5, speed: 650, speedscale: 0.5, speedlen: 3, collision: { type: ShapeCircle, radius: 14} },
    PlasmaPinkBig: { sprite: Sprites.Bullet_PlasmaPinkBig, linkmap: false, seqlen: FRAME3*5, speed: 600, speedscale: 0.5, speedlen: 3, collision: { type: ShapeCircle, radius: 14} },
    PlasmaBlueBig: { sprite: Sprites.Bullet_PlasmaBlueBig, linkmap: false, seqlen: FRAME3*5, speed: 550, speedscale: 0.5, speedlen: 3, collision: { type: ShapeCircle, radius: 14} },

    // Laser
    LaserYellow:  { sprite: Sprites.Bullet_LaserYellow,  linkmap: false, seqlen: FRAME3*5, speed: 800, speedscale: 0.5, speedlen: 3, collision: { type: ShapeCircle, radius: 7} },
    LaserPinkBig: { sprite: Sprites.Bullet_LaserPinkBig, linkmap: false, seqlen: FRAME3*5, speed: 800, speedscale: 0.5, speedlen: 3, collision: { type: ShapeCircle, radius: 11} },
	
	// Boss1
	Boss1Laser:   { sprite: Sprites.Bullet_Boss1Laser,   linkmap: false, seqlen: FRAME3*5, speed: 800, speedscale: 0.5, speedlen: 3, collision: { type: ShapeCircle, radius: 7} },
	Boss1Plasma:  { sprite: Sprites.Bullet_Boss1Plasma,  linkmap: false, seqlen: FRAME3*2, speed: 600, speedscale: 0.5, speedlen: 4, collision: { type: ShapeCircle, radius: 13} },

    //-------------------------------------------------------------------------------------------------------------------
    // ShootBullet
    //-------------------------------------------------------------------------------------------------------------------
    ShootBullet: function(bullet, entity, time, position, angle) {
        if (Game.Easy) {
            if (Math.random() < 0.6)
                return;
        }
        var ent = entity.world.bulletsE.add(EntityBullet.create(entity.world, '', entity, bullet));
        ent.shoot(time, position, VectorFromAngle(angle, bullet.speed), angle, 0);
    },

    //-------------------------------------------------------------------------------------------------------------------
    // ShootTargetCircle
    //-------------------------------------------------------------------------------------------------------------------
    ShootTargetCircle: function(bullet, entity, time, target, offset, anglediff, anglesep, num, error) {
        var error = (error === undefined) ? bullet.error : error;
        if (target || !entity.bulletTarget) {
            entity.bulletTarget = { x: entity.world.map.ship.position.x, y: entity.world.map.ship.position.y };
            entity.bulletError = error ? MRandom(-error,error) : 0;
            error = entity.bulletError;
        }
        var target = entity.bulletTarget;
        var position = { x: entity.position.x, y: entity.position.y };
        var angle = Math.atan2(target.x - position.x, target.y - position.y) + deg2rad((anglediff ? anglediff : 0));
        var angle1 = angle - deg2rad(anglesep/2);
        var angle2 = angle + deg2rad(anglesep/2);
        var angled = (angle2-angle1) / num;
		if (offset) {
		  position.x += offset.x;
		  position.y += offset.y
		}
        for (var i = 0; i < num; i++) {
            var a = angle1 + angled*i + angled * 0.5;
            this.ShootBullet(bullet, entity, time, position, a);
        }
    },

    //-------------------------------------------------------------------------------------------------------------------
    // ShootTarget
    //-------------------------------------------------------------------------------------------------------------------
    ShootTarget: function(bullet, entity, time, target, offset, anglediff, error) {
        this.ShootTargetCircle(bullet, entity, time, target, offset, anglediff, 0, 1, error);
    },
    
};
