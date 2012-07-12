/** TWEEN
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var TWEEN = TWEEN || [];
TWEEN.Func = { Linear: 1, Sine: 2, Quadratic: 3, Cubic: 4, };
TWEEN.Type = { EaseIn: 1, EaseOut: 2, EaseInOut: 3, };

TWEEN.Ease = function(step, a,b, func, type) {

    // EaseFunc: Sine
	this.SineEase = function(step, type) {
		switch (type) {
			case TWEEN.Type.EaseIn:    return this.SineEaseIn   (step);
			case TWEEN.Type.EaseOut:   return this.SineEaseOut  (step);
			case TWEEN.Type.EaseInOut: return this.SineEaseInOut(step);
		}
		return 0;
	}
	this.SineEaseIn    = function(step) { return Math.sin((step - 1) * Math.PI / 2.0) + 1; }
	this.SineEaseOut   = function(step) { return Math.sin(step * Math.PI / 2.0); }
	this.SineEaseInOut = function(step) { return Math.sin(step * Math.PI - Math.PI / 2.0) / 2.0 + 0.5; }

	// Calc value
	switch (func) {
		case TWEEN.Func.Linear: break;
        case TWEEN.Func.Sine: step = this.SineEase(step, type); break;
	}
    // Lerp
	return Lerp(step, a, b);
}