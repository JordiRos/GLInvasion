/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

// Debug
var MODE_EDITOR = 0;
var LOG = true;

// Paths
var DATA_PATH = 'data/';
var DATA_FONTS = DATA_PATH + 'fonts/';
var DATA_TEXTURES = DATA_PATH + 'textures/';
var DATA_SPRITES = DATA_PATH + 'sprites/';
var DATA_SOUNDS = DATA_PATH + 'sounds/';
var DATA_MAPS = DATA_PATH + 'maps/';

// Vars
var APP_W = 800;
var APP_H = 800;
var FRAME = 0.016;
var FRAME2 = FRAME * 2;
var FRAME3 = FRAME * 3;
var FRAME4 = FRAME * 4;
var FRAME5 = FRAME * 5;
var MAX_PLAYERS = 1;
var TIME_FLASH_ENEMY = 0.08;
var TIME_SHOCK  = 0.4;
var TIME_SHOCK_FADE = 0.2;
var TIME_DELAY_BOSS = 2;
var STAR_RADIUS = 300;
var STAR_SPEED  = 900;
var STAR_BREAK  = 0.80;
var FLYING_STAR_SPEED = -200;
var SHIP_DELAY_PLASMA = 0.08;
var SHIP_DELAY_LASER = 0.04;
var SHIP_DELAY_SHOCK = 2;
var SHIP_MAX_POWER = 5;
var SHIP_MAX_SHOCK = 5;
var SHIP_MAX_LASER = 25;
var SHIP_VELOCITY = 450;
var SHIP_ANGLE_SPEED = 15;
var SHIP_REC_LASER = 4;

var VEC_ZERO = { x: 0, y: 0, z: 0 };
var VEC_ONE  = { x: 1, y: 1, z: 1 };

var EnemyState = {
    WAITING: 0,
    ACTIVE: 1,
    HIDDEN: 2,
    DEAD: 3,
};