/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

 var AnimVar = AnimVar || {};
 
//--------------------------------------------------------------------------------------------------------
// Generic AnimVar
//--------------------------------------------------------------------------------------------------------
AnimVar.create = function(value, cloner, setter, solver) {

    var v = {};
    v.cloner = cloner;
    v.setter = setter;
    v.solver = solver;
 
    //-------------------------------------------------------------------------------------------------------- 
    // Functions
    //--------------------------------------------------------------------------------------------------------
    v.reset = function(value) {
        this.value = this.cloner(value);
        this.vini  = this.cloner(value);
        this.vfin  = this.cloner(value);
        this.time  = 0;
        this.len   = 0;
    }
    
    v.set = function(value, time, len) {
        this.vini  = this.setter(this.vini, this.value);
        this.vfin  = this.setter(this.vfin, value);
        this.value = this.setter(this.value, value);
        this.time  = time;
        this.len   = len;
    }
    
    v.update = function(time) {
        var step = TWEEN.Ease(MTime01(time, this.time, this.len), 0, 1, TWEEN.Func.Sine, TWEEN.Type.EaseInOut);
        this.value = this.solver(step, this.value, this.vini, this.vfin);
    }
    
    // Initial state
    v.reset(value);
    return v;
}

//--------------------------------------------------------------------------------------------------------
// AnimVar: Instances
//--------------------------------------------------------------------------------------------------------
AnimVar.createSingle = function(value) {
    return AnimVar.create(value, function(v) { return v; }, function(dst, src) { dst = src; return dst; }, AnimLerpSingle);
}

AnimVar.createVector2 = function(value) {
    return AnimVar.create(value, function(v) { return v.clone(); }, function(dst, src) { dst.set(src.x, src.y); return dst; }, AnimLerpVector2);
}

AnimVar.createVector3 = function(value) {
    return AnimVar.create(value, function(v) { return v.clone(); }, function(dst, src) { dst.set(src.x, src.y, src.z); return dst; }, AnimLerpVector3);
}

AnimVar.createQuaternion = function(value) {
    return AnimVar.create(value, function(v) { var r = new THREE.Quaternion(0,0,0); r.copy(v); return r; }, function(dst, src) { dst.set(src.x, src.y, src.z, src.w); return dst; }, AnimLerpQuaternion);
}