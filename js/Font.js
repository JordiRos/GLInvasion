/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */
 
var Font = Font || {};

Font.LEFT   = 0;
Font.CENTER = 1;
Font.RIGHT  = 2;

//--------------------------------------------------------------------------------------------------------
// Font
//--------------------------------------------------------------------------------------------------------
Font.create = function(params) {
    var font = { params: params };
    
    // Load
    font.load = function() {
        Loader.add(1);
        this.tex = THREE.ImageUtils.loadTexture(params.tex, null, function() { Loader.onLoad(); });
    }
    
    // Init
    font.init = function() {
        this.chars = [];
        for (var i = 0; i < this.params.chars.length; i++) {
            var c = this.params.chars[i];
            this.chars[c.ch] = {};
            this.chars[c.ch].x = this.params.chars[i].x / this.tex.image.width;
            this.chars[c.ch].y = this.params.chars[i].y / this.tex.image.height; 
            this.chars[c.ch].w = this.params.chars[i].w / this.tex.image.width;
            this.chars[c.ch].h = this.params.chars[i].h / this.tex.image.height;
            this.chars[c.ch].rw = this.params.chars[i].w;
            this.chars[c.ch].rh = this.params.chars[i].h;
        }
    }

    // Render
    font.render = function(hud, text, x,y, scale, fade, blending) {
        for (var i = 0; i < text.length; i++) {
            var c = this.chars[text[i]];
            if (c) {
                hud.render(this.tex, x,y, c.rw*scale,c.rh*scale, 0, fade, blending, c);
                x+= (c.rw + this.params.kerning) * scale;
            }
        }
    }
    
    // RenderAlign
    font.renderAlign = function(hud, text, x,y, w, align, scale, fade, blending) {
        // Calc Length
        var width = 0;
        for (var i = 0; i < text.length; i++) {
            var c = this.chars[text[i]];
            if (c)
                width+= (c.rw + this.params.kerning) * scale;
        }
        if (align == Font.CENTER)
            x+= (w-width) / 2;
        if (align == Font.RIGHT)
            x+= (w-width);
        // Render
        var w = 0;
        for (var i = 0; i < text.length; i++) {
            var c = this.chars[text[i]];
            if (c) {
                hud.render(this.tex, x,y, c.rw*scale,c.rh*scale, 0, fade, blending, c);
                x+= (c.rw + this.params.kerning) * scale;
            }
        }
    }

    return font;
}
