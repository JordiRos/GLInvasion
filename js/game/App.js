/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var GApp;
var App = App || {};

// RequestAnimationFrame
function AppAnimate() {
    requestAnimationFrame(AppAnimate);
    GApp.run();
}

function AppResize() {
    var h = APP_H;
    if (window.innerHeight < APP_H) {
        var h = window.innerHeight;
    }
    var size = h + 'px';
    settings.canvassize = h;
    settings.canvas.style.marginLeft = -0.5 * h + 'px';
    settings.canvas.style.marginTop = -0.5 * h + 'px';
    settings.canvas.style.width = size;
    settings.canvas.style.height = size;
}

// Log
function GLog(module, log) {
    if (LOG)
        console.log('[' + module + '] ' + log);
}


//--------------------------------------------------------------------------------------------------------
// Constructor
//--------------------------------------------------------------------------------------------------------
App = function(settings) {
    GApp = this;
    GLog('GApp', 'Initializing GApp...');
    this.settings = settings;
    this.start = function() { AppAnimate(); }
    // OpenOrFocus
    window.openOrFocus = function(url, name) {
        if (!window.popups)
            window.popups = {};
        if (window.popups[name])
            window.popups[name].close();
        window.popups[name] = window.open(url, name);
    }
    // Renderer
    GLog('GApp', 'Creating WebGL Renderer ' + settings.window.w + 'x' + settings.window.h);
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setSize(settings.window.w, settings.window.h);
    this.renderer.autoClear = false;
    settings.canvas = this.renderer.domElement;
    settings.container.appendChild(this.renderer.domElement);
    
    // App fit
    window.addEventListener('resize', AppResize);
    AppResize();
    
    // @STATS
    /*
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '-50px';
    settings.container.appendChild(this.stats.domElement);
    */
    // Time
    this.timer = new Timer();
    this.time = 0;
    this.delta = 0;
    this.paused = false;    
    // Game
    this.game = new Game(settings);
}

//--------------------------------------------------------------------------------------------------------
// Run
//--------------------------------------------------------------------------------------------------------
App.prototype.run = function() {
    this.timer.update();
    // @STATS
    //this.stats.update();
    // Update and render
    this.time = this.timer.time;
    this.delta = this.timer.delta;    
    this.game.update(this.time, this.delta);
    this.game.render();
}
