/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */
 
var SpriteSeq = SpriteSeq || {};

//--------------------------------------------------------------------------------------------------------
// SpriteSeq
//--------------------------------------------------------------------------------------------------------
SpriteSeq.create = function(params) {
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
        var cols = (this.params.cols) ? this.params.cols : 1;
        var rows = (this.params.rows) ? this.params.rows : 1;
        var frames = (this.params.frames) ? this.params.frames : 1;
        var size = { x:  this.texture.image.width / cols, y: this.texture.image.height / rows };
        var center = this.params.center ? this.params.center : { x: size.x / 2, y: size.y / 2 };
        // Load frames
        var idx = 0;
        this.frames = [];
        for (var i = 0; i < rows; i++) {
            for (j = 0; j < cols; j++) {
                if (idx < frames) {
                    this.frames[idx] = { x: j / cols, y: i / rows, w: 1.0 / cols, h: 1.0 / rows };
                    idx++;
                }
            }
        }
        // Sequences
        this.seq = this.params.sequences ? this.params.sequences : {};
        for (var seq in this.seq) {
            var s = this.seq[seq];
            s.size = size;
            s.center = center;
        }        
        // Add main sequence
        this.seq.Main = { size: size, center: center, frameini: 0, frameend: frames-1 };
        this.seq.MainRev = { size: size, center: center, frameini: frames-1, frameend: 0 };
        this.seq.First = { size: size, center: center, frameini: 0, frameend: 0 };
        this.seq.Last = { size: size, center: center, frameini: frames-1, frameend: frames-1 };
    }

    // Gets
    sprites.getSeq = function(seq) { return this.seq[seq]; }
    sprites.getFrame = function(frame) { return this.frames[frame]; }

    return sprites;
}
