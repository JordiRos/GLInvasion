/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

//--------------------------------------------------------------------------------------------------------
// FXWater
//--------------------------------------------------------------------------------------------------------    
FXWater = function(w, h) {
    // Hud
    this.w = w / 2;
    this.h = h / 2;
    this.hud = new GLHud(GApp.renderer, this.w,this.h, false,false);
 
    // RT
    var params = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, depthBuffer: false };
    this.rt = [];
    this.rt[0] = new THREE.WebGLRenderTarget(this.w,this.h, params);
    this.rt[1] = new THREE.WebGLRenderTarget(this.w,this.h, params);
    this.rt[2] = new THREE.WebGLRenderTarget(this.w,this.h, params);
    this.frame = 0;

    // Clear
    GApp.renderer.setClearColorHex(0x7f7f7f, 0.5);
    GApp.renderer.clearTarget(this.rt[0]);
    GApp.renderer.clearTarget(this.rt[1]);
    GApp.renderer.clearTarget();

    // Shader physics
    this.shPhysics = THREE.ShaderExtras["waterPhysics"];
    this.shPhysicsMat = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(this.shPhysics.uniforms),
        vertexShader: this.shPhysics.vertexShader,
        fragmentShader: this.shPhysics.fragmentShader,
    });
    
    // Shader render
    this.shRender = THREE.ShaderExtras["waterRender"];
    this.shRenderMat = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(this.shRender.uniforms),
        vertexShader: this.shRender.vertexShader,
        fragmentShader: this.shRender.fragmentShader,
        blending: THREE.NormalBlending,
        transparent: true,
        depthWrite: false,
    });
}

FXWater.prototype.update = function(time, delta) {
    this.texSrc = this.rt[    this.frame];
    this.texDst = this.rt[1 - this.frame];
    this.frame  = 1 - this.frame;
}

//--------------------------------------------------------------------------------------------------------
// Render
//--------------------------------------------------------------------------------------------------------    
FXWater.prototype.renderParticles = function(func) {
    // Render scene to background
    GApp.renderer.setClearColorHex(0, 0);
    GApp.renderer.clearTarget(this.rt[2]);

    // Func to render
    func(this.rt[2]);

    // Render to Src
    this.hud.renderTarget = this.texSrc;
    this.hud.render(this.rt[2], 0,0,this.w,this.h);
    this.hud.renderTarget = null;
}

FXWater.prototype.renderPhysics = function(x,y, w,h) {
    // Clear dest
    GApp.renderer.setClearColorHex(0x7f7f7f, 0.5);
    GApp.renderer.clearTarget(this.texDst);
    GApp.renderer.clearTarget(null, false,false,false);
    // Render physics
    this.shPhysicsMat.uniforms["tWater"].texture = this.texSrc;
    this.shPhysicsMat.uniforms["vOff"].value.set(2.0 / this.w, 2.0 / this.h);
    this.hud.renderTarget = this.texDst;
    this.hud.renderMaterial(this.shPhysicsMat, 0,0,this.w,this.h);
    this.hud.renderTarget = null;
    GApp.renderer.clearTarget(null, false,false,false);
}

FXWater.prototype.render = function(tex, fade) {
    // Render texture with water effect
    this.shRender.uniforms["tWater"].texture = this.texDst;
    this.shRender.uniforms["tMap"].texture = tex;
    this.shRender.uniforms["vOff"].value.set(1.0 / this.w, 1.0 / this.h);
    this.shRenderMat.opacity = fade;
    this.hud.renderMaterial(this.shRender, 0,0, this.w,this.h);
    // @Debug
    //this.hud.render(this.tex, 0,0,256,256);
    //this.hud.render(this.texDst, 256,0,256,256);
}
