/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var AnimLabel = AnimLabel || { };

//--------------------------------------------------------------------------------------------------------
// Draw FadeIn
//--------------------------------------------------------------------------------------------------------
AnimLabel.drawFadeIn = function(world, time, timeini, len) {
    var time = time - (timeini - time);
    var fade = MTime01(time, 0, len);
    if (fade > 0)
        world.hud.render(Textures.Color.texture, 0,0, APP_W,APP_H, 0, fade, THREE.AdditiveBlending);
}

AnimLabel.drawFadeOut = function(world, time, timeini, len) {
    var time = time - (timeini - time);
    var fade = 1 - MTime01(time, 0, len);
    if (fade > 0)
        world.hud.render(Textures.Color.texture, 0,0, APP_W,APP_H, 0, fade, THREE.AdditiveBlending);
}

//--------------------------------------------------------------------------------------------------------
// Draw Stage Label
//--------------------------------------------------------------------------------------------------------
AnimLabel.drawStage = function(world, time, timeini, len, fade, y, texture) {
    var time = time - (timeini - time);
    var LEN = len;
    var FADE = fade;
    var TFIN = LEN - FADE;
    if (time < LEN) {
        // Calc pos
        var w = texture.image.width;
        var h = texture.image.height;
        var x = 0;
        if (time <= FADE) {
            var t = MTime01(time, 0, FADE)
            x = TWEEN.Ease(t, APP_W,0, TWEEN.Func.Sine, TWEEN.Type.EaseOut);
        } else if (time >= TFIN) {
            var t = MTime01(time, TFIN, FADE)
            x = TWEEN.Ease(t, 0,-APP_W, TWEEN.Func.Sine, TWEEN.Type.EaseIn);
        }
        // Render
        world.hud.render(texture, x,y, w,h, 0, 1, THREE.NormalBlending);
    }
}

//--------------------------------------------------------------------------------------------------------
// Draw Warning
//--------------------------------------------------------------------------------------------------------
AnimLabel.drawWarning = function(world, time, timeini, len, fade, y, texture) {
    var time = time - (timeini - time);
    var LEN = len;
    var FADE = fade;
    var TFIN = LEN - FADE;
    if (time < LEN) {
        // Calc pos
        var w = texture.image.width;
        var h = texture.image.height;
        var x = 0;
        if (time <= FADE) {
            var t = MTime01(time, 0, FADE)
            x = TWEEN.Ease(t, APP_W,0, TWEEN.Func.Sine, TWEEN.Type.EaseOut);
        } else if (time >= TFIN) {
            var t = MTime01(time, TFIN, FADE)
            x = TWEEN.Ease(t, 0,-APP_W, TWEEN.Func.Sine, TWEEN.Type.EaseIn);
        }
        // Render
		var f = MSin(time * 15, 0.5, 1.0);
        world.hud.render(texture, x,y, w,h, 0, f, THREE.NormalBlending);
    }
}
