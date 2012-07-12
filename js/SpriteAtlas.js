/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */
 
var SpriteAtlas = SpriteAtlas || {};

//--------------------------------------------------------------------------------------------------------
// SpriteAtlas
//--------------------------------------------------------------------------------------------------------
SpriteAtlas.create = function(params) {
    var sprites = { params: params };
    
    // Load
    sprites.load = function() {
        Loader.add(1);
        this.texture = THREE.ImageUtils.loadTexture(this.params.texture, null, function(texture, error) {
            if (error) GLog('Game', 'Error loading texture: ' + texture.src);
            Loader.onLoad();
        });
    }
    
    // Init
    sprites.init = function() {
        var iw = 1 / this.texture.image.width;
        var ih = 1 / this.texture.image.height;
        // Frames
        this.frames = [];
        for (var i = 0; i < this.params.frames.length; i++) {
            var f = this.params.frames[i];
            this.frames[i] = {};
            this.frames[i].rect = { x: f.rect.x * iw, y: f.rect.y * ih, w: f.rect.w * iw, h: f.rect.h * ih };
            this.frames[i].size = { x: f.rect.w, y: f.rect.h };
        }
        // Sequences
        this.seq = this.params.sequences;
        for (var seq in this.seq) {
            var s = this.seq[seq];
            if (s.center === undefined)
                s.center = { x: s.size.x / 2, y: s.size.y / 2 };
        }
    }

    // Gets
    sprites.getSeq = function(name) { return this.seq[name]; }
    sprites.getSprite = function(frame) { return this.frames[frame]; }
    sprites.getFrame = function(frame) { return this.frames[frame].rect; }
    sprites.getCenter = function(frame) { return this.frames[frame].center; }
    sprites.getSize = function(frame) { return this.frames[frame].size; }

    return sprites;
}
