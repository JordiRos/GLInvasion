/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Decals = Decals || [];

var _DecalPosition = { x: 0, y: 0 };
var _DecalScale = { x: 0, y: 0 };

// Enemy
Decals.INFLIG  = { scale: { x: 1.2, y: 1.2 }, num: 3, radius: 7,  angle1: 0, angle2: 360, len: 0.15, loops: -1, sprite: Sprites.Decals, randompos: 2 };
Decals.INFPES  = { scale: { x: 1.3, y: 1.3 }, num: 4, radius: 10, angle1: 0, angle2: 360, len: 0.15, loops: -1, sprite: Sprites.Decals, randompos: 4 };
Decals.BIGTANK = { scale: { x: 1.4, y: 1.4 }, num: 6, radius: 15, angle1: 0, angle2: 360, len: 0.15, loops: -1, sprite: Sprites.Decals, randompos: 4 };

//--------------------------------------------------------------------------------------------------------
// create
// Create a group of decals
//--------------------------------------------------------------------------------------------------------
Decals.create = function(world, time, position, speed, params) {
    // Params
    var num = params.num;
    var radius = params.radius;
    var angle1 = params.angle1;
    var angle2 = params.angle2;
    var len = params.len;
    var loops = params.loops ? params.loops : 1;
    var randomsize = params.randomsize;
    var randompos = params.randompos;

    // Populate
    var angled = (angle2-angle1) / num;
    for (var i = 0; i < num; i++) {
        var p = PosRotate(angle1 + angled*i + angled * 0.5, radius);
        var s = randomsize ? MRandom(-randomsize, randomsize) : 0;
        var rx = randompos ? MRandom(-randompos, randompos) : 0;
        var ry = randompos ? MRandom(-randompos, randompos) : 0;
        _ExplPosition.x = p.x + position.x + rx;
        _ExplPosition.y = p.y + position.y + ry;
        _ExplScale.x = params.scale.x + s;
        _ExplScale.y = params.scale.y + s;
        // Entity
        var ent = world.decals.add(EntitySprite.create(world, 'Decal', { sprite: params.sprite, linkmap: true }));
        ent.start(time, params.seq, _ExplPosition, _ExplScale, speed, 0,0, len + MRandom(0,0.15), loops);
    }
}
