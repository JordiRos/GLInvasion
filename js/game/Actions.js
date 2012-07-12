/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Actions = Actions || { time: 0 };

// Parse
Actions.parse = function(entity, time, timebase, timeoffset, actions) {
    var b = Actions.time - timebase;
    for (var i = 0; i < actions.length; i++) {
        var a = actions[i];
        var t = a.time + timeoffset;
        if (b < t && time >= t)
            a.action(entity, time);
    }
}

// Update
Actions.update = function(time) {
    Actions.time = time;
}
