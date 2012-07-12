/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */
 
var Sprite = Sprite || {};

//--------------------------------------------------------------------------------------------------------
// Sprite
//--------------------------------------------------------------------------------------------------------
Sprite.create = function(world, sprite) {
    var sprite = { world: world, sprite: sprite.sprite, frame: -1, playing: false, blending: THREE.NormalBlending, overlay: false };

    // Update
    sprite.update = function(time, delta) {
        if (time > this.time) {
            if (this.loops > 0) {
                var loops = (time - this.time) / this.len;
                if (loops > this.loops) {
                    this.frame = this.seq.frameend;
                    this.playing = false;
                }
            }
            // Check frame
            if (this.playing) {
                var f = (time - this.time) % this.len;
                this.frame = Math.floor(Lerp(f / this.len, this.seq.frameini, this.seq.frameend+1));
            }
        }
    }

    // Render
    sprite.render = function(position, scale, angle, fade, flash) {
        if (this.frame >= 0) {
            if (this.overlay) {
                // World
                if (fade > 0)
                    this.world.drawSprite(this.sprite, this.frame, position, this.seq.size, this.seq.center, scale, -angle, fade, this.blending);
                if (flash > 0)
                    this.world.drawSprite(this.sprite, this.frame, position, this.seq.size, this.seq.center, scale, -angle, flash, THREE.AdditiveBlending);
            } else {
                // Map
                if (fade > 0)
                    this.world.map.drawSprite(this.sprite, this.frame, position, this.seq.size, this.seq.center, scale, -angle, fade, this.blending);
                if (flash > 0)
                    this.world.map.drawSprite(this.sprite, this.frame, position, this.seq.size, this.seq.center, scale, -angle, flash, THREE.AdditiveBlending);
            }
        }
    }

    // Render
    sprite.renderPoints = function(points, position, scale, angle, fade, flash) {
        if (this.frame >= 0) {
            if (this.overlay) {
                // World
                if (fade > 0)
                    this.world.drawSpritePoints(this.sprite, this.frame, points, position, scale, -angle, fade, this.blending);
                if (flash > 0)
                    this.world.drawSpritePoints(this.sprite, this.frame, points, position, scale, -angle, flash, THREE.AdditiveBlending);
            } else {
                // Map
                if (fade > 0)
                    this.world.map.drawSpritePoints(this.sprite, this.frame, points, position, scale, -angle, fade, this.blending);
                if (flash > 0)
                    this.world.map.drawSpritePoints(this.sprite, this.frame, points, position, scale, -angle, flash, THREE.AdditiveBlending);
            }
        }
    }

    // Reset
    sprite.reset = function() {
        this.frame = -1;
        this.seq = null;
        this.playing = false;
    }

    // SetSeq
    sprite.setSeq = function(seq, setframe) {
        this.playing = false;
        this.seq = seq ? this.sprite.getSeq(seq) : this.sprite.getSeq('Main');
        if (setframe) this.frame = this.seq.frameini;
    }

    // SetFrame
    sprite.setFrame = function(frame) {
        this.frame = frame;
    }

    // Play
    sprite.play = function(time, len, loops) {
        this.time = time;
        this.len = len !== undefined ? len : 1;
        this.loops = loops !== undefined ? loops : 1;
        this.playing = true;
        //this.frame = this.seq.frameini;
    }

    // Play
    sprite.playSeq = function(time, seq, len, loops) {
        this.setSeq(seq);
        this.play(time, len, loops);
    }

    return sprite;
}
