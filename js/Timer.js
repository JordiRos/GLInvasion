/**
 * @author Jordi Ros: shine.3p@gmail.com
 *
 */

function Timer()
{
    this.reset();
}

Timer.prototype.reset = function()
{
	this.timeini = this.getTime();
	this.time = 0;
    this.timep = 0;
	this.delta = 0;
    this.paused = false;
}

Timer.prototype.getTime = function()
{
	return (new Date()).getTime() / 1000.0;
}

Timer.prototype.update = function()
{
    if (!this.paused) {
        //var newtime = this.getTime();
        //var time = newtime - this.timeini;
        //this.delta = time - this.time;
        //this.time  = time;
        this.delta = 1 / 60;
        this.time += this.delta;
    }
}

Timer.prototype.pause = function(pause)
{
    if (pause != this.paused) {
        this.paused = pause;
        if (pause)
            this.timep = this.getTime();
        else
            this.timeini += (this.getTime() - this.timep);
    }
}
