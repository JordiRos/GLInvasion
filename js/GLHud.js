/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */
 
GLHud = function(renderer, w, h, flipx, flipy) {
    this.renderer = renderer;
    this.w = w;
    this.h = h;
    this.flipx = flipx;
    this.flipy = flipy;    
    this.renderTarget = null;
    // Scene
    this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false });
    this.plane = new THREE.PlaneGeometry(1, 1);
    this.plane.dynamic = true;
    this.quad  = new THREE.Mesh(this.plane, this.defaultMaterial);
    this.quad.doubleSided = true;
    this.camera = new THREE.OrthographicCamera(0,w, 0,h, -1000, 1000);
    this.scene  = new THREE.Scene();
    this.scene.add(this.quad);
    this.scene.add(this.camera);
}

GLHud.prototype.resize = function(w, h) {
    this.w = w;
    this.h = h;
    this.camera.projectionMatrix = THREE.Matrix4.makeOrtho(0,w, 0,h, -1000, 1000);
}

GLHud.prototype.renderDef = function(x, y, w, h, rotz, fade, blending, texsrc) {
    if (rotz === undefined) rotz = 0;
    if (fade === undefined) fade = 1;
    if (blending === undefined) blending = THREE.NormalBlending;
    if (texsrc === undefined)
        this.setQuadSrc(0,0, 1,1);
    else
        this.setQuadSrc(texsrc.x, texsrc.y, texsrc.w, texsrc.h);
    this.setQuad(x, y, w, h, rotz);
    this.quad.material.opacity = fade;
    this.quad.material.blending = blending;
    this.renderer.render(this.scene, this.camera, this.renderTarget);
}

GLHud.prototype.render = function(texture, x, y, w, h, rotz, fade, blending, texsrc) {
    this.quad.material = this.defaultMaterial;
    this.quad.material.map = texture;
    this.renderDef(x,y, w,h, rotz, fade, blending, texsrc);
}

GLHud.prototype.renderMaterial = function(material, x, y, w, h, rotz, fade, blending, texsrc) {
    this.quad.material = material;
    this.renderDef(x,y, w,h, rotz, fade, blending, texsrc);
}

GLHud.prototype.setQuadSrc = function(x, y, w, h) {
    this.quad.geometry.faceVertexUvs[0][0][0].set(x,   y);
    this.quad.geometry.faceVertexUvs[0][0][1].set(x,   y+h);
    this.quad.geometry.faceVertexUvs[0][0][2].set(x+w, y+h);
    this.quad.geometry.faceVertexUvs[0][0][3].set(x+w, y);
    this.quad.geometry.__dirtyUvs = true;
}

GLHud.prototype.setQuad = function(x, y, w, h, rotz) {
    xt = x + w*0.5;
    yt = y + h*0.5;
    rotx = 0;
    roty = 0;
    if (this.flipx == true)
    {
        xt = this.w - xt;
        roty = deg2rad(180);
    }
    if (this.flipy == true || this.renderTarget != null)
    {
        yt = this.h - yt;
        rotx = deg2rad(180);
    }
    this.quad.rotation.set(rotx + deg2rad(180), roty, rotz);
    this.quad.position.set(xt, yt, 1);
    this.quad.scale.set(w, h, 1);
}
