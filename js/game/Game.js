/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Game = Game || {};
Game.Instance = null;

GameState = { LOADING: 1, LOADING_DATA: 2, LOADED: 3 };

//this.rt = new THREE.WebGLRenderTarget(settings.window.w * 2, settings.window.h * 2, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat });

//--------------------------------------------------------------------------------------------------------
// Constructor
//--------------------------------------------------------------------------------------------------------
Game = function(settings) {
    Game.Instance = this;
    // Load main data
    GLog('Game', 'Loading...');
    this.state = GameState.LOADING;
    this.loaded = false;
    Loading.load();
    // DOMEvents
    document.addEventListener('keydown',   function(e) { Game.Instance.onKeyDown  (e) }, true);
    document.addEventListener('keyup',     function(e) { Game.Instance.onKeyUp    (e) }, true);
    document.addEventListener('mousedown', function(e) { Game.Instance.onMouseDown(e) }, true);
    document.addEventListener('mouseup',   function(e) { Game.Instance.onMouseUp  (e) }, true);
    document.addEventListener('mousemove', function(e) { Game.Instance.onMouseMove(e) }, true);
    // Canvas relMouseCoords
    this.relMouseCoords = function(x, y) {
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var canvasX = 0;
        var canvasY = 0;
        var currentElement = settings.container;
        do {
            totalOffsetX += currentElement.offsetLeft;
            totalOffsetY += currentElement.offsetTop;
        }
        while(currentElement = currentElement.offsetParent);
        canvasX = ((x - totalOffsetX) + (settings.canvassize / 2.0)) * (APP_H / settings.canvassize); 
        canvasY = ((y - totalOffsetY) + (settings.canvassize / 2.0)) * (APP_H / settings.canvassize);
        GLog('Game', 'Mouse Coords: ' + x + '/' + y + ' => ' + canvasX + '/' + canvasY);
        return {x: canvasX, y: canvasY}
    }

    // Create Gui
    this.gui = Gui.create();
    this.screenMain  = this.gui.addScreen(ScreenMain.create());
    this.screenGame  = this.gui.addScreen(ScreenGame.create());
}


//--------------------------------------------------------------------------------------------------------
// Load
//--------------------------------------------------------------------------------------------------------
Game.prototype.load = function(time, delta) {
    Loader.reset();
    // Load data
    GLog('Game', 'Loading fonts...');
    for (var font in Fonts) {
        Fonts[font].font = Font.create(Fonts[font]);
        Fonts[font].font.load();
    }
    GLog('Game', 'Loading textures...');
    for (var texture in Textures) {
        Loader.add(1);
        Textures[texture].texture = THREE.ImageUtils.loadTexture(Textures[texture].file, null, function(texture, error) {
            if (error) GLog('Game', 'Error loading texture: ' + texture);
            Loader.onLoad();
        });
    }
    GLog('Game', 'Loading sprites...');
    for (var sprite in Sprites) {
        var spr = Sprites[sprite];
        spr.sprite = spr.cls.create(spr);
        spr.sprite.load();
    }
    GLog('Game', 'Loading facebook friends...');
    for (var i = 0; i < settings.friends.length; i++) {
        settings.friends[i].sprite = SpriteSeq.create({ texture: settings.friends[i].img });
        settings.friends[i].sprite.load();
    }
    GLog('Game', 'Loading sounds...');
    Sounds.load();
    // Start loading
    Loader.start();
}


//--------------------------------------------------------------------------------------------------------
// Init
//--------------------------------------------------------------------------------------------------------
Game.prototype.init = function(time, delta) {
    GLog('Game', 'Init Data...');
    // Fonts
    for (var font in Fonts)
        Fonts[font].font.init();
    // Sprites
    for (var sprite in Sprites)
        Sprites[sprite].sprite.init();
    // FB
    for (var i = 0; i < settings.friends.length; i++)
        settings.friends[i].sprite.init();
}


//--------------------------------------------------------------------------------------------------------
// Update
//--------------------------------------------------------------------------------------------------------
Game.prototype.update = function(time, delta) {
    switch (this.state) {
        // Loading
        case GameState.LOADING:
            if (Loader.isLoaded()) {
                GLog('Game', 'State: LOADING complete');
                this.state = GameState.LOADING_DATA;
                this.load();
            }
            break;
        // Loading Data
        case GameState.LOADING_DATA:
            if (Loader.isLoaded()) {
                GLog('Game', 'State: LOADING_DATA complete');
                this.state = GameState.LOADED;
                this.loaded = true;
                this.init();
                // Set screen
                this.gui.setScreen(time, this.screenMain);
                //this.gui.setScreen(time, this.screenGame);
            }
            break;
    }
    // Run
    if (this.loaded)
        this.gui.update(time, delta);
}


//--------------------------------------------------------------------------------------------------------
// Render
//--------------------------------------------------------------------------------------------------------
Game.prototype.render = function() {
    GApp.renderer.setClearColorHex(0, 1);
    GApp.renderer.clear();
    switch (this.state) {
        // Loading
        case GameState.LOADING:
            break;
        // Loading Data
        case GameState.LOADING_DATA:
            Loading.render(Loader.getCompleted(), 1);
            break;
        // Loaded
        case GameState.LOADED:
            this.gui.render(1);
            break;
    }
}


//--------------------------------------------------------------------------------------------------------
// Events
//--------------------------------------------------------------------------------------------------------    
Game.prototype.onKeyDown = function(e) {
    if (this.loaded) {
        if (this.gui.keyPress(e.keyCode, true))
            e.preventDefault();
    }
}

Game.prototype.onKeyUp = function(e) {
    if (this.loaded) {
        if (this.gui.keyPress(e.keyCode, false))
            e.preventDefault();
    }
}

Game.prototype.onMouseDown = function(e) {
    if (this.loaded) {
        var pos = this.relMouseCoords(e.pageX, e.pageY);
        GLog('Game', 'MouseDown: ' + pos.x + ' / ' + pos.y);
        if (this.gui.mousePress(pos.x, pos.y, e.button, true))
            e.preventDefault();        
    }
}

Game.prototype.onMouseUp = function(e) {
    if (this.loaded) {
        var pos = this.relMouseCoords(e.pageX, e.pageY);
        if (this.gui.mousePress(pos.x, pos.y, e.button, false))
            e.preventDefault();
    }
}

Game.prototype.onMouseMove = function(e) {
    if (this.loaded) {
        var pos = this.relMouseCoords(e.pageX, e.pageY);
        if (this.gui.mouseMove(pos.x, pos.y, e.button))
            e.preventDefault();
    }
}
