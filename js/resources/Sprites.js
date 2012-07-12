/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Sprites = {
    // HUD
    Hud_Shock: { cls: SpriteSeq, texture: DATA_SPRITES + 'hud/shock.png', center: { x: 0, y: 0 }, },
    Hud_Laser: { cls: SpriteSeq, texture: DATA_SPRITES + 'hud/laser.png', center: { x: 0, y: 0 }, cols: 1, rows: 2, frames: 2,
        sequences: {
            Fondo: { frameini: 0, frameend: 0 },
            Barra: { frameini: 1, frameend: 1 },
        },
    },
    Hud_BossLife: { cls: SpriteSeq, texture: DATA_SPRITES + 'hud/bosslife.png', center: { x: 0, y: 0 }, cols: 1, rows: 2, frames: 2,
        sequences: {
            Fondo: { frameini: 0, frameend: 0 },
            Barra: { frameini: 1, frameend: 1 },
        },
    },	

    // SHIPS
    Ship_Blue: { cls: SpriteSeq, texture: DATA_SPRITES + 'ships/main.png', center: { x: 34, y: 38 }, cols: 3, rows: 5, frames: 15 },

    // ENEMIES
    Enemy_InfLig: { cls: SpriteSeq, texture: DATA_SPRITES + 'enemies/inflig.png' },
    Enemy_InfPes: { cls: SpriteSeq, texture: DATA_SPRITES + 'enemies/infpes.png' },
    Enemy_Kami1:  { cls: SpriteSeq, texture: DATA_SPRITES + 'enemies/kami1.png', center: { x: 36, y: 59 } },
    Enemy_Kami2:  { cls: SpriteSeq, texture: DATA_SPRITES + 'enemies/kami2.png', center: { x: 36, y: 59 } },
    Enemy_InfAir: { cls: SpriteSeq, texture: DATA_SPRITES + 'enemies/infair.png', center: { x: 33, y: 31 } },
	Enemy_BigAir: { cls: SpriteSeq, texture: DATA_SPRITES + 'enemies/bigair.png', center: { x: 38, y: 49 } },
	Enemy_TankBig_Base:  { cls: SpriteSeq, texture: DATA_SPRITES + 'enemies/tankbig_base.png' },
	Enemy_TankBig_Tower: { cls: SpriteSeq, texture: DATA_SPRITES + 'enemies/tankbig_tower.png', cols: 4, rows: 2, frames: 8 },
	
	// BOSS
	Enemy_Boss1: { cls: SpriteSeq, texture: DATA_SPRITES + 'enemies/boss1.png' },

    // DECALS
    Decals:  { cls: SpriteSeq, texture: DATA_SPRITES + 'decals/decals.png', cols: 3, rows: 1, frames: 3 },
    Thrash1: { cls: SpriteSeq, texture: DATA_SPRITES + 'decals/thrash1.png' },
    Thrash2: { cls: SpriteSeq, texture: DATA_SPRITES + 'decals/thrash2.png' },
    
	// BULLETS
    // WaterEFfect
    Bullet_Water: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/water.png' },
    // Arrow
    Bullet_BlueArrow1: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/bluearrow1.png', cols: 1, rows: 2, frames: 2 },
    Bullet_BlueArrow2: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/bluearrow2.png', cols: 1, rows: 2, frames: 2 },
    Bullet_BlueArrow3: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/bluearrow3.png', cols: 1, rows: 2, frames: 2 },
    // Laser
    Bullet_Laser1: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/laser1.png', cols: 4, rows: 1, frames: 4 },
    Bullet_Laser2: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/laser2.png', cols: 4, rows: 1, frames: 4 },
    Bullet_Laser3: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/laser3.png', cols: 4, rows: 1, frames: 4 },    
    // Plasma
    Bullet_PlasmaOrngSma: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/plasmaorngsma.png', cols: 5, rows: 1, frames: 5 },
    Bullet_PlasmaBlueSma: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/plasmabluesma.png', cols: 5, rows: 1, frames: 5 },
    Bullet_PlasmaPinkSma: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/plasmapinksma.png', cols: 5, rows: 1, frames: 5 },
    Bullet_PlasmaOrngMed: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/plasmaorngmed.png', cols: 5, rows: 1, frames: 5 },
    Bullet_PlasmaBlueMed: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/plasmabluemed.png', cols: 5, rows: 1, frames: 5 },
    Bullet_PlasmaPinkMed: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/plasmapinkmed.png', cols: 5, rows: 1, frames: 5 },
    Bullet_PlasmaOrngBig: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/plasmaorngbig.png', cols: 5, rows: 1, frames: 5 },
    Bullet_PlasmaBlueBig: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/plasmabluebig.png', cols: 5, rows: 1, frames: 5 },
    Bullet_PlasmaPinkBig: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/plasmapinkbig.png', cols: 5, rows: 1, frames: 5 },
    // Laser
    Bullet_LaserYellow:  { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/laseryellow.png', },
    Bullet_LaserPinkBig: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/laserpinkbig.png', },
	// Boss1
	Bullet_Boss1Laser:   { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/boss1_laser.png', },
	Bullet_Boss1Plasma:  { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/boss1_plasma.png', cols: 5, rows: 1, frames: 5 },
    // Destroy
    Bullet_Destroy: { cls: SpriteSeq, texture: DATA_SPRITES + 'bullets/die.png', cols: 6, rows: 1, frames: 6, },
	
    // EXPLOSIONS
    Expl_Suelo: { cls: SpriteSeq, texture: DATA_SPRITES + 'explosions/suelo.png', center: { x: 104, y: 164 }, cols: 5, rows: 3, frames: 11 },
    Expl_Aire:  { cls: SpriteSeq, texture: DATA_SPRITES + 'explosions/aire.png', center: { x: 134, y: 102 }, cols: 5, rows: 3, frames: 13 },
    
    // POWERS
    PowerUp: { cls: SpriteSeq, texture: DATA_SPRITES + 'items/powerup.png', cols: 8, rows: 2, frames: 16 },
    ShockUp: { cls: SpriteSeq, texture: DATA_SPRITES + 'items/shockup.png', cols: 8, rows: 2, frames: 16 },
    Star: { cls: SpriteSeq, texture: DATA_SPRITES + 'items/star.png' },
};
