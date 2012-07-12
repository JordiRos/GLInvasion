/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Gui = Gui || {};

//--------------------------------------------------------------------------------------------------------
// Constructor
//--------------------------------------------------------------------------------------------------------
Gui.create = function() {
    var gui = { };
    gui.screens = [];
    gui.curScreen = null;

    // addScreen
    gui.addScreen = function(screen) {
        this.screens.push(screen);
        return screen;
    }
    
    // setScreen
    gui.setScreen = function(time, screen) {
        if (this.antScreen) this.antScreen.onHide(time);
        this.curScreen = screen;
        if (this.curScreen) this.curScreen.onShow(time);
    }
    
    // update
    gui.update = function(time, delta) {
        // Update screen
        if (this.curScreen)
            this.curScreen.update(time, delta);
    }

    // render
    gui.render = function() {
        if (this.curScreen)
            this.curScreen.render(1);
    }

    // Events
    gui.keyPress = function(key, press) {
        if (this.curScreen)
            return this.curScreen.keyPress(key, press);
        return false;
    }

    gui.mousePress = function(x,y, button, press) {
        if (this.curScreen)
            return this.curScreen.mousePress(x,y, button, press);
        return false;
    }
        
    gui.mouseMove = function(x,y, button) {
        if (this.curScreen)
            return this.curScreen.mouseMove(x,y, button);
        return false;
    }

    return gui;
}
