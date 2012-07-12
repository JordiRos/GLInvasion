/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Enemies = Enemies || {};

// Enemy definitions
Enemies.InfLig  = { entity: EntityEnemyStd, sprite: Sprites.Enemy_InfLig, life: 140,  score: 250,  linkmap: true,  explosion: Explosions.INFLIG, decals: Decals.INFLIG, collision: { type: ShapeCircle, radius: 20 }, bo: [ { x: 12, y:-30 } ] };
Enemies.InfPes  = { entity: EntityEnemyStd, sprite: Sprites.Enemy_InfPes, life: 500,  score: 800,  linkmap: true,  explosion: Explosions.INFPES, decals: Decals.INFPES, collision: { type: ShapeCircle, radius: 28 }, bo: [ { x:-34, y:-12 }, { x: 34, y:-12 }, ] };
Enemies.TankBig = { entity: EntityEnemyTank,sprBase:Sprites.Enemy_TankBig_Base, sprTower: Sprites.Enemy_TankBig_Tower, offsetTower: { x: 0, y: 12 }, life: 1400, score: 2500, linkmap: true, explosion: Explosions.TANKBIG, decals: Decals.BIGTANK, collision: { type: ShapeCircle, radius: 40 }, bo: [ { x:2, y:56 } ] };
Enemies.Kami1   = { entity: EntityEnemyStd, sprite: Sprites.Enemy_Kami1,  life: 120,  score: 200,  linkmap: false, explosion: Explosions.KAMI,   collision: { type: ShapeCircle, radius: 22 }, bo: [ { x: 0, y:0 } ] };
Enemies.Kami2   = { entity: EntityEnemyStd, sprite: Sprites.Enemy_Kami2,  life: 120,  score: 200,  linkmap: false, explosion: Explosions.KAMI,   collision: { type: ShapeCircle, radius: 22 }, bo: [ { x: 0, y:0 } ] };
Enemies.InfAir  = { entity: EntityEnemyStd, sprite: Sprites.Enemy_InfAir, life: 350,  score: 800,  linkmap: false, explosion: Explosions.INFAIR, collision: { type: ShapeCircle, radius: 28 }, bo: [ { x:-22, y:-8 }, { x: 22, y:-8 } ] };
Enemies.BigAir  = { entity: EntityEnemyStd, sprite: Sprites.Enemy_BigAir, life: 1200, score: 3000, linkmap: false, explosion: Explosions.BIGAIR, collision: { type: ShapeCircle, radius: 38 }, bo: [ { x: 0, y:0 } ] };

// Boss1
Enemies.Boss1   = { entity: EntityEnemyBoss,sprite: Sprites.Enemy_Boss1,  life: 160000,score: 100000,linkmap: false, explosion: Explosions.BOSS1, explosionTemp: Explosions.BOSS1TEMP,
	collision: { type: ShapePolygon, points: [ { x: -245, y: 98 }, { x: 245, y: 98 }, { x: 245, y: -119 }, { x: -245, y: -119 }, ] },
	BOBig    : [ { x: -45,  y: -107 }, { x: 45,  y: -107 }, ],
	BOLaser1 : [ { x: -96,  y: -91  }, { x: 96,  y: -91  }, ],
	BOLaser2 : [ { x: -78,  y: -141 }, { x: 78,  y: -141 }, ],
	BOMini1  : [ { x: -251, y: -103 }, { x: 251, y: -103 }, ],
	BOMini2  : [ { x: -224, y: -136 }, { x: 224, y: -136 }, ],
};

// Kamikaze parameters
var Kamikazes = Kamikazes || {};
Kamikazes.RandomCenterSlow = { source: { x: 0,           y: APP_H + 100 }, random: { x: 150, y: 0, t: 100 }, acceltime: 4, speedini: 200, speedfin: 400 };
Kamikazes.RandomLeftSlow   = { source: { x:-APP_W * 1/4, y: APP_H + 100 }, random: { x: 150, y: 0, t: 100 }, acceltime: 4, speedini: 200, speedfin: 400 };
Kamikazes.RandomRightSlow  = { source: { x: APP_W * 1/4, y: APP_H + 100 }, random: { x: 150, y: 0, t: 100 }, acceltime: 4, speedini: 200, speedfin: 400 };
Kamikazes.BigAirCenter     = { source: { x: 0,           y: APP_H + 100 }, random: { x: 30,  y: 0, t: 100 }, acceltime: 1, speedini:  50, speedfin: 100 };
Kamikazes.BigAirLeft       = { source: { x:-APP_W * 1/4, y: APP_H + 100 }, random: { x: 30,  y: 0, t: 100 }, acceltime: 1, speedini:  50, speedfin: 100 };
Kamikazes.BigAirRight      = { source: { x: APP_W * 1/4, y: APP_H + 100 }, random: { x: 30,  y: 0, t: 100 }, acceltime: 1, speedini:  50, speedfin: 100 };

// Path parameters
var Paths = Paths || {};
Paths.InfAir1_1 = [ { x: -300, y: APP_H+150, t: 0 }, { x: -300, y: APP_H-150, t: 1 }, { x: -300, y: APP_H-200, t: 4 }, { x: -300, y: APP_H+150, t: 5 } ];
Paths.InfAir1_2 = [ { x: -200, y: APP_H+150, t: 0 }, { x: -200, y: APP_H-150, t: 1 }, { x: -200, y: APP_H-200, t: 4 }, { x: -200, y: APP_H+150, t: 5 } ];
Paths.InfAir1_3 = [ { x: -100, y: APP_H+150, t: 0 }, { x: -100, y: APP_H-150, t: 1 }, { x: -100, y: APP_H-200, t: 4 }, { x: -100, y: APP_H+150, t: 5 } ];

Paths.InfAir2_1 = [ { x:  300, y: APP_H+150, t: 0 }, { x:  300, y: APP_H-150, t: 1 }, { x:  300, y: APP_H-200, t: 4 }, { x:  300, y: APP_H+150, t: 5 } ];
Paths.InfAir2_2 = [ { x:  200, y: APP_H+150, t: 0 }, { x:  200, y: APP_H-150, t: 1 }, { x:  200, y: APP_H-200, t: 4 }, { x:  200, y: APP_H+150, t: 5 } ];
Paths.InfAir2_3 = [ { x:  100, y: APP_H+150, t: 0 }, { x:  100, y: APP_H-150, t: 1 }, { x:  100, y: APP_H-200, t: 4 }, { x:  100, y: APP_H+150, t: 5 } ];

// Path Boss1
Paths.Boss1     = [ { x: 0, y: APP_H+200, t: 0 }, { x: 0, y: APP_H-170, t: 1 }, { x: 0, y: APP_H-170, t: 200 }, { x: 0, y: APP_H+150, t: 201 } ];