/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var World = World || {};

World.State = { NONE: 1, PLAY: 1 };

//--------------------------------------------------------------------------------------------------------
// World
//--------------------------------------------------------------------------------------------------------
World.create = function(game) {
    var world = { game: game, w: APP_W, h: APP_H, halfw: APP_W/2, halfh: APP_H/2, state: World.State.NONE };

    // Load
    world.load = function() {
        this.modules = ModuleManager.create();

        // Hud
        this.hud = new GLHud(GApp.renderer, this.w,this.h, false,false);
        this.batch = new SpriteBatch(GApp.renderer, this.w,this.h);

        // Map
		this.level = Level1;
        this.map = this.modules.add(MMapManager.create(this, { level: this.level }));

        // Entities
        this.decals      = this.modules.add(MEntityManager.create(this, { resetClear: true }));
        this.powersL     = this.modules.add(MEntityManager.create(this, { resetClear: true }));
        this.enemiesL    = this.modules.add(MEntityManager.create(this, { resetClear: false}));
        this.explosionsL = this.modules.add(MEntityManager.create(this, { resetClear: true }));
        this.powersH     = this.modules.add(MEntityManager.create(this, { resetClear: true }));
        this.enemiesH    = this.modules.add(MEntityManager.create(this, { resetClear: false}));
        this.explosionsH = this.modules.add(MEntityManager.create(this, { resetClear: true }));
        this.entities    = this.modules.add(MEntityManager.create(this, { resetClear: false}));
        this.bulletsP    = this.modules.add(MEntityManager.create(this, { resetClear: true }));
        this.bulletsE    = this.modules.add(MEntityManager.create(this, { resetClear: true }));
        this.extras      = this.modules.add(MEntityManager.create(this, { resetClear: true }));
        this.overlay     = this.modules.add(MEntityManager.create(this, { resetClear: false}));

        // PlayerController
        this.player1 = this.modules.add(MPlayerController.create(this));
        this.scores  = this.modules.add(MScoreManager.create(this));

        // Load all modules
        this.modules.load();

        // Load overlays
        for (var overlay in Overlays) {
            var ovr = Overlays[overlay];
            ovr.entity = ovr.cls.create(this, overlay, ovr);
            this.overlay.add(ovr.entity);
        }
    }

    // Load
    world.init = function() {
        // Modules
        this.modules.init();
        // Vars
        this.time = 0;
        this.reset();
        // EDITOR
        this.edit_drag = false;
        this.edit_dragpos = { x: 0, y: 0 };
        this.edit_mouse = { x: 0, y: 0 };
        this.edit_entity = null;
    }

    // Reset
    world.reset = function() {
        this.gameover = false;
        this.gameoverTime = 0;
        this.stageclear = false;
        this.modules.reset();
    }

    // Update
    world.update = function(time, delta) {
        // Time
        this.time = MODE_EDITOR ? 0 : time;

        // Start?
        if (this.nextState)
            this.setState(this.time, this.nextState);

        // Modules
        this.modules.update(this.getTimeState(), delta);
        this.checkCollisions(this.getTimeState());
        Actions.update(this.getTimeState());
        
        // State
        this.updateState(time);
    }

    // Render
    world.render = function(fade) {
        this.modules.render(fade);

        // @DEBUG
        if (MODE_EDITOR) {
            var waiting = 0;
            var active = 0;
            var hidden = 0;
            var dead = 0;
            for (var i = 0; i < this.enemiesL.count(); i++) {
                if (this.enemiesL.entities[i].state == EnemyState.WAITING) waiting++;
                if (this.enemiesL.entities[i].state == EnemyState.ACTIVE) active++;
                if (this.enemiesL.entities[i].state == EnemyState.HIDDEN) hidden++;
                if (this.enemiesL.entities[i].state == EnemyState.DEAD) dead++;
            }
            for (var i = 0; i < this.enemiesH.count(); i++) {
                if (this.enemiesH.entities[i].state == EnemyState.WAITING) waiting++;
                if (this.enemiesH.entities[i].state == EnemyState.ACTIVE) active++;
                if (this.enemiesH.entities[i].state == EnemyState.HIDDEN) hidden++;
                if (this.enemiesH.entities[i].state == EnemyState.DEAD) dead++;
            }
            var e = ' - W:' + waiting + ' / A:' + active + ' / H:' + hidden + ' / D:' + dead;
            var info = 'TIME: ' + Round(this.getTimeState(), 2);
            Fonts.Debug.font.render(this.hud, info,   10,110,  1);
            Fonts.Debug.font.render(this.hud, 'ENTI: ' + this.entities.count(), 10,130, 1);
            Fonts.Debug.font.render(this.hud, 'ENEM: ' + (this.enemiesL.count() + this.enemiesH.count()) + e, 10,150, 1);
            Fonts.Debug.font.render(this.hud, 'EXPL: ' + (this.explosionsL.count() + this.explosionsH.count()), 10,170, 1);
            Fonts.Debug.font.render(this.hud, 'BULP: ' + this.bulletsP.count(), 10,190, 1);
            Fonts.Debug.font.render(this.hud, 'BULE: ' + this.bulletsE.count(), 10,210, 1);
            Fonts.Debug.font.render(this.hud, 'POWR: ' + (this.powersL.count() + this.powersH.count()), 10,230, 1);
            // Debug

            // EDITOR
            var x =   this.edit_mouse.x - this.map.offset.x;
            var y = - this.edit_mouse.y - this.map.offset.y + this.h;
            Fonts.Debug.font.render(this.hud, 'OFFSET: ' + Round(this.map.offset.x, 2) + '/' + Round(this.map.offset.y, 2), 10,310, 1);
            Fonts.Debug.font.render(this.hud, 'EDITOR: ' + Round(x, 2) + '/' + Round(y, 2), 10,330, 1);
            if (this.edit_entity) {
                var x = this.edit_entity.location.x;
                var y = this.edit_entity.location.y;
                Fonts.Debug.font.render(this.hud, 'ENEMY: ' + Round(x, 2) + '/' + Round(y, 2) + ' - ' + this.edit_entity.name, 10,350, 1);
            }
        }
        else {
            this.renderState();
            //Fonts.Debug.font.render(this.hud, 'TIME: ' + Round(this.getTimeState(), 2), 10,APP_H-50,  1);
        }
    }

    // Events
    world.keyPress = function(key, press) {
        //GLog('Game', 'KeyPress: ' + key + ' (' + press +')');
        switch (key) {
            case 38: this.player1.event({ type: 'UP',    press: press }); break;
            case 40: this.player1.event({ type: 'DOWN',  press: press }); break;
            case 37: this.player1.event({ type: 'LEFT',  press: press }); break;
            case 39: this.player1.event({ type: 'RIGHT', press: press }); break;
            // Type 1
            case 17: this.player1.event({ type: 'FIRE1', press: press }); break; // Ctrl
            case 18: this.player1.event({ type: 'FIRE2', press: press }); break; // Alt
            case 32: this.player1.event({ type: 'FIRE3', press: press }); break; // Space
            // Type 2
            case 90: this.player1.event({ type: 'FIRE1', press: press }); break; // Z
            case 88: this.player1.event({ type: 'FIRE2', press: press }); break; // X
            case 67: this.player1.event({ type: 'FIRE3', press: press }); break; // C
            // Restart
            //case 13: this.start(); break;
            case 27: Game.Instance.gui.setScreen(this.time, Game.Instance.screenMain); break;
            default: return false;
        }
        return true;
    }

    world.mousePress = function(x, y, button, press) {
        if (!MODE_EDITOR) return;
        this.edit_drag = press;
        this.edit_dragpos = { x: x, y: y };
        this.edit_mouse = { x: x, y: y };
        // Get entity?
        if (press) {
            this.edit_entity = null;
            var x = this.edit_mouse.x - this.map.offset.x;
            var y = - this.edit_mouse.y - this.map.offset.y + this.h;
            for (var i = 0; i < this.enemiesL.count(); i++) {
                var entity = this.enemiesL.entities[i];
                if (this.map.isInsideEntity(entity, x, y)) {
                    this.edit_entity = entity;
                }
            }
        }
        return false;
    }

    world.mouseMove = function(x, y, button) {
        if (!MODE_EDITOR) return;
        if (this.edit_drag) {
            if (this.edit_entity) {
                this.edit_entity.location.x += x - this.edit_dragpos.x;
                this.edit_entity.location.y -= y - this.edit_dragpos.y;
            } else  {
                //this.map.offset.x += x - this.edit_dragpos.x;
                this.map.offset.y -= y - this.edit_dragpos.y;
            }
            this.edit_dragpos.x = x;
            this.edit_dragpos.y = y;
        }
        this.edit_mouse.x = x;
        this.edit_mouse.y = y;
        return false;
    }

    //--------------------------------------------------------------------------------------------------------
    // State
    //--------------------------------------------------------------------------------------------------------
    world.setState = function(time, state) {
        this.state = this.nextState;
        this.timeState = time;
        this.nextState = 0;
        switch (state) {
            case World.State.PLAY:
                this.reset();
                break;
        }
    }

    world.setNextState = function(state) {
        this.nextState = state;
    }

    world.getTimeState = function() {
        return this.time - this.timeState;
    }

    world.updateState = function(time) {
        if (this.gameover) {
            if (this.getTimeState() - this.gameoverTime > 3)
                Game.Instance.gui.setScreen(this.time, Game.Instance.screenMain);
        }
        else {
            // Gameover por time
            if (this.getTimeState() > this.map.timeGameover)
                this.setGameOver(time, false);
        }
    }

    world.renderState = function() {
        switch (this.state) {
            case World.State.PLAY:
                AnimLabel.drawFadeOut(this, this.getTimeState(), this.getTimeState() + 0.1, 1.5);
                AnimLabel.drawStage(this, this.getTimeState(), this.getTimeState() + 0.1, 1.3, 0.3, 200, this.map.title);
				AnimLabel.drawWarning(this, this.getTimeState(), this.getTimeState() + this.map.timeWarning, 2.0, 0.5, 200, Textures.Warning.texture);
                // GameOver
                if (this.gameover) {
                    if (this.stageclear)
                        AnimLabel.drawStage(this, this.getTimeState() - this.gameoverTime, this.getTimeState() - this.gameoverTime + 0.5, 2.0, 0.3, 200, Textures.StageClear.texture);
                    else
                        AnimLabel.drawStage(this, this.getTimeState() - this.gameoverTime, this.getTimeState() - this.gameoverTime + 0.5, 2.0, 0.3, 200, Textures.GameOver.texture);
                }
                break;
        }
    }

    // Predefined
    world.start = function() {
        this.setNextState(World.State.PLAY);
    }
    
    world.setGameOver = function(time, clear) {
        this.gameover = true;
        this.gameoverTime = this.getTimeState();
        this.stageclear = clear;
    }

    //--------------------------------------------------------------------------------------------------------
    // Draw
    //--------------------------------------------------------------------------------------------------------
    world.drawTexture = function(texture, position, size, center, scale, angle, fade, blending, texsrc) {
        var rotz = angle ? angle : 0;
        var sx = scale ? scale.x : 1;
        var sy = scale ? scale.y : 1;
        var cx = center ? center.x : 0;
        var cy = center ? center.y : 0;
        var x = position.x - (cx * sx);
        var y = position.y + (cy * sy);
        var w = size.x * sx;
        var h = size.y * sy;
        this.hud.render(texture, x,y, w,h, rotz, fade, blending, texsrc);
    }

    world.drawSprite = function(sprite, frame, position, size, center, scale, angle, fade, blending) {
        this.drawTexture(sprite.texture, position, size, center, scale, angle, fade, blending, sprite.getFrame(frame));
    }

    //--------------------------------------------------------------------------------------------------------
    // DrawPoints
    //--------------------------------------------------------------------------------------------------------
    world.drawTexturePoints = function(texture, points, position, scale, angle, fade, blending, texsrc) {
        var rotz = angle ? angle : 0;
        var s = scale ? scale : { x: 1, y: 1 };
        var p = { x: position.x, y: position.y };
        this.batch.renderTexture(texture, points, p, s, rotz, fade, blending, texsrc);
    }

    world.drawSpritePoints = function(sprite, frame, points, position, scale, angle, fade, blending) {
        this.drawTexturePoints(sprite.texture, points, position, scale, angle, fade, blending, sprite.getFrame(frame));
    }

    //--------------------------------------------------------------------------------------------------------
    // checkCollisions
    //--------------------------------------------------------------------------------------------------------
    world.checkCollisions = function(time) {
        // Enemies
        for (var i = 0; i < this.bulletsP.count(); i++) {
            var bullet = this.bulletsP.entities[i];
            // EnemiesH
            if (!bullet.dead) {
               for (var j = 0; j < this.enemiesH.count(); j++) {
                    var enemy = this.enemiesH.entities[j];
                    if (enemy.state == EnemyState.ACTIVE) {
                        if (Shape.collide(bullet.shape, enemy.shape)) {
                            bullet.die(time);
                            enemy.hit(time, bullet.damage, bullet.player);
                            break;
                        }
                    }
                }
            }
            // EnemiesL
            if (!bullet.dead) {
               for (var j = 0; j < this.enemiesL.count(); j++) {
                    var enemy = this.enemiesL.entities[j];
                    if (enemy.state == EnemyState.ACTIVE) {
                        if (Shape.collide(bullet.shape, enemy.shape)) {
                            bullet.die(time);
                            enemy.hit(time, bullet.damage, bullet.player);
                            break;
                        }
                    }
                }
            }
        }

        // Ship
        var ship = this.map.ship;
        if (ship.alive) {
            // Powers vs Ship
            for (var i = 0; i < this.powersH.count(); i++) {
                var power = this.powersH.entities[i];
                if (power.active) {
                    if (Shape.collide(ship.shape, power.shape))
                        power.get(time, ship.index);
                }
            }
            for (var i = 0; i < this.powersL.count(); i++) {
                var power = this.powersL.entities[i];
                if (power.active) {
                    if (Shape.collide(ship.shape, power.shape))
                        power.get(time, ship.index);
                }
            }

            // BulletsEnemy vs Ship
            for (var i = 0; i < this.bulletsE.count(); i++) {
                var bullet = this.bulletsE.entities[i];
                if (!bullet.dead) {
                    if (Shape.collide(bullet.shape, ship.shape)) {
                        bullet.die(time);
                        ship.hit(time);
                        if (!ship.alive)
                            this.setGameOver(time, false);
                    }
                }
            }

            // Enemies vs Ship
           for (var j = 0; j < this.enemiesH.count(); j++) {
                var enemy = this.enemiesH.entities[j];
                if (enemy.state == EnemyState.ACTIVE) {
                    if (Shape.collide(enemy.shape, ship.shape)) {
                        ship.hit(time);
                        if (!ship.alive)
                            this.setGameOver(time, false);
                    }
                }
            }
        }
    }

    return world;
}
