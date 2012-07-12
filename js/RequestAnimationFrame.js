/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

if (!window.requestAnimationFrame) {
    var request = function(callback, element) {
        window.setTimeout(callback, 1000 / 60);
    };
	window.requestAnimationFrame =  window.webkitRequestAnimationFrame ||
                                    window.mozRequestAnimationFrame ||
                                    window.oRequestAnimationFrame ||
                                    window.msRequestAnimationFrame ||
                                    request;
}
