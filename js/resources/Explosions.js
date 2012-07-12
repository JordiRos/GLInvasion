/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Explosions = Explosions || [];

var _ExplPosition = { x: 0, y: 0 };
var _ExplScale    = { x: 0, y: 0 };

// Ship
Explosions.SHIP    = { scale: { x: 0.7, y: 0.7 }, num: 1, radius: 0,   angle1: 0, angle2: 360, len: FRAME5*13, loops: 1, delay: 0.0, sprite: Sprites.Expl_Aire,  sound: Sounds.ExplosionShort, high: true  };

// Enemies
Explosions.INFLIG    = { scale: { x: 0.6, y: 0.6 }, num: 1, radius: 0,   angle1: 0, angle2: 360, len: FRAME5*11, loops: 1, delay: 0.0, sprite: Sprites.Expl_Suelo, sound: Sounds.ExplosionShort, high: false };
Explosions.INFPES    = { scale: { x: 0.7, y: 0.7 }, num: 1, radius: 0,   angle1: 0, angle2: 360, len: FRAME5*11, loops: 1, delay: 0.0, sprite: Sprites.Expl_Suelo, sound: Sounds.ExplosionShort, high: false };
Explosions.TANKBIG   = { scale: { x: 1.0, y: 1.0 }, num: 1, radius: 0,   angle1: 0, angle2: 360, len: FRAME5*11, loops: 1, delay: 0.0, sprite: Sprites.Expl_Suelo, sound: Sounds.ExplosionShort, high: false };
Explosions.KAMI      = { scale: { x: 0.6, y: 0.6 }, num: 1, radius: 0,   angle1: 0, angle2: 360, len: FRAME5*13, loops: 1, delay: 0.0, sprite: Sprites.Expl_Aire,  sound: Sounds.ExplosionShort, high: true  };
Explosions.INFAIR    = { scale: { x: 0.7, y: 0.7 }, num: 1, radius: 0,   angle1: 0, angle2: 360, len: FRAME5*13, loops: 1, delay: 0.0, sprite: Sprites.Expl_Aire,  sound: Sounds.ExplosionShort, high: true  };
Explosions.BIGAIR    = { scale: { x: 1.0, y: 1.0 }, num: 1, radius: 0,   angle1: 0, angle2: 360, len: FRAME5*13, loops: 1, delay: 0.0, sprite: Sprites.Expl_Aire,  sound: Sounds.ExplosionShort, high: true  };
Explosions.BOSS1     = { scale: { x: 1.0, y: 1.0 }, num: 7, radius: 120, angle1: 0, angle2: 360, len: FRAME5*13, loops: 2, delay: 0.5, sprite: Sprites.Expl_Aire,  sound: Sounds.ExplosionShort, high: true  };
Explosions.BOSS1TEMP = { scale: { x: 1.0, y: 1.0 }, num: 7, radius: 120, angle1: 0, angle2: 360, len: FRAME5*13, loops: 1, delay: 0.3, sprite: Sprites.Expl_Aire,  sound: Sounds.ExplosionShort, high: true  };

//--------------------------------------------------------------------------------------------------------
// createCircle
// Create a loop of explosions between 2 angles with specified radius
//--------------------------------------------------------------------------------------------------------
Explosions.createCircle = function(world, time, position, speed, params) {

    // Sound
    if (params.sound)
        params.sound.play();
        
    // Params
    var num = params.num;
    var radius = params.radius;
    var angle1 = params.angle1;
    var angle2 = params.angle2;
    var len = params.len;
    var loops = params.loops ? params.loops : 1;
    var delay = params.delay;
    var randomsize = params.randomsize;
    var randompos = params.randompos;

    // Populate
    var angled = (angle2-angle1) / num;
    for (var i = 0; i < num; i++) {
        var p = PosRotate(angle1 + angled*i + angled * 0.5, radius);
        var t = time + ((delay > 0) ? MRandom(0, delay) : 0);
        var s = randomsize ? MRandom(-randomsize, randomsize) : 0;
        var rx = randompos ? MRandom(-randompos, randompos) : 0;
        var ry = randompos ? MRandom(-randompos, randompos) : 0;
        _ExplPosition.x = p.x + position.x + rx;
        _ExplPosition.y = p.y + position.y + ry;
        _ExplScale.x = params.scale.x + s;
        _ExplScale.y = params.scale.y + s;
        // Entity
        var entities = params.high ? world.explosionsH : world.explosionsL;
        var ent = entities.add(EntitySprite.create(world, 'Explosion', { sprite: params.sprite, linkmap: !params.high }));
        ent.start(t, params.seq, _ExplPosition, _ExplScale, speed, 0,0, len, loops);
    }
}
