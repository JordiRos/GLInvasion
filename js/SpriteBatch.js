/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */
 
SpriteBatch = function(renderer, w, h) {
    this.renderer = renderer;
    this.w = w;
    this.h = h;
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

SpriteBatch.prototype.render = function(points, rotz, fade, blending, texsrc) {
    if (rotz === undefined) rotz = 0;
    if (fade === undefined) fade = 1;
    if (blending === undefined) blending = THREE.NormalBlending;
    if (texsrc === undefined)
        this.setQuadSrc(0,0, 1,1);
    else
        this.setQuadSrc(texsrc.x, texsrc.y, texsrc.w, texsrc.h);
    this.setQuad(points, rotz);
    this.quad.material.opacity = fade;
    this.quad.material.blending = blending;
    this.renderer.render(this.scene, this.camera, this.renderTarget);
}

SpriteBatch.prototype.renderTexture = function(texture, points, position, scale, rotz, fade, blending, texsrc) {
    this.quad.material = this.defaultMaterial;
    this.quad.material.map = texture;
    this.quad.position.set(position.x, this.h - position.y, 1);
    this.quad.scale.set(scale.x, scale.y, 1);
    this.render(points, rotz, fade, blending, texsrc);
}

SpriteBatch.prototype.renderMaterial = function(material, points, position, scale, rotz, fade, blending, texsrc) {
    this.quad.material = material;
    this.quad.position.set(position.x, this.h - position.y, 1);
    this.quad.scale.set(scale.x, scale.y, 1);
    this.render(points, rotz, fade, blending, texsrc);
}

SpriteBatch.prototype.setQuad = function(points, rotz) {
    this.quad.rotation.set(0, 0, rotz);
    this.quad.geometry.vertices[0].position.set(points[0].x, points[0].y, 1);
    this.quad.geometry.vertices[1].position.set(points[1].x, points[1].y, 1);
    this.quad.geometry.vertices[2].position.set(points[2].x, points[2].y, 1);
    this.quad.geometry.vertices[3].position.set(points[3].x, points[3].y, 1);
    this.quad.geometry.__dirtyVertices = true;
}

SpriteBatch.prototype.setQuadSrc = function(x, y, w, h) {
    this.quad.geometry.faceVertexUvs[0][0][0].set(x,   y);
    this.quad.geometry.faceVertexUvs[0][0][1].set(x,   y+h);
    this.quad.geometry.faceVertexUvs[0][0][2].set(x+w, y+h);
    this.quad.geometry.faceVertexUvs[0][0][3].set(x+w, y);
    this.quad.geometry.__dirtyUvs = true;
}
