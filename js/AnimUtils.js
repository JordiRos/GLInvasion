/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

//--------------------------------------------------------------------------------------------------------
// Angles
//--------------------------------------------------------------------------------------------------------
function deg2rad(angle) {
	return Math.PI * angle / 180;
}

function rad2deg(angle) {
	return 180 * angle / Math.PI;
}

//--------------------------------------------------------------------------------------------------------
// Round
//--------------------------------------------------------------------------------------------------------
function Round(num, dec) {
	return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
}

//--------------------------------------------------------------------------------------------------------
// Random
//--------------------------------------------------------------------------------------------------------
function MRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function IRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

//--------------------------------------------------------------------------------------------------------
// Sin with range
//--------------------------------------------------------------------------------------------------------
function MSin(t, min, max) {
	return ((Math.sin(t) * 0.5) + 0.5) * (max - min) + min;
}

//--------------------------------------------------------------------------------------------------------
// Normalized time
//--------------------------------------------------------------------------------------------------------
function MTime01(cur, ini, len) {
	if (len > 0) {
		if (cur > ini) {
			dt = cur - ini;
			if (dt > len) dt = len;
			return (dt / len);
		}
		return 0;
	}
	return 1;
}

function MTime10(cur, ini, len) {
	return 1 - MTime01(cur, ini, len);
}

function MTime010(cur, ini, len) {
	if (len > 0) {
        if (cur > ini) {
            var hl = len / 2;
            var dt = cur - ini;
            if (dt < hl ) return ((dt      ) / hl);
            if (dt < len) return ((len - dt) / hl);
            return 0;
        }
		return 0;
	}
	return 1.0;
}

//--------------------------------------------------------------------------------------------------------
// Rotate
//--------------------------------------------------------------------------------------------------------
function PosRotate(angle, dist) {
    var r = RotateVector2({ x: 0, y: 1 }, deg2rad(-angle));
    r.x = r.x * dist;
    r.y = r.y * dist;
    return r;
}

function RotateVector2(v, angle) {
    var r = { x: 0, y: 0 };
    var ca = Math.cos(angle);
    var sa = Math.sin(angle);
    r.x = v.x * ca - v.y * sa;
    r.y = v.x * sa + v.y * ca;
    return r;
}

//--------------------------------------------------------------------------------------------------------
// Fixed MultiplyVector3
//--------------------------------------------------------------------------------------------------------
function MultiplyVector3(m, v) {
    var vx = v.x, vy = v.y, vz = v.z;
    var d = ( m.n41 * vx + m.n42 * vy + m.n43 * vz + m.n44 );
    if (d > 0) {
        d = 1 / d;
        v.x = ( m.n11 * vx + m.n12 * vy + m.n13 * vz + m.n14 ) * d;
        v.y = ( m.n21 * vx + m.n22 * vy + m.n23 * vz + m.n24 ) * d;
        v.z = ( m.n31 * vx + m.n32 * vy + m.n33 * vz + m.n34 ) * d;
    }
};

// Delete array elements based on func conditional
function DeleteArray(array, funcDelete) {
    var i = 0;
    while (i < array.length) {
        // Condition to delete element
        if (funcDelete(array[i])) {
            for (var j = i; j < (array.length-1); j++)
                array[j] = array[j+1];
            array.length--;
        } else i++;
    }
}

//--------------------------------------------------------------------------------------------------------
// Lerp
//--------------------------------------------------------------------------------------------------------
function Lerp(step, a, b) {
    return (b-a)*step + a;
}

function AnimLerpSingle(step, r, a, b) {
    if      (step <= 0) r = a;
    else if (step >= 1) r = b;
    else                r = Lerp(step, a, b);
    return r;
}

function AnimLerpVector2(step, r, a, b) {
    if      (step <= 0) r.set(a.x, a.y);
    else if (step >= 1) r.set(b.x, b.y);
    else {
        r.x = Lerp(step, a.x, b.x);
        r.y = Lerp(step, a.y, b.y);
    }
    return r;
}

function AnimLerpVector3(step, r, a, b) {
    if      (step <= 0) r.set(a.x, a.y, a.z);
    else if (step >= 1) r.set(b.x, b.y, b.z);
    else {
        r.x = Lerp(step, a.x, b.x);
        r.y = Lerp(step, a.y, b.y);
        r.z = Lerp(step, a.z, b.z);
    }
    return r;
}

function AnimLerpQuaternion(step, r, a, b) {
    if      (step <= 0) r.set(a.x, a.y, a.z, a.w);
    else if (step >= 1) r.set(b.x, b.y, b.z, b.w);
    else                r = THREE.Quaternion.slerp(a, b, r, step);
    return r;
}

//--------------------------------------------------------------------------------------------------------
// Vector2
//--------------------------------------------------------------------------------------------------------
function NormalizeVector2(v) {
    var d = DistanceVector2(v.x, v.y);
    if (d != 0) d = 1 / d;
    v.x *= d;
    v.y *= d;
    return v;
}

function DistanceVector2(x, y) {
    return Math.sqrt(x*x + y*y);
}

function AngleFromVector(x, y) {
    return rad2deg(Math.atan2(x, y));
}

function VectorFromAngle(angle, dist, vector) {
    if (dist === undefined) dist = 1;
    if (vector === undefined) vector = { };
    vector.x = Math.sin(angle) * dist;
    vector.y = Math.cos(angle) * dist;
    return vector;
}

function PointLineDistance(x, y, x0, y0, x1, y1) {
    var a = y0 - y1, b = x1 - x0, c = x0 * y1 - y0 * x1;
    return (a * x + b * y + c) / Math.sqrt(a * a + b * b);
}