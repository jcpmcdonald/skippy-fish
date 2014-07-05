

Crafty.c("Fish", {
	_acceleration: -200,
	_velocity: {x: 10, y:0},
	skip: false,
	airborn: false,
	dead: false,
	
	skipCount: 0,
	skipDistance: 0,
	maxHeight: 0,
	
	init: function(){
		this.requires('2D, Canvas, Color, Collision, Persist')
			.attr({
				x: 30,
				y: 10,
				w: 80,
				h: 30
			})
			.color('rgb(255, 125, 40)');
		
		this.bind("EnterFrame", this.update);
	},
	
	update: function(data){
		var deltaTime = (data.dt/ 1000);
		var depth;
		
		if(!this.dead){
			this._velocity.y += (this._acceleration * deltaTime);
			this.y -= (this._velocity.y * deltaTime);
			this.skipDistance += (this._velocity.x * deltaTime);
		}
		depth = this.y + this.h - Game.waterSurface();
		
		if(depth < this.maxHeight)
		{
			this.maxHeight = depth;
		}
		
		if(depth < -5){
			this.airborn = true;
		}
		
		if(this.airborn && depth > 20){
			this.dead = true;
		}
		
		if(this.skip){
			this.skip = false;
			
			if(this.airborn){
				var percentPerfect = 1 - (Math.abs(depth - 5) / 15);
				
				if(this._velocity.y < 0 && depth < 20 && depth > -5){
					this._velocity.y = -(this._velocity.y * 1.4 * percentPerfect) - 40;
					
					console.dir({depth: depth, percentPerfect: percentPerfect, velocity: this._velocity.y});
					
					this.skipCount++;
				}
			}
		}
	},
	
});


Crafty.c("Killer Fish", {
	init: function(){
		this.requires('2D, Canvas, Color, Persist')
			.attr({
				x: -100,
				y: Game.waterSurface() + 50,
				w: 120,
				h: 80
			})
			.color('rgb(255, 50, 20)');
		
		this.bind("EnterFrame", this.update);
	},
	
	update: function(data){
		
	},
	
});


Crafty.c("Water", {
	init: function(){
		this.requires('2D, Canvas, Color, Persist')
			.attr({
				x: 0,
				y: Game.waterSurface(),
				w: Game.width(),
				h: Game.height() - Game.waterSurface() + 800
			})
			.color('#004F98');
	},
	
});


