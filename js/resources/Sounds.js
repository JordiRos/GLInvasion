/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Sounds = {
    Plasma: { file: 'enemy_shot_old', max: 3 },
    Explosion: { file: 'explosion' , max: 3 },
    ExplosionShort: { file: 'explosionShort', max: 3 },

    // Functions
    load: function() {
        // buzz.defaults.preload = true;
        // buzz.defaults.autoplay = false;
        // buzz.defaults.loop = false;
        // buzz.defaults.formats = ["wav"];
        for (var sound in this) {
            if (sound != 'load') {
                this[sound].sounds = [];
                this[sound].cur = 0;
                for (var i = 0; i < this[sound].max; i++) {
                    /* @TEMP
                    Loader.add(1);
                    this[sound].sounds[i] = new buzz.sound(DATA_SOUNDS + this[sound].file);
                    this[sound].sounds[i].bind("canplaythrough", function(e) {
                        Loader.onLoad();
                    });
                    */
                }
                // Play
                this[sound].play = function() {
                    this.cur = (this.cur + 1) % this.max;
                    //this.sounds[this.cur].play();
                }
            }
        }
    }
};
