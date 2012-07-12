/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var ScreenGame = ScreenGame || {};

//--------------------------------------------------------------------------------------------------------
// Constructor
//--------------------------------------------------------------------------------------------------------
ScreenGame.create = function() {
    var screen = Control.create(0,0, APP_W,APP_H);
    screen.loading = false;

    // Update
    screen.update = function(time, delta) {
        if (this.loading) {
            if (Loader.isLoaded()) {
                this.world.init();
                this.world.start();
                this.world.update(time, delta);
                this.loading = false;
            }
        } else {
            this.world.update(time, delta);
        }
    }

    screen.render = function(fade) {
        if (this.loading) {
            Loading.render(fade);
        } else {
            this.world.render(fade);
        }
    }

    // Events
    screen.keyPress = function(key, press) {
        if (!this.loading)
            return this.world.keyPress(key, press);
        return false;
    }

    screen.mousePress = function(x,y, button, press) {
        if (!this.loading)
            return this.world.mousePress(x, y, button, press);
        return false;
    }
        
    screen.mouseMove = function(x,y, button) {
        if (!this.loading)
            this.world.mouseMove(x, y, button);
        return false;
    }

    // OnShow
    screen.onShow = function() {
        // Load game
        this.loading = true;
        GLog('ScreenGame', 'Loading world...');
        Loader.reset();
        this.world = World.create(this, settings);
        this.world.load();
        Loader.start();
    }
    
    return screen;
}
