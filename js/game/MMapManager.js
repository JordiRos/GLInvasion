/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var MMapManager = MMapManager || [];
 
//--------------------------------------------------------------------------------------------------------
// MMapManager
//--------------------------------------------------------------------------------------------------------
MMapManager.create = function(world, params) {
    var module = Module.create(world);
    module.params = params;

    //--------------------------------------------------------------------------------------------------------
    // Load
    //--------------------------------------------------------------------------------------------------------
    module.load = function() {
        // RT
        var rtParams = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBufer: false };
        this.hudMap = new GLHud(GApp.renderer, this.world.w, this.world.h, false, false);
        this.hudMap.renderTarget = new THREE.WebGLRenderTarget(this.world.w, this.world.h, rtParams);

        // Camera
        this.offset = new THREE.Vector2(this.world.halfw, 0);
        this.position = new THREE.Vector2(0, 0);
        this.size = new THREE.Vector2(this.params.level.size.x, this.params.level.size.y);
        this.center = new THREE.Vector2(this.size.x / 2, this.size.y);
        this.speed = this.params.level.speed;
        
        // Background
        Loader.add(1);
        this.background = THREE.ImageUtils.loadTexture(DATA_MAPS + this.params.level.background, null, function() { Loader.onLoad(); });
        // Title
        Loader.add(1);
        this.title = THREE.ImageUtils.loadTexture(DATA_MAPS + this.params.level.title, null, function() { Loader.onLoad(); });
		// Time
		this.timeWarning = this.params.level.timeWarning;
		
        // Ship
        this.ship = this.world.entities.add(EntityShip.create(this.world, 'Ship', {  index: 0, sprite: Sprites.Ship_Blue }));
        this.ship.load();

        // Enemies
		GLog('World', 'Loading Ground Enemies: ' + this.params.level.enemiesL.length);
        this.enemiesL = [];
        for (var i = 0; i < this.params.level.enemiesL.length; i++) {
            var enemy = this.params.level.enemiesL[i];
            this.enemiesL[i] = this.world.enemiesL.add(enemy.enemy.entity.create(this.world, enemy.name, enemy));
            this.enemiesL[i].load();
        }
		GLog('World', 'Loading Air Enemies: ' + this.params.level.enemiesH.length);
        this.enemiesH = [];
        for (var i = 0; i < this.params.level.enemiesH.length; i++) {
            var enemy = this.params.level.enemiesH[i];
            this.enemiesH[i] = this.world.enemiesH.add(enemy.enemy.entity.create(this.world, enemy.name, enemy));
            this.enemiesH[i].load();
        }

        // FXWater
        this.water = new FXWater(settings.window.w, settings.window.h);
        this.waterSprite = Sprite.create(this.world, Sprites.Bullet_Water);
        
        // Helpers
        this.matProj  = new THREE.Matrix4();
        this.matWorld = new THREE.Matrix4();
        this.matRes   = new THREE.Vector3();
    }

    //--------------------------------------------------------------------------------------------------------
    // Init
    //--------------------------------------------------------------------------------------------------------
    module.init = function(time, delta) {
        // Enemies
        for (var i = 0; i < this.enemiesL.length; i++)
            this.enemiesL[i].init();
        for (var i = 0; i < this.enemiesH.length; i++)
            this.enemiesH[i].init();
        // Water
        this.waterSprite.setSeq('Main', true);
    }
    
    //--------------------------------------------------------------------------------------------------------
    // Reset
    //--------------------------------------------------------------------------------------------------------
    module.reset = function(time, delta) {
        this.position.set(0, 0);
    }
    
    //--------------------------------------------------------------------------------------------------------
    // Update
    //--------------------------------------------------------------------------------------------------------
    module.update = function(time, delta) {
        this.time = Math.max(time, 0);

        // Background
        if (!MODE_EDITOR) {
            this.position.y += this.speed * delta;
			this.position.y = Math.max(APP_H - this.size.y, this.position.y);
        }

        // Water
        this.water.update(time, delta);
    }
    
    //--------------------------------------------------------------------------------------------------------
    // Render
    //--------------------------------------------------------------------------------------------------------
    module.render = function(fade) {
        // Clear
        GApp.renderer.autoClear = false;
        //GApp.renderer.setClearColorHex(0x7f7f7f, 1);
        //GApp.renderer.clear(true, true, true);

        // Render water physics
        var map = this;
        var renderBullets = function(rt) {
            map.world.hud.renderTarget = rt;
            // Bullets player
            for (var i = 0; i < map.world.bulletsP.count(); i++) {
                var entity = map.world.bulletsP.entities[i];
                map.waterSprite.render(entity.position, { x: 1, y: 1 }, entity.rotation, 0.5);
            }
            // Bullets enemy
            for (var i = 0; i < map.world.bulletsE.count(); i++) {
                var entity = map.world.bulletsE.entities[i];
                map.waterSprite.render(entity.position, { x: 1, y: 1 }, entity.rotation, 0.5);
            }
            map.world.hud.renderTarget = null;
        };
        this.water.renderParticles(renderBullets);
        this.water.renderPhysics(0,0,512,512);
        
        // Render background
        this.world.hud.renderTarget = this.hudMap.renderTarget;
        this.drawTexture(this.background, this.position, this.size, this.center, undefined, 0,1, THREE.NormalBlending);
        this.world.hud.renderTarget = null;
        
        // Render background with FX
        this.water.render(this.hudMap.renderTarget, fade);
    }

    //--------------------------------------------------------------------------------------------------------
    // Draw
    //--------------------------------------------------------------------------------------------------------
    module.drawTexture = function(texture, position, size, center, scale, angle, fade, blending, texsrc) {
        var rotz = angle ? angle : 0;
        var sx = scale ? scale.x : 1;
        var sy = scale ? scale.y : 1;
        var cx = center ? center.x : 0;
        var cy = center ? center.y : 0;
        var x = this.offset.x + position.x - (cx * sx);
        var y = this.offset.y + position.y + (cy * sy);
        var w = size.x * sx;
        var h = size.y * sy;
        this.world.hud.render(texture, x,this.world.h - y, w,h, rotz, fade, blending, texsrc);
    }
    
    module.drawSprite = function(sprite, frame, position, size, center, scale, angle, fade, blending) {
        this.drawTexture(sprite.texture, position, size, center, scale, angle, fade, blending, sprite.getFrame(frame));
    }

    //--------------------------------------------------------------------------------------------------------
    // DrawPoints
    //--------------------------------------------------------------------------------------------------------
    module.drawTexturePoints = function(texture, points, position, scale, angle, fade, blending, texsrc) {
        var rotz = angle ? angle : 0;
        var s = scale ? scale : { x: 1, y: 1 };
        var p = { x: this.offset.x + position.x, y: this.offset.y + position.y };
        this.world.batch.renderTexture(texture, points, p, s, rotz, fade, blending, texsrc);
    }

    module.drawSpritePoints = function(sprite, frame, points, position, scale, angle, fade, blending) {
        this.drawTexturePoints(sprite.texture, points, position, scale, angle, fade, blending, sprite.getFrame(frame));
    }
    
    //--------------------------------------------------------------------------------------------------------
    // Visible
    //--------------------------------------------------------------------------------------------------------
    module.pointVisible = function(x,y) {
        var w = this.world.halfw;
        var h = this.world.h;
        return x > -w && x < w && y > 0 && y < h;
    }
    
    module.entityVisible = function(entity) {
        var x0 = entity.position.x - entity.center.x;
        var y0 = entity.position.y - entity.center.y;
        var x1 = x0 + entity.size.x * entity.scale.x;
        var y1 = y0 + entity.size.y * entity.scale.y;
        return this.pointVisible(x0, y0) || this.pointVisible(x1, y0) || this.pointVisible(x0, y1) || this.pointVisible(x1, y1);
    }

    // EDITOR
    module.isInsideEntity = function(entity, x, y) {
        var x0 = entity.location.x - entity.center.x;
        var y0 = entity.location.y - entity.center.y;
        var x1 = x0 + entity.size.x * entity.scale.x;
        var y1 = y0 + entity.size.y * entity.scale.y;
        return (x >= x0 && x < x1 && y >= y0 && y < y1);
    }

    return module;
}