/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

var Loader = Loader || {};

//--------------------------------------------------------------------------------------------------------
// Loader
//--------------------------------------------------------------------------------------------------------
Loader.reset = function() {
    this.resources = 0;
    this.loaded = 0;
    this.started = false;
}

Loader.add = function(resources) {
    if (resources === undefined) resources = 1;
    this.resources += resources;
}

Loader.start = function() {
    GLog('Loader', 'Loading ' + this.resources + ' resources...');
    this.started = true;
}

Loader.onLoad = function() {
    this.loaded++;
    GLog('Loader', 'Resource loaded: ' + this.loaded + '/' + this.resources);
}

Loader.isLoading = function() {
    return (this.resources > 0);
}

Loader.isLoaded = function() {
    var res = this.started && (this.loaded == this.resources);
    if (res) {
        this.reset();
        return true;
    }
    return false;
}

Loader.getCompleted = function() {
    return this.loaded / this.resources;
}
