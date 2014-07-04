

Crafty.c("Fish", {
	_acceleration: -200,
	_velocity: {x: 0, y:0},
	
	init: function(){
		this.requires('2D, Canvas, Color, Collision, Persist, Tween')
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
		this._velocity.y += (this._acceleration * deltaTime);
		this.y -= (this._velocity.y * deltaTime);
		
		if(this._velocity.y < 0 && this.y + this.h >= Game.waterSurface()){
			this._velocity.y = -this._velocity.y * 0.9;
		}
	},
	
});


Crafty.c("Water", {
	init: function(){
		this.requires('2D, Canvas, Color, Persist, Tween')
			.attr({
				x: 0,
				y: Game.waterSurface(),
				w: Game.width(),
				h: Game.height() - Game.waterSurface() + 300
			})
			.color('#004F98');
	},
	
});


