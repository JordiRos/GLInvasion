/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Loading = Loading || { };

//--------------------------------------------------------------------------------------------------------
// Entity
//--------------------------------------------------------------------------------------------------------
Loading.load = function() {
    Loader.reset();
    // Load loading textures
    Loader.add(2);
    this.texwhite   = THREE.ImageUtils.loadTexture(DATA_SPRITES + 'white.png',   null, function() { Loader.onLoad(); });
    this.texloading = THREE.ImageUtils.loadTexture(DATA_SPRITES + 'loading.png', null, function() { Loader.onLoad(); });
    this.hud        = new GLHud(GApp.renderer, settings.window.h,settings.window.h, false,false);
    Loader.start();
}

// Render
Loading.render = function(size, fade) {
    var w = this.texloading.image.width;
    var h = this.texloading.image.height;
    var x = (APP_W-w) / 2;
    var y = (APP_H-h) / 2;
    this.hud.render(this.texloading, x,y, w,h, 0, fade);
    // Recuadro
    y = y+h+5;
    this.hud.render(this.texwhite,   x,y,     w,2, 0, fade);
    this.hud.render(this.texwhite,   x,y,     2,h, 0, fade);
    this.hud.render(this.texwhite,   x,y+h-2, w,2, 0, fade);
    this.hud.render(this.texwhite,   x+w-2,y, 2,h, 0, fade);
    // Interior
    if (size > 0)
        this.hud.render(this.texwhite,   x+4,y+4, (w-8) * size,h-8, 0, fade);
}
