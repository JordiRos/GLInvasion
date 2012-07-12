/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var ScreenMain = ScreenMain || {};

//--------------------------------------------------------------------------------------------------------
// Constructor
//--------------------------------------------------------------------------------------------------------
ScreenMain.create = function() {
    var screen = Control.create(0,0, APP_W,APP_H);
    screen.hud = new GLHud(GApp.renderer, APP_W,APP_H, false,false);
    screen.selected = 0;
    screen.time = 0;
    screen.showTime = 0;
    screen.animT1 = AnimVar.createVector3(new THREE.Vector3(0,0,0));
    screen.animT2 = AnimVar.createVector3(new THREE.Vector3(0,0,0));
    screen.menu = 0;

    // Update
    screen.update = function(time, delta) {
        this.time = time;
        this.animT1.update(time);
        this.animT2.update(time);
    }

    screen.render = function(fade) {
        // Title
        var t = MTime01(this.time, this.timeShow, 0.5);
        this.hud.render(Textures.Menu_BG.texture, 0,0, APP_W,APP_H, 0, fade * t);
        // Animated Title
        //this.hud.render(Textures.Menu_Title1.texture, this.animT1.value.x,this.animT1.value.y, Textures.Menu_Title1.texture.image.width,Textures.Menu_Title1.texture.image.height, 0, fade * this.animT1.value.z);
        //this.hud.render(Textures.Menu_Title2.texture, this.animT2.value.x,this.animT2.value.y, Textures.Menu_Title2.texture.image.width,Textures.Menu_Title2.texture.image.height, 0, fade * this.animT2.value.z);
        // Options
        switch (this.menu) {
            case 0:
                // Options
                var t = MTime01(this.time, this.timeShow + 0.5, 1);
                this.renderOption("NIGHTMARE", 0, t * fade);
                this.renderOption("NORMAL",    1, t * fade);
                this.renderOption("ABOUT",     2, t * fade);
                break;
            case 1:
                var y = 500;
                // Controls
                Fonts.MainRes.font.renderAlign(this.hud, "CONTROLS",          0,y+30*0, APP_W, Font.CENTER, 1, fade);
                Fonts.Main.font.renderAlign(this.hud, "PLASMA - Z OR CTRL ",  0,y+30*1, APP_W, Font.CENTER, 1, fade);
                Fonts.Main.font.renderAlign(this.hud, "LASER  - X OR ALT  ",  0,y+30*2, APP_W, Font.CENTER, 1, fade);
                Fonts.Main.font.renderAlign(this.hud, "SHOCK  - C OR SPACE",  0,y+30*3, APP_W, Font.CENTER, 1, fade);
                Fonts.Main.font.renderAlign(this.hud, "PRESS ESC TO GO BACK", 0,y+30*4, APP_W, Font.CENTER, 1, fade);
                // Credits
                Fonts.MainRes.font.renderAlign(this.hud, "A WEBGL GAME EXPERIMENT",  0,y+30*6, APP_W, Font.CENTER, 1, fade);
                Fonts.Main.font.renderAlign(this.hud, "PROGRAMMING   JORDI ROS",  0,y+30*7, APP_W, Font.CENTER, 1, fade);
                Fonts.Main.font.renderAlign(this.hud, "GRAPHICS    VICTOR ROYO",  0,y+30*8, APP_W, Font.CENTER, 1, fade);
                Fonts.Main.font.renderAlign(this.hud, "MADE WITH THREE.JS", 0,y+30*9, APP_W, Font.CENTER, 1, fade);
                this.hud.render(Textures.IconLink.texture, 620,y+30*7-5, 25,25, 0, fade);
                this.hud.render(Textures.IconLink.texture, 620,y+30*8-5, 25,25, 0, fade);
                this.hud.render(Textures.IconLink.texture, 620,y+30*9-5, 25,25, 0, fade);
                break;
        }
    }

    // Events
    screen.keyPress = function(key, press) {
        if (!press) {
            if ((this.time - this.showTime) > 1) {
                switch (key) {
                    case 38: this.selected = Math.max(0, this.selected-1); break;
                    case 40: this.selected = Math.min(2, this.selected+1); break;
                    // CTRL, Z, Space y Enter para activar
                    case 17:
                    case 90:
                    case 32:
                    case 13: this.onAction(); break;
                    // ESC
                    case 27: this.menu = 0; break;
                }
            }
        }
        return false;
    }

    // RenderOption
    screen.renderOption = function(text, idx, fade) {
        var f = MSin(this.time * 15, 0,1);
        var base = 683;
        Fonts.Main.font.renderAlign(this.hud, text, 0,base + idx * 30, APP_W, Font.CENTER, 1, fade);
        if (idx == this.selected)
            Fonts.MainRes.font.renderAlign(this.hud, text, 0,base + idx * 30, APP_W, Font.CENTER, 1, fade * (0.5 + 0.5 * f));
    }
    
    // onAction
    screen.onAction = function() {
        switch (this.selected) {
            // Start
            case 0: Game.Easy = false; Game.Instance.gui.setScreen(this.time, Game.Instance.screenGame); break;
            case 1: Game.Easy = true;  Game.Instance.gui.setScreen(this.time, Game.Instance.screenGame); break;
            case 2: this.menu = 1; break;
        }
    }

    // onAction
    screen.onShow = function(time) {
        this.timeShow = time;
        this.selected = 0;
        // Anim
        this.animT1.reset(new THREE.Vector3(140, -200, 0));
        this.animT1.set(new THREE.Vector3(140, 65, 1), time + 0.3, 0.3);
        this.animT2.reset(new THREE.Vector3(800, 230, 0));
        this.animT2.set(new THREE.Vector3(320, 230, 1), time + 0.6, 0.3);
    }
    
    // onAction
    screen.mousePress = function(x, y, button, press) {
        if (this.menu == 1) {
            var dy = 710;
            if (x > 200 && x < 660 && y > (dy+00) && y < (dy+00+15)) window.openOrFocus('http://jordiros.me', 'JordiRos');
            if (x > 200 && x < 660 && y > (dy+30) && y < (dy+30+15)) window.openOrFocus('https://www.facebook.com/victor.royoilustrador', 'VictorRoyo');
            if (x > 200 && x < 660 && y > (dy+60) && y < (dy+60+15)) window.openOrFocus('https://github.com/mrdoob/three.js/', 'ThreeJS');
        }
    }

    return screen;
}
