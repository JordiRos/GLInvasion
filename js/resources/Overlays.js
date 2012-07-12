/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Overlays = {
    // Players
    Title1:   { cls: EntityOverlayText,   font:   Fonts.ArcadeTitle, position: { x: 10,  y: 10 } },
    Score1:   { cls: EntityOverlayText,   font:   Fonts.ArcadeScore, position: { x: 160, y: 10 } },
    Laser1:   { cls: EntityOverlayLaser,  sprite: Sprites.Hud_Laser, position: { x: 10,  y: APP_H-22-10 } },
    Shock1_1: { cls: EntityOverlaySprite, sprite: Sprites.Hud_Shock, position: { x: 160+25*0, y: APP_H-22-11 } },
    Shock1_2: { cls: EntityOverlaySprite, sprite: Sprites.Hud_Shock, position: { x: 160+25*1, y: APP_H-22-11 } },
    Shock1_3: { cls: EntityOverlaySprite, sprite: Sprites.Hud_Shock, position: { x: 160+25*2, y: APP_H-22-11 } },
    Shock1_4: { cls: EntityOverlaySprite, sprite: Sprites.Hud_Shock, position: { x: 160+25*3, y: APP_H-22-11 } },
    Shock1_5: { cls: EntityOverlaySprite, sprite: Sprites.Hud_Shock, position: { x: 160+25*4, y: APP_H-22-11 } },
	BossLife: { cls: EntityOverlayLaser,  sprite: Sprites.Hud_BossLife, position: { x: APP_W-450-10, y: APP_H-22-10 }, hidden: true },
};
