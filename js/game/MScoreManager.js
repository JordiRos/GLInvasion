/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var MScoreManager = MScoreManager || { };

MScoreManager.TIME_HIT = 1.5;

//--------------------------------------------------------------------------------------------------------
// MScoreManager
//--------------------------------------------------------------------------------------------------------
MScoreManager.create = function(world, params) {
    var module = Module.create(world);
    module.players = [];

    //--------------------------------------------------------------------------------------------------------
    // Load
    //--------------------------------------------------------------------------------------------------------
    module.load = function() {
    }

    // Init
    module.init = function() {
        for (var i = 0; i < MAX_PLAYERS; i++)
            this.players[i] = {};
        this.reset();
    }

    // Reset
    module.reset = function() {
        for (var i = 0; i < MAX_PLAYERS; i++) {
            var p = this.players[i];
            p.timeShock = -1;
            p.score = 0;
            p.numshocks = 3;
            p.laser = SHIP_MAX_LASER;
            p.shootlaser = false;
            p.timehit = 0;
            p.hits = 0;
            p.multiplier = 1;
            p.notifymult = false;
            p.active = true;
            // Labels
            p.labelTitle = Overlays.Title1.entity;
            p.labelScore = Overlays.Score1.entity;
            p.labelLaser = Overlays.Laser1.entity;
            p.shocks = [ Overlays.Shock1_1.entity, Overlays.Shock1_2.entity, Overlays.Shock1_3.entity, Overlays.Shock1_4.entity, Overlays.Shock1_5.entity ];
            // Hide old
            for (var i = 0; i < SHIP_MAX_SHOCK; i++)
                p.shocks[i].visible = (i < p.numshocks);
        }
    }
    
    // Update
    module.update = function(time, delta) {
        for (var i = 0; i < MAX_PLAYERS; i++) {
            var p = this.players[i];
            if (p.active) {
                p.labelTitle.set(time, 'PLAYER' + (i+1));
                p.labelScore.set(time, '' + p.score);
                if (p.shootlaser)
                    p.shootlaser = false;
                else
                    p.laser = Math.min(SHIP_MAX_LASER, p.laser + (SHIP_MAX_LASER * delta) / SHIP_REC_LASER);
                p.labelLaser.setSize(time, p.laser / SHIP_MAX_LASER);
                // Update hits/multiplier
                if (time - p.timehit > MScoreManager.TIME_HIT) {
                    p.hits = 0;
                    p.timehit = 0;
                    p.multiplier = 1;
                }
                
                // Shock
                if (p.timeShock > 0) {
                    if (time - p.timeShock < TIME_SHOCK) {
                        var step = MTime01(time, p.timeShock, TIME_SHOCK);
                        p.shockSize = Lerp(step, 0,3);
                        p.shockFade = MTime10(time, p.timeShock + TIME_SHOCK - TIME_SHOCK_FADE, TIME_SHOCK_FADE);

                        // Remove bullets
						var size = p.shockSize * 256;
                        for (var i = 0; i < this.world.bulletsE.count(); i++) {
                            var bullet = this.world.bulletsE.entities[i];
                            if (!bullet.dead) {
                                var d = DistanceVector2(bullet.position.x - p.posShock.x, bullet.position.y - p.posShock.y);
                                if (d < size)
                                    bullet.die(time);
                            }
                        }
                    }
                    else p.timeShock = -1;
                }
            }
        }
    }
    
    //--------------------------------------------------------------------------------------------------------
    // Render
    //--------------------------------------------------------------------------------------------------------
    module.render = function(fade) {
        for (var i = 0; i < MAX_PLAYERS; i++) {
            var p = this.players[i];
            if (p.active) {
                if (p.timeShock > 0) {
                    var f = p.shockFade;
                    var s = p.shockSize;
					if (s > 0)
						this.world.map.drawTexture(Textures.Shock.texture, p.posShock, { x: 512, y: 512 }, { x: 256, y: 256 }, { x: s, y: s }, 0, f, THREE.AdditiveBlending);
                }
            }
        }
    }
    
    // Add hit
    module.addHit = function(time, player) {
        var p = this.players[player];
        p.hits++;
        p.timehit = time;
        p.multiplier = Math.floor(p.hits / 10) + 1;
    }

    // Add score
    module.addScore = function(time, player, score) {
        var p = this.players[player];
        p.score += score * p.multiplier;
    }

    // Add shock
    module.addShock = function(time, player) {
        var p = this.players[player];
        if (p.numshocks < 5) {
            p.shocks[p.numshocks].show(time, true);
            p.numshocks++;
        }
    }
    
    // Can laser
    module.canLaser = function(player) {
        var p = this.players[player];
        return (p.laser >= 1);
    }

    // shootLaser
    module.shootLaser = function(time, player) {
        var p = this.players[player];
        if (p.laser > 0) {
            p.laser = Math.max(0, p.laser - 1);
            p.shootlaser = true;
        }
    }

    // shootShock
    module.shootShock = function(time, player) {
        var p = this.players[player];
        if (p.numshocks > 0) {
            p.numshocks--;
            p.timeShock = time;
            p.posShock = { x: this.world.map.ship.position.x, y: this.world.map.ship.position.y };
            p.shocks[p.numshocks].show(time, false);            
            this.world.map.ship.doFlash(time);
        }
    }
    
    return module;
}
