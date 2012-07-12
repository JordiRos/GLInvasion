/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Powers = Powers || {};

// PowerUp
Powers.PowerUp = {
    sprite: Sprites.PowerUp,
    linkmap: false,
    radius: 28,
    seqlen: FRAME*32,
    // Shoot
    show: function(world, time, position, params) {
        // Entity
        var ent = world.powersH.add(EntityPower.create(world, 'POWERS', this));
        ent.show(time, position);
    },        
};

// ShockUp
Powers.ShockUp = {
    sprite: Sprites.ShockUp,
    linkmap: false,
    radius: 28,
    seqlen: FRAME*32,
    // Shoot
    show: function(world, time, position, params) {
        // Entity
        var ent = world.powersH.add(EntityPower.create(world, 'POWERS', this));
        ent.show(time, position);
    },        
};


// Star
Powers.StarL = {
    sprite: Sprites.Star,
    linkmap: true,
    radius: 42,
    seqlen: 1,
    score: 200,
    // Shoot
    show: function(world, time, position, params) {
        // Populate
        for (var i = 0; i < params.num; i++) {
            var p = VectorFromAngle(deg2rad(MRandom(0,360)), MRandom(0, params.radius));
            // Entity
            var ent = world.powersL.add(EntityPower.create(world, 'POWERS', this));
            ent.show(time, { x: position.x + p.x, y: position.y + p.y });
            ent.speed.x = p.x * 2;
            ent.speed.y = p.y * 2;
        }
    },        
};

// Star
Powers.StarH = {
    sprite: Sprites.Star,
    linkmap: true,
    radius: 42,
    seqlen: 1,
    score: 200,
    // Shoot
    show: function(world, time, position, params) {
        // Populate
        for (var i = 0; i < params.num; i++) {
            var p = VectorFromAngle(deg2rad(MRandom(0,360)), MRandom(0, params.radius));
            // Entity
            var ent = world.powersH.add(EntityPower.create(world, 'POWERS', this));
            ent.show(time, { x: position.x + p.x, y: position.y + p.y });
            ent.speed.x = p.x * 2;
            ent.speed.y = p.y * 2;
        }
    },        
};
    
// Built Powers
Powers.POWERUP  = { item: Powers.PowerUp };
Powers.SHOCKUP  = { item: Powers.ShockUp };
Powers.STARL_X1 = { item: Powers.StarL, num: 1,  radius: 0,  };
Powers.STARL_X3 = { item: Powers.StarL, num: 3,  radius: 30, };
Powers.STARL_X10= { item: Powers.StarL, num: 10, radius: 50, };
Powers.STARH_X1 = { item: Powers.StarH, num: 1,  radius: 0,  };
Powers.STARH_X3 = { item: Powers.StarH, num: 3,  radius: 30, };
Powers.STARH_X5 = { item: Powers.StarH, num: 5,  radius: 30, };
Powers.STARH_X10 = { item: Powers.StarH, num: 10,  radius: 50, };
Powers.STARH_X200 = { item: Powers.StarH, num: 200, radius: 300, };
