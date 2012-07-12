/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Level1 = {
    name: 'Level 1',
    background: 'stage1.jpg',
    title: 'stage1_title.png',
    size: { x: 800, y: 4839 },
    speed: -60,
	timeWarning: 64,
    timeGameover: 66+202,

    // Enemies Low
    enemiesL: [

        // Barrera
        { name: 'INFLIG1.1', enemy: Enemies.InfLig, position: { x:-374, y: 898 }, actions: { actions: EnemyActions.InfLig1, offset: 1.4, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.2', enemy: Enemies.InfLig, position: { x:-248, y: 883 }, actions: { actions: EnemyActions.InfLig2, offset: 1.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.3', enemy: Enemies.InfLig, position: { x:-163, y: 897 }, actions: { actions: EnemyActions.InfLig1, offset: 1.8, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.4', enemy: Enemies.InfLig, position: { x:-80,  y: 861 }, actions: { actions: EnemyActions.InfLig2, offset: 2.0, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.5', enemy: Enemies.InfLig, position: { x: 13,  y: 875 }, actions: { actions: EnemyActions.InfLig1, offset: 2.2, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.6', enemy: Enemies.InfLig, position: { x: 100,  y: 907 }, actions: { actions: EnemyActions.InfLig2, offset: 2.2, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.7', enemy: Enemies.InfLig, position: { x: 165,  y: 897 }, actions: { actions: EnemyActions.InfLig1, offset: 2.2, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.8', enemy: Enemies.InfLig, position: { x: 230,  y: 889 }, actions: { actions: EnemyActions.InfLig2, offset: 2.2, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.9', enemy: Enemies.InfLig, position: { x: 293,  y: 878 }, actions: { actions: EnemyActions.InfLig1, offset: 2.2, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.10',enemy: Enemies.InfLig, position: { x: 359,  y: 860 }, actions: { actions: EnemyActions.InfLig2, offset: 2.2, }, item: Powers.STARL_X1, },

        { name: 'INFLIG1.11',enemy: Enemies.InfLig, position: { x: -42,  y: 922 }, actions: { actions: EnemyActions.InfLig1, offset: 1.4, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.12',enemy: Enemies.InfLig, position: { x:  40,  y: 946 }, actions: { actions: EnemyActions.InfLig2, offset: 1.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.13',enemy: Enemies.InfLig, position: { x:-303,  y: 1025 }, actions: { actions: EnemyActions.InfLig2, offset: 1.8, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.14',enemy: Enemies.InfLig, position: { x: 239,  y: 1124 }, actions: { actions: EnemyActions.InfLig2, offset: 1.2, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.15',enemy: Enemies.InfLig, position: { x: 85,   y: 1212 }, actions: { actions: EnemyActions.InfLig3, offset: 1.8, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.16',enemy: Enemies.InfLig, position: { x:-338,  y: 1146 }, actions: { actions: EnemyActions.InfLig1, offset: 1.7, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.17',enemy: Enemies.InfLig, position: { x: 347,  y: 1684 }, actions: { actions: EnemyActions.InfLig1, offset: 1.2, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.18',enemy: Enemies.InfLig, position: { x: 127,  y: 977 }, actions: { actions: EnemyActions.InfLig2, offset: 1.0, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.19',enemy: Enemies.InfLig, position: { x: 253,  y: 951 }, actions: { actions: EnemyActions.InfLig2, offset: 1.9, }, item: Powers.STARL_X1, },

        { name: 'INFLIG1.20',enemy: Enemies.InfLig, position: { x:-328,  y: 1212 }, actions: { actions: EnemyActions.InfLig1, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.21',enemy: Enemies.InfLig, position: { x:-256,  y: 1225 }, actions: { actions: EnemyActions.InfLig2, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG1.22',enemy: Enemies.InfLig, position: { x: 301,  y: 1673 }, actions: { actions: EnemyActions.InfLig3, offset: 1.9, }, item: Powers.STARL_X1, },

        { name: 'INFLIG2.1',enemy: Enemies.InfLig, position: { x:-346,  y: 2045 }, actions: { actions: EnemyActions.InfLig2, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG2.2',enemy: Enemies.InfLig, position: { x:-287,  y: 1965 }, actions: { actions: EnemyActions.InfLig3, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG2.3',enemy: Enemies.InfLig, position: { x:-214,  y: 2069 }, actions: { actions: EnemyActions.InfLig4, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG2.4',enemy: Enemies.InfLig, position: { x:-279,  y: 2149 }, actions: { actions: EnemyActions.InfLig1, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG2.5',enemy: Enemies.InfLig, position: { x: 248,  y: 2230 }, actions: { actions: EnemyActions.InfLig3, offset: 0.5, }, item: Powers.STARL_X1, },

        { name: 'INFLIG3.1',enemy: Enemies.InfLig, position: { x: 176,  y: 2681 }, actions: { actions: EnemyActions.InfLig2, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG3.2',enemy: Enemies.InfLig, position: { x: 240,  y: 2686 }, actions: { actions: EnemyActions.InfLig3, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG3.3',enemy: Enemies.InfLig, position: { x: 303,  y: 2698 }, actions: { actions: EnemyActions.InfLig4, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG3.4',enemy: Enemies.InfLig, position: { x: 362,  y: 2708 }, actions: { actions: EnemyActions.InfLig1, offset: 0.5, }, item: Powers.STARL_X1, },

        { name: 'INFLIG4.1',enemy: Enemies.InfLig, position: { x:-237,  y: 2796 }, actions: { actions: EnemyActions.InfLig2, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG4.2',enemy: Enemies.InfLig, position: { x:-163,  y: 2802 }, actions: { actions: EnemyActions.InfLig3, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG4.3',enemy: Enemies.InfLig, position: { x:-243,  y: 2883 }, actions: { actions: EnemyActions.InfLig1, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG4.4',enemy: Enemies.InfLig, position: { x:-318,  y: 2946 }, actions: { actions: EnemyActions.InfLig4, offset: 0.5, }, item: Powers.STARL_X1, },

        { name: 'INFLIG5.1',enemy: Enemies.InfLig, position: { x:-238,  y: 3451 }, actions: { actions: EnemyActions.InfLig2, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG5.2',enemy: Enemies.InfLig, position: { x:-126,  y: 3405 }, actions: { actions: EnemyActions.InfLig3, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG5.3',enemy: Enemies.InfLig, position: { x:-117,  y: 3327 }, actions: { actions: EnemyActions.InfLig4, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG5.4',enemy: Enemies.InfLig, position: { x:-212,  y: 3271 }, actions: { actions: EnemyActions.InfLig2, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG5.5',enemy: Enemies.InfLig, position: { x:-308,  y: 3308 }, actions: { actions: EnemyActions.InfLig3, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG5.6',enemy: Enemies.InfLig, position: { x:-332,  y: 3390 }, actions: { actions: EnemyActions.InfLig4, offset: 0.5, }, item: Powers.STARL_X1, },

        { name: 'INFLIG7.1', enemy: Enemies.InfLig, position: { x:-223, y: 3502 }, actions: { actions: EnemyActions.InfLig4, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG7.2', enemy: Enemies.InfLig, position: { x:-316, y: 3522 }, actions: { actions: EnemyActions.InfLig2, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG7.3', enemy: Enemies.InfLig, position: { x:-349, y: 3614 }, actions: { actions: EnemyActions.InfLig3, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG7.4', enemy: Enemies.InfLig, position: { x:-317, y: 3694 }, actions: { actions: EnemyActions.InfLig1, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG7.5', enemy: Enemies.InfLig, position: { x:-234, y: 3678 }, actions: { actions: EnemyActions.InfLig4, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG7.6', enemy: Enemies.InfLig, position: { x:-6,   y: 3628 }, actions: { actions: EnemyActions.InfLig2, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG7.7', enemy: Enemies.InfLig, position: { x: 70,  y: 3614 }, actions: { actions: EnemyActions.InfLig1, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG7.8', enemy: Enemies.InfLig, position: { x:-163, y: 3661 }, actions: { actions: EnemyActions.InfLig3, offset: 0.5, }, item: Powers.STARL_X1, },

        { name: 'INFLIG6.1', enemy: Enemies.InfLig, position: { x: 341,  y: 3661 }, actions: { actions: EnemyActions.InfLig4, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG6.2', enemy: Enemies.InfLig, position: { x: 362,  y: 3729 }, actions: { actions: EnemyActions.InfLig3, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG6.3', enemy: Enemies.InfLig, position: { x: 226,  y: 3714 }, actions: { actions: EnemyActions.InfLig3, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG6.4', enemy: Enemies.InfLig, position: { x: 129,  y: 3730 }, actions: { actions: EnemyActions.InfLig4, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG6.5', enemy: Enemies.InfLig, position: { x: 41,   y: 3745 }, actions: { actions: EnemyActions.InfLig4, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG6.6', enemy: Enemies.InfLig, position: { x: 253,  y: 3779 }, actions: { actions: EnemyActions.InfLig1, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG6.7', enemy: Enemies.InfLig, position: { x: 157,  y: 3800 }, actions: { actions: EnemyActions.InfLig2, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG6.8', enemy: Enemies.InfLig, position: { x: 71,   y: 3818 }, actions: { actions: EnemyActions.InfLig3, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG6.9', enemy: Enemies.InfLig, position: { x: 189,  y: 3874 }, actions: { actions: EnemyActions.InfLig4, offset: 0.5, }, item: Powers.STARL_X1, },
        { name: 'INFLIG6.10',enemy: Enemies.InfLig, position: { x: 287,  y: 3854 }, actions: { actions: EnemyActions.InfLig3, offset: 0.5, }, item: Powers.STARL_X1, },

        // Pesada
        { name: 'INFPES1.1', enemy: Enemies.InfPes, position: { x:-304, y: 1308 }, actions: { actions: EnemyActions.InfPes1, offset: 1.2, }, item: Powers.STARL_X1, },
        { name: 'INFPES1.2', enemy: Enemies.InfPes, position: { x: 268, y: 1743 }, actions: { actions: EnemyActions.InfPes1, offset: 1.2, }, item: Powers.STARL_X1, },
        { name: 'INFPES1.3', enemy: Enemies.InfPes, position: { x: 160, y: 2762 }, actions: { actions: EnemyActions.InfPes1, offset: 1.2, }, item: Powers.STARL_X1, },

        { name: 'INFPES2.1', enemy: Enemies.InfPes, position: { x:-32,  y: 3545 }, actions: { actions: EnemyActions.InfPes1, offset: 1.2, }, item: Powers.STARL_X1, },
        { name: 'INFPES2.2', enemy: Enemies.InfPes, position: { x:-229, y: 3586 }, actions: { actions: EnemyActions.InfPes1, offset: 1.2, }, item: Powers.STARL_X1, },
        { name: 'INFPES2.3', enemy: Enemies.InfPes, position: { x:-80,  y: 3984 }, actions: { actions: EnemyActions.InfPes1, offset: 1.2, }, item: Powers.STARL_X1, },

        // Big Tank
        { name: 'TANKBIG.1', enemy: Enemies.TankBig, position: { x:-150, y: 2460 }, actions: { actions: EnemyActions.TankBig1, offset: 0.5, }, item: Powers.STARL_X10, },
        { name: 'TANKBIG.2', enemy: Enemies.TankBig, position: { x:-328, y: 2817 }, actions: { actions: EnemyActions.TankBig1, offset: 0.5, }, item: Powers.STARL_X10, },
        { name: 'TANKBIG.3', enemy: Enemies.TankBig, position: { x: 316, y: 3027 }, actions: { actions: EnemyActions.TankBig1, offset: 0.5, }, item: Powers.STARL_X10, },
        { name: 'TANKBIG.4', enemy: Enemies.TankBig, position: { x: 86,  y: 3942 }, actions: { actions: EnemyActions.TankBig1, offset: 0.5, }, item: Powers.STARL_X10, },

		{ name: 'BOSS', enemy: Enemies.Boss1, time: 66, path: Paths.Boss1, item: Powers.STARH_X200,
          actions: [
            { actions: EnemyActions.Boss1_1, offset: 0, timeLoop: 6,   life: 120000 },
            { actions: EnemyActions.Boss1_2, offset: 0, timeLoop: 5,   life: 80000 },
            { actions: EnemyActions.Boss1_3, offset: 0, timeLoop: 6,   life: 40000 },
            { actions: EnemyActions.Boss1_4, offset: 0, timeLoop: 6.5, life: 0 },
          ] },
    ],

    // Enemies High
    enemiesH: [

        // Wave 1
        { name: 'KAMI1_1', enemy: Enemies.Kami1, time: 7.0, kamikaze: Kamikazes.RandomLeftSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1_2', enemy: Enemies.Kami1, time: 7.2, kamikaze: Kamikazes.RandomLeftSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1_3', enemy: Enemies.Kami1, time: 7.4, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1_3', enemy: Enemies.Kami1, time: 7.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },

        // Wave 1
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 9.0, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 9.3, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 9.6, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 9.9, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 10.2, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 10.5, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 10.8, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 12.0, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 12.3, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 12.6, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 12.9, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 13.2, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 13.5, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.7', enemy: Enemies.Kami1, time: 13.8, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami2, time: 11.5, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.POWERUP, },

        // Kamikazes
        { name: 'INFAIR1.1', enemy: Enemies.InfAir, time: 14.0, path: Paths.InfAir2_1, actions: { actions: EnemyActions.InfAir1, offset: 1.0, }, item: Powers.STARH_X3, },
        { name: 'INFAIR1.2', enemy: Enemies.InfAir, time: 14.1, path: Paths.InfAir2_2, actions: { actions: EnemyActions.InfAir1, offset: 1.2, }, item: Powers.STARH_X3, },
        { name: 'INFAIR1.3', enemy: Enemies.InfAir, time: 14.2, path: Paths.InfAir2_3, actions: { actions: EnemyActions.InfAir1, offset: 1.4, }, item: Powers.STARH_X3, },

        // Kamikazes
        { name: 'INFAIR1.1', enemy: Enemies.InfAir, time: 17.0, path: Paths.InfAir1_1, actions: { actions: EnemyActions.InfAir1, offset: 1.0, }, item: Powers.STARH_X3, },
        { name: 'INFAIR1.2', enemy: Enemies.InfAir, time: 17.1, path: Paths.InfAir1_2, actions: { actions: EnemyActions.InfAir1, offset: 1.2, }, item: Powers.STARH_X3, },
        { name: 'INFAIR1.3', enemy: Enemies.InfAir, time: 17.2, path: Paths.InfAir1_3, actions: { actions: EnemyActions.InfAir1, offset: 1.4, }, item: Powers.STARH_X3, },

        // Wave 1
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 19.0, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 19.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 19.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 19.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 20.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 20.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 20.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 22.0, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 22.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 22.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami0, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 22.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 23.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 23.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.7', enemy: Enemies.Kami1, time: 23.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami2, time: 21.5, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.POWERUP, },

        // Wave 2
        { name: 'INFAIR2.1', enemy: Enemies.InfAir, time: 24.0, path: Paths.InfAir1_1, actions: { actions: EnemyActions.InfAir2, offset: 1.0, }, item: Powers.STARH_X3, },
        { name: 'INFAIR2.2', enemy: Enemies.InfAir, time: 24.1, path: Paths.InfAir1_2, actions: { actions: EnemyActions.InfAir2, offset: 1.2, }, item: Powers.STARH_X3, },
        { name: 'INFAIR2.3', enemy: Enemies.InfAir, time: 24.2, path: Paths.InfAir1_3, actions: { actions: EnemyActions.InfAir2, offset: 1.4, }, item: Powers.STARH_X3, },

        // Infanteria
        { name: 'INFAIR2.1', enemy: Enemies.InfAir, time: 27.0, path: Paths.InfAir2_1, actions: { actions: EnemyActions.InfAir2, offset: 1.0, }, item: Powers.STARH_X3, },
        { name: 'INFAIR2.2', enemy: Enemies.InfAir, time: 27.1, path: Paths.InfAir2_2, actions: { actions: EnemyActions.InfAir2, offset: 1.2, }, item: Powers.STARH_X3, },
        { name: 'INFAIR2.3', enemy: Enemies.InfAir, time: 27.2, path: Paths.InfAir2_3, actions: { actions: EnemyActions.InfAir2, offset: 1.4, }, item: Powers.STARH_X3, },
		
		// Big Air
		{ name: 'BIGAIR1.1', enemy: Enemies.BigAir, time: 20, kamikaze: Kamikazes.BigAirCenter, actions: { actions: EnemyActions.BigAir1, offset: 1, }, item: Powers.STARH_X10, },
		{ name: 'BIGAIR1.2', enemy: Enemies.BigAir, time: 28, kamikaze: Kamikazes.BigAirCenter, actions: { actions: EnemyActions.BigAir1, offset: 1, }, item: Powers.STARH_X10, },
		{ name: 'BIGAIR1.3', enemy: Enemies.BigAir, time: 36, kamikaze: Kamikazes.BigAirLeft,   actions: { actions: EnemyActions.BigAir1, offset: 1, }, item: Powers.STARH_X10, },
		{ name: 'BIGAIR1.4', enemy: Enemies.BigAir, time: 36, kamikaze: Kamikazes.BigAirRight,  actions: { actions: EnemyActions.BigAir1, offset: 1, }, item: Powers.SHOCKUP, },
		{ name: 'BIGAIR1.5', enemy: Enemies.BigAir, time: 52, kamikaze: Kamikazes.BigAirLeft,   actions: { actions: EnemyActions.BigAir1, offset: 1, }, item: Powers.STARH_X10, },
		{ name: 'BIGAIR1.6', enemy: Enemies.BigAir, time: 52, kamikaze: Kamikazes.BigAirRight,  actions: { actions: EnemyActions.BigAir1, offset: 1, }, item: Powers.SHOCKUP, },

        // Wave 1
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 29.0, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 29.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 29.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 29.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 30.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 30.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 30.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 32.0, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 32.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 32.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 32.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 33.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 33.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.7', enemy: Enemies.Kami1, time: 33.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami2, time: 31.5, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.POWERUP, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 34.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 34.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 34.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 35.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 35.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami1, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.7', enemy: Enemies.Kami1, time: 35.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },

        // Wave 1
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 39.0, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 39.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 39.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 39.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 40.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 40.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 40.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 42.0, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 42.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 42.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 42.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 43.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 43.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.7', enemy: Enemies.Kami1, time: 43.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami2, time: 41.5, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.POWERUP, },
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 44.0, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 44.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 44.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 44.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 45.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 45.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.7', enemy: Enemies.Kami1, time: 45.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 46.0, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 46.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 46.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 46.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 47.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 47.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.7', enemy: Enemies.Kami1, time: 47.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },

        // Wave 1
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 49.0, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 49.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 49.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 49.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 50.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 50.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 50.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 52.0, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 52.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 52.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 52.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 53.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 53.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.7', enemy: Enemies.Kami1, time: 53.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami2, time: 52.5, kamikaze: Kamikazes.RandomCenterSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.POWERUP, },
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 51.0, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 51.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 51.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 51.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 52.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 52.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 52.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.1', enemy: Enemies.Kami1, time: 54.0, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.2', enemy: Enemies.Kami1, time: 54.3, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.3', enemy: Enemies.Kami1, time: 54.6, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.4', enemy: Enemies.Kami1, time: 54.9, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },
        { name: 'KAMI1.5', enemy: Enemies.Kami1, time: 55.2, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.6', enemy: Enemies.Kami1, time: 55.5, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X3, },
        { name: 'KAMI1.7', enemy: Enemies.Kami1, time: 55.8, kamikaze: Kamikazes.RandomRightSlow, actions: { actions: EnemyActions.Kami2, offset: 1, }, item: Powers.STARH_X1, },

        // Infanteria
        { name: 'INFAIR4.1', enemy: Enemies.InfAir, time: 37.0, path: Paths.InfAir1_1, actions: { actions: EnemyActions.InfAir2, offset: 1.0, }, item: Powers.STARH_X3, },
        { name: 'INFAIR4.2', enemy: Enemies.InfAir, time: 37.1, path: Paths.InfAir1_2, actions: { actions: EnemyActions.InfAir1, offset: 1.2, }, item: Powers.STARH_X3, },
        { name: 'INFAIR4.3', enemy: Enemies.InfAir, time: 37.2, path: Paths.InfAir1_3, actions: { actions: EnemyActions.InfAir2, offset: 1.4, }, item: Powers.STARH_X3, },
        { name: 'INFAIR4.4', enemy: Enemies.InfAir, time: 37.0, path: Paths.InfAir2_1, actions: { actions: EnemyActions.InfAir2, offset: 1.0, }, item: Powers.STARH_X3, },
        { name: 'INFAIR4.5', enemy: Enemies.InfAir, time: 37.1, path: Paths.InfAir2_2, actions: { actions: EnemyActions.InfAir1, offset: 1.2, }, item: Powers.STARH_X3, },
        { name: 'INFAIR4.6', enemy: Enemies.InfAir, time: 37.2, path: Paths.InfAir2_3, actions: { actions: EnemyActions.InfAir2, offset: 1.4, }, item: Powers.STARH_X3, },

        // Infanteria
        { name: 'INFAIR5.1', enemy: Enemies.InfAir, time: 47.0, path: Paths.InfAir1_1, actions: { actions: EnemyActions.InfAir2, offset: 1.0, }, item: Powers.STARH_X3, },
        { name: 'INFAIR5.2', enemy: Enemies.InfAir, time: 47.1, path: Paths.InfAir1_2, actions: { actions: EnemyActions.InfAir1, offset: 1.2, }, item: Powers.STARH_X3, },
        { name: 'INFAIR5.3', enemy: Enemies.InfAir, time: 47.2, path: Paths.InfAir1_3, actions: { actions: EnemyActions.InfAir2, offset: 1.4, }, item: Powers.STARH_X3, },
        { name: 'INFAIR5.4', enemy: Enemies.InfAir, time: 47.0, path: Paths.InfAir2_1, actions: { actions: EnemyActions.InfAir2, offset: 1.0, }, item: Powers.STARH_X3, },
        { name: 'INFAIR5.5', enemy: Enemies.InfAir, time: 47.1, path: Paths.InfAir2_2, actions: { actions: EnemyActions.InfAir1, offset: 1.2, }, item: Powers.STARH_X3, },
        { name: 'INFAIR5.6', enemy: Enemies.InfAir, time: 47.2, path: Paths.InfAir2_3, actions: { actions: EnemyActions.InfAir2, offset: 1.4, }, item: Powers.STARH_X3, },

        // Infanteria
        { name: 'INFAIR6.1', enemy: Enemies.InfAir, time: 57.0, path: Paths.InfAir1_1, actions: { actions: EnemyActions.InfAir1, offset: 1.0, }, item: Powers.STARH_X3, },
        { name: 'INFAIR6.2', enemy: Enemies.InfAir, time: 57.1, path: Paths.InfAir1_2, actions: { actions: EnemyActions.InfAir2, offset: 1.2, }, item: Powers.STARH_X3, },
        { name: 'INFAIR6.3', enemy: Enemies.InfAir, time: 57.2, path: Paths.InfAir1_3, actions: { actions: EnemyActions.InfAir2, offset: 1.4, }, item: Powers.STARH_X3, },
        { name: 'INFAIR6.4', enemy: Enemies.InfAir, time: 57.0, path: Paths.InfAir2_1, actions: { actions: EnemyActions.InfAir1, offset: 1.0, }, item: Powers.STARH_X3, },
        { name: 'INFAIR6.5', enemy: Enemies.InfAir, time: 57.1, path: Paths.InfAir2_2, actions: { actions: EnemyActions.InfAir2, offset: 1.2, }, item: Powers.STARH_X3, },
        { name: 'INFAIR6.6', enemy: Enemies.InfAir, time: 57.2, path: Paths.InfAir2_3, actions: { actions: EnemyActions.InfAir2, offset: 1.4, }, item: Powers.STARH_X3, },
    ],
};
