/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Path = Path || {};

//--------------------------------------------------------------------------------------------------------
// Path
// Nodes: { x, y, t }     // Node Time
//--------------------------------------------------------------------------------------------------------
Path.getTimeIni = function(path) {
    return path[0].t;
}

Path.getTimeEnd = function(path) {
    var p = path[path.length-1];
    return (p.tf === undefined) ? p.t : p.tf;
}

Path.getLength = function(path) {
    var t0 = Path.getTimeIni(path);
    var t1 = Path.getTimeEnd(path);
    return t1 - t0;
}

//--------------------------------------------------------------------------------------------------------
// Path
// Nodes: { x, y, t } // Node Time
//--------------------------------------------------------------------------------------------------------
Path.getPoint = function(path, time) {

    //-------------------------------------------------------------------------------------------------------- 
    // Catmull-Rom interpolation
    // From: http://www.dxstudio.com/guide_content.aspx?id=70a2b2cf-193e-4019-859c-28210b1da81f
    //--------------------------------------------------------------------------------------------------------
    function lerpPoint(P0, P1, P2, P3, u)
    {
        var u3 = u * u * u;
        var u2 = u * u;
        var f1 = -0.5 * u3 + u2 - 0.5 * u;
        var f2 =  1.5 * u3 - 2.5 * u2 + 1.0;
        var f3 = -1.5 * u3 + 2.0 * u2 + 0.5 * u;
        var f4 =  0.5 * u3 - 0.5 * u2;
        var x = P0.x * f1 + P1.x * f2 + P2.x * f3 + P3.x * f4;
        var y = P0.y * f1 + P1.y * f2 + P2.y * f3 + P3.y * f4;
        return { x: x, y: y };
    }

    function nextPoint(path, idx, dir) {
        var p = idx+dir;
        p = Math.max(p, 0);
        p = Math.min(p, path.length-1);
        return path[p];
    }
    
    // getPosition in specified time
    time = Math.max(time, Path.getTimeIni(path));
    time = Math.min(time, Path.getTimeEnd(path));
    for (var i = 0; i < path.length; i++) {
        var p1 = nextPoint(path, i, 0);
        var p2 = nextPoint(path, i, 1);
        var ti = p1.t;
        var tf = p2.t;
        if (time >= ti && time < tf) {
            var p3 = nextPoint(path, i, 2);
            var p0 = nextPoint(path, i,-1);
            return lerpPoint(p0, p1, p2, p3, (time - ti) / (tf - ti));
        }
    }
    return { x: 0, y: 0 };
}

//--------------------------------------------------------------------------------------------------------
// Path
// Nodes: { x, y, t }     // Node Time
// Last:  { x, y, t, tf } // Node Time + Last Time (loop!)
//--------------------------------------------------------------------------------------------------------
Path.getPointLoop = function(path, time) {

    //-------------------------------------------------------------------------------------------------------- 
    // Catmull-Rom interpolation
    // From: http://www.dxstudio.com/guide_content.aspx?id=70a2b2cf-193e-4019-859c-28210b1da81f
    //--------------------------------------------------------------------------------------------------------
    function lerpPoint(P0, P1, P2, P3, u)
    {
        var u3 = u * u * u;
        var u2 = u * u;
        var f1 = -0.5 * u3 + u2 - 0.5 * u;
        var f2 =  1.5 * u3 - 2.5 * u2 + 1.0;
        var f3 = -1.5 * u3 + 2.0 * u2 + 0.5 * u;
        var f4 =  0.5 * u3 - 0.5 * u2;
        var x = P0.x * f1 + P1.x * f2 + P2.x * f3 + P3.x * f4;
        var y = P0.y * f1 + P1.y * f2 + P2.y * f3 + P3.y * f4;
        return { x: x, y: y };
    }

    function nextPoint(path, idx, dir) {
        return path[(idx+dir+path.length) % path.length];
    }
    
    // getPosition in specified time
    time = time % Path.getTimeEnd(path);
    for (var i = 0; i < path.length; i++) {
        var p1 = nextPoint(path, i, 0);
        var p2 = nextPoint(path, i, 1);
        var ti = p1.t;
        var tf = p2.t;
        if (i == (path.length-1))
            tf = Path.getTimeEnd(path);
        if (time >= ti && time < tf) {
            var p3 = nextPoint(path, i, 2);
            var p0 = nextPoint(path, i,-1);
            return lerpPoint(p0, p1, p2, p3, (time - t1) / (tf - ti));
        }
    }
    return { x: 0, y: 0 };
}
